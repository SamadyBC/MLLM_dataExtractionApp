const express = require("express");
const multer = require("multer");
const path = require("path");
const imageController = require("../controllers/imageController");
const axios = require("axios");

const router = express.Router();

// Configuração do armazenamento do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, "/uploads");
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Implementação de um middleware com Multer para processar uploads de arquivos na rota POST /upload.
//
// Este middleware é responsável por configurar o Multer com:
// 1. Um destino de armazenamento (definido pela constante `storage` - presumivelmente configurada com diskStorage).
// 2. Um limite máximo de tamanho de arquivo (10MB neste caso).
// 3. Um filtro de tipo de arquivo, garantindo que apenas imagens com extensões e MIME types válidos sejam aceitas.
//
// O campo `fileFilter` é uma função de callback que recebe:
// - `req`: a requisição Express
// - `file`: o arquivo enviado
// - `cb`: a função de callback para indicar aceitação ou rejeição do arquivo
//
// Dentro do filtro, é usada uma expressão regular para validar:
// - `extname`: se a extensão do arquivo (`.jpg`, `.png`, etc) é permitida
// - `mimetype`: se o tipo MIME (`image/jpeg`, `image/png`, etc) corresponde a uma imagem válida
//
// A função `test()` da RegExp é usada para verificar se tanto a extensão quanto o tipo MIME do arquivo são válidos.
// - Se ambos forem válidos, o callback é chamado com `cb(null, true)`, aceitando o arquivo.
// - Caso contrário, é chamado com um erro: `cb(new Error("Apenas imagens são permitidas!"))`, rejeitando o upload.

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Apenas imagens são permitidas!"));
  },
});

// Rota para upload e processamento
router.post("/upload", upload.single("image"), imageController.processImage);

// Rota POST "/test-api" para testar a integração com a API da DeepSeek.
//
// Esta rota realiza uma chamada assíncrona para o endpoint de completions da API DeepSeek, utilizando o modelo "deepseek-reasoner".
// O fluxo geral é o seguinte:
//
// 1. A chave da API (`DEEPSEEK_API_KEY`) e a URL base (`DEEPSEEK_API_URL`) são obtidas a partir das variáveis de ambiente.
//    Valores padrão são fornecidos como fallback caso as variáveis não estejam definidas.
//
// 2. Uma mensagem simples é enviada como entrada para o modelo: "9.11 and 9.8, which is greater?".
//    Essa mensagem é formatada em um array de `messages`, seguindo o padrão de role "user" usado em modelos conversacionais.
//
// 3. Uma requisição POST é feita com `axios` para o endpoint `/v1/chat/completions`, contendo:
//    - O modelo a ser usado
//    - As mensagens
//    - Headers com o tipo de conteúdo e o token de autorização (Bearer token)
//
// 4. A resposta da API é acessada para extrair:
//    - `reasoning_content`: raciocínio detalhado retornado pelo modelo (caso a API forneça esse campo)
//    - `content`: resposta final direta do modelo
//
// 5. Em caso de sucesso, a resposta JSON é retornada ao cliente com os dados extraídos e timestamp.
//
// 6. Em caso de erro, o bloco `catch` captura e loga o erro.
//    - Se houver uma resposta da API com status e payload, esses dados são incluídos no JSON de erro retornado.
//    - O código de status HTTP 500 é retornado como padrão.
//

router.post("/test-api", async (req, res) => {
  try {
    const deepseekApiKey = process.env.DEEPSEEK_API_KEY || "<DeepSeek API Key>";
    const baseUrl = process.env.DEEPSEEK_API_URL || "https://api.deepseek.com";

    // Round 1
    const messages = [
      { role: "user", content: "9.11 and 9.8, which is greater?" },
    ];

    const response1 = await axios.post(
      `${baseUrl}/v1/chat/completions`,
      {
        model: "deepseek-reasoner",
        messages: messages,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${deepseekApiKey}`,
        },
      }
    );

    const reasoning_content =
      response1.data.choices[0].message.reasoning_content;
    const content = response1.data.choices[0].message.content;

    // Retornar os resultados
    res.json({
      success: true,
      round1: {
        reasoning: reasoning_content,
        content: content,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Erro ao testar a API DeepSeek:", error);

    let errorResponse = {
      success: false,
      message: "Erro ao testar a API DeepSeek",
      error: error.message,
      timestamp: new Date().toISOString(),
    };

    if (error.response) {
      errorResponse.status = error.response.status;
      errorResponse.data = error.response.data;
    }

    res.status(500).json(errorResponse);
  }
});

module.exports = router;
