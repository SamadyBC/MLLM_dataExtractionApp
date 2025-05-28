// client/src/App.js
import React from "react";
import "./App.css";
import ImageUploader from "./components/ImageUploader";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Análise Nutricional de Alimentos</h1>
      </header>
      <main>
        <ImageUploader />
      </main>
      <footer>
        <p>© 2023 Análise Nutricional App TEste</p>
      </footer>
    </div>
  );
}

export default App;
