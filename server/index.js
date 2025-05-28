const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const imageRoutes = require("./routes/imageRoutes");

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
} else {
  console.log("Pasta de uploads já existe.");
}

const app = express();
const PORT = process.env.PORT || 5555;

app.use(cors());
app.use(express.json());

// Rotas para processamento de imagens
// Primeiro argumento - url da api - destino.
// Segundo argumento - arquivo responsavel pela implementacao das rotas.
app.use("/api/images", imageRoutes);

// Rota de verificação de saúde
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Servidor funcionando corretamente",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
