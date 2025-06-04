const axios = require("axios");
const fs = require("fs");
const sharp = require("sharp");
const path = require("path");
require("dotenv").config();

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

    console.log("Preparando requisição para DeepSeek R1");
    console.log(`URL da API: ${process.env.DEEPSEEK_API_URL}`);

    // Configuração para a API DeepSeek R1
    const requestData = {
      model: "deepseek-reasoner",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extraia os dados nutricionais das imagen de uma tabela nutricional que esta em anexo",
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

    const alternativeRequestData = {
      model: "deepseek-reasoner", // ou "deepseek-chat"
      messages: [
        {
          role: "user",
          content: `Analise esta imagem de tabela nutricional e extraia todas as informações nutricionais visíveis.
                       [IMAGEM: data:image/jpeg;base64,${base64Image}]`,
        },
      ],
      max_tokens: 800,
    };

    const alternativeRequestData2 = {
      model: "deepseek-reasoner",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extraia os dados nutricionais das imagens de uma tabela nutricional que está em anexo",
            },
            {
              type: "image_url",
              image_url: {
                // Aqui você deve fornecer uma URL pública acessível da imagem
                url: "https://gepea.com.br/wp-content/uploads/2022/08/tabela.jpg", // Substitua por uma URL real da sua imagem
              },
            },
          ],
        },
      ],
      max_tokens: 800,
    };

    // console.log("Enviando requisição para a API DeepSeek R1...");

    // const response = await axios.post(
    //   `${baseUrl}/v1/chat/completions`,
    //   alternativeRequestData2,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    //     },
    //   }
    // );

    // console.log("Resposta recebida da API DeepSeek R1");

    console.log("Enviando requisição para a API da OpenAI...");

    const response = await axios.post(`${baseUrl1}`, alternativeRequestData2, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
    });

    console.log("Resposta recebida da API da OpenAI");

    // const reasoning_content =
    // response.data.choices[0].message.reasoning_content;
    // const content = response.data.choices[0].message.content;

    console.log(`reasoning_content: ${reasoning_content}`);
    console.log(`content: ${content}`);

    // Extrair e estruturar os dados da resposta
    const nutritionalData = {
      raw: content,
      // structured: parseNutritionalData(
      // response.data.choices[0].message.content
      // ),
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
