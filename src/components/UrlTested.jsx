import React, { useState } from "react";
import PenTestingOptions from "./PenTestingOptions";

export default function UrlTested() {
  const [url, setUrl] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [resultado, setResultado] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setResultado("Por favor, ingresa un dominio o IP válido.");
      return;
    }

    try {
      const respuesta = await fetch("http://localhost:5000/escanear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ objetivo: url }),
      });
      
      const datos = await respuesta.json();
      setResultado(datos.resultado);
      setShowOptions(true);
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      setResultado("Error al realizar el escaneo o no se pudo conectar al servidor.");
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="">
        <input
          type="url"
          placeholder="URL objetivo"
          required
          className=""
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" className="">
          Escanear
        </button>
      </form>

      {resultado && (
      <div className="resultado-scan">
        <h3>Resultados del escaneo:</h3>
        <ul className="lista-resultados">
          {resultado.split('\n').map((linea, index) => (
            <li key={index} className={
              linea.includes('open') ? 'puerto-abierto' : 
              linea.includes('filtered') ? 'puerto-filtrado' : ''
            }>
              {linea}
            </li>
          ))}
        </ul>
      </div>
    )}
      {showOptions && <PenTestingOptions targetUrl={url} />}
    </div>
  );
}