import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "./ImageUploader.css";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);

    // Criar preview
    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);

    // Limpar resultados anteriores
    setResults(null);
    setError(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxSize: 10485760, // 10MB
    multiple: false,
  });

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResults(response.data.nutritionalData);
    } catch (err) {
      console.error("Erro ao enviar imagem:", err);
      setError(err.response?.data?.message || "Erro ao processar a imagem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="uploader-container">
      <h2>Análise Nutricional de Imagens</h2>

      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Arraste e solte uma imagem aqui, ou clique para selecionar</p>
      </div>

      {preview && (
        <div className="preview-container">
          <img src={preview} alt="Preview" className="image-preview" />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="upload-button"
          >
            {loading ? "Processando..." : "Analisar Imagem"}
          </button>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {results && (
        <div className="results-container">
          <h3>Informações Nutricionais</h3>

          {results.structured && results.structured.alimento && (
            <div className="structured-data">
              <h4>Alimento: {results.structured.alimento}</h4>
              {results.structured.porcao && (
                <p>
                  <strong>Porção:</strong> {results.structured.porcao}
                </p>
              )}

              {results.structured.calorias && (
                <p>
                  <strong>Calorias:</strong> {results.structured.calorias} kcal
                </p>
              )}

              <div className="macronutrientes">
                <h5>Macronutrientes:</h5>
                <ul>
                  {results.structured.macronutrientes.proteinas && (
                    <li>
                      <strong>Proteínas:</strong>{" "}
                      {results.structured.macronutrientes.proteinas}g
                    </li>
                  )}
                  {results.structured.macronutrientes.carboidratos && (
                    <li>
                      <strong>Carboidratos:</strong>{" "}
                      {results.structured.macronutrientes.carboidratos}g
                    </li>
                  )}
                  {results.structured.macronutrientes.gorduras && (
                    <li>
                      <strong>Gorduras:</strong>{" "}
                      {results.structured.macronutrientes.gorduras}g
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}

          <div className="raw-data">
            <h4>Análise Completa:</h4>
            <p>{results.raw}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
