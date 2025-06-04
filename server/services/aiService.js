const axios = require("axios");
const fs = require("fs");
const sharp = require("sharp");
const path = require("path");
require("dotenv").config();

function parseNutritionalData(rawData) {
  // Esta função deve ser implementada para analisar e estruturar os dados nutricionais
  // retornados pela API. Por enquanto, vamos retornar o rawData como está.
  // Como estruturar os dados?

  return rawData;
}

exports.extractNutritionalData = async (imagePath) => {
  let resizedImagePath = null;

  try {
    console.log("Iniciando processamento da imagem...");

    // Redimensionar para uma imagem muito pequena para teste
    resizedImagePath = path.join(
      path.dirname(imagePath),
      `resized-${path.basename(imagePath)}`
    );

    await sharp(imagePath)
      .resize(300, 300, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 40 }) // Qualidade muito baixa para teste
      .toFile(resizedImagePath);

    // Ler a imagem redimensionada
    const imageBuffer = fs.readFileSync(resizedImagePath);
    const base64Image = imageBuffer.toString("base64");
    console.log(`Tamanho da string base64: ${base64Image.length} caracteres`);
    const baseUrl = process.env.DEEPSEEK_API_URL;
    const baseUrl1 = process.env.OPENAI_API_URL;

    console.log("Preparando requisição para a GPT4.1 nano");
    console.log(`URL da API: ${process.env.DEEPSEEK_API_URL}`);

    // Configuração para a API DeepSeek R1
    const requestDataBase64 = {
      model: "gpt-4.1-nano",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extraia os dados nutricionais da imagem de uma tabela nutricional que esta em anexo. Por favor, forneça os dados nutricionais em formato JSON bem estruturado e inclua todos os campos relevantes.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 800,
    };

    const requestDataImgURL = {
      model: "gpt-4.1-nano",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extraia os dados nutricionais da imagem de uma tabela nutricional que esta em anexo. Por favor, forneça os dados nutricionais em formato JSON bem estruturado e inclua todos os campos relevantes.",
            },
            {
              type: "image_url",
              image_url: {
                url: `https://gepea.com.br/wp-content/uploads/2022/08/tabela.jpg`,
              },
            },
          ],
        },
      ],
      max_tokens: 800,
    };

    console.log("Enviando requisição para a API da OpenAI...");

    const response = await axios.post(
      `${baseUrl1}/v1/chat/completions`,
      requestDataBase64,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    console.log("Resposta recebida da API da OpenAI");

    // const reasoning_content =
    // response.data.choices[0].message.reasoning_content;
    const content = response.data.choices[0].message.content;

    // console.log(`reasoning_content: ${reasoning_content}`);
    console.log(`content: ${content}`);

    // Extrair e estruturar os dados da resposta
    const nutritionalData = {
      raw: content,
      structured: parseNutritionalData(
        response.data.choices[0].message.content
      ),
    };

    return nutritionalData;
  } catch (error) {
    console.error("Detalhes do erro:");
    if (error.response) {
      // A requisição foi feita e o servidor respondeu com um status diferente de 2xx
      console.error("Status do erro:", error.response.status);
      console.error("Dados da resposta:", error.response.data);
      console.error("Headers da resposta:", error.response.headers);
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      console.error("Requisição sem resposta:", error.request);
    } else {
      // Algo aconteceu na configuração da requisição que causou o erro
      console.error("Erro na configuração da requisição:", error.message);
    }

    throw new Error(`Falha ao analisar a imagem: ${error.message}`);
  }
};
