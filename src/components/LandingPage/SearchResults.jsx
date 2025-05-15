import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/SearchResults.css";

const SearchResults = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query");
  const [results, setResults] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (query) {
      fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`
      )
        .then((response) => response.json())
        .then((data) => {
          const ids = data.objectIDs?.slice(0, 12) || []; // Limita resultados para no sobrecargar
          return Promise.all(
            ids.map((id) =>
              fetch(
                `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
              ).then((res) => res.json())
            )
          );
        })
        .then((detailedResults) => {
          setResults(detailedResults);
          if (detailedResults.length === 0) {
            setTimeout(() => {
              setShowMessage(true);
            }, 3000); // 2 segundos de retraso antes de mostrar el mensaje
          }
        })
        .catch((error) =>
          console.error("Error fetching artwork details:", error)
        );
    }
  }, [query]);

  return (
    <>
      <div className="container">
        <div className="search-results-container">
          <h1>Resultados de búsqueda: "{query}"</h1>
          <div className="results-container">
            {results.length === 0 && showMessage ? (
              <p>No se encontraron coincidencias.</p>
            ) : (
              results.map((item) => (
                <div key={item.objectID} className="result-card">
                  <h3>{item.title}</h3>
                  <p>
                    <strong>Artista:</strong>{" "}
                    {item.artistDisplayName || "Desconocido"}
                  </p>
                  {item.primaryImageSmall ? (
                    <img src={item.primaryImageSmall} alt={item.title} />
                  ) : (
                    <p>Imagen no disponible</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        <button className="back-button" onClick={() => window.history.back()}>
          ← Volver
        </button>
      </div>
    </>
  );
};

export default SearchResults;
