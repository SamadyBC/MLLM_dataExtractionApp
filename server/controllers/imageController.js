// server/controllers/imageController.js
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { extractNutritionalData } = require("../services/aiService");

exports.processImage = async (req, res) => {
  console.log("Controlador processImage chamado");
  console.log("req.file:", req.file);

  let inputPath = null;
  let outputPath = null;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "Nenhuma imagem enviada" });
    }

    inputPath = req.file.path;
    outputPath = path.join("uploads", `compressed-${req.file.filename}`);

    console.log("inputPath: ", inputPath);
    console.log("outputPath: ", outputPath);

    // Compressão da imagem com Sharp
    await sharp(inputPath)
      .resize(800) // Redimensiona mantendo a proporção
      .jpeg({ quality: 80 }) // Comprime para JPEG com 80% de qualidade
      .toFile(outputPath);

    // Envio para API de IA para extração de dados nutricionais
    const nutritionalData = await extractNutritionalData(outputPath);

    res.json({
      success: true,
      nutritionalData,
    });
  } catch (error) {
    console.error("Erro ao processar imagem:", error);
    res.status(500).json({
      message: "Erro ao processar imagem",
      error: error.message,
    });
  } finally {
    // Limpar arquivos temporários
    try {
      if (inputPath && fs.existsSync(inputPath)) {
        console.log("Limpou arquivos temporarios de input");
        fs.unlinkSync(inputPath);
      }
      if (outputPath && fs.existsSync(outputPath)) {
        console.log("Limpou arquivos temporarios de output");
        fs.unlinkSync(outputPath);
      }
    } catch (cleanupError) {
      console.error("Erro ao limpar arquivos temporários:", cleanupError);
    }
  }
};
