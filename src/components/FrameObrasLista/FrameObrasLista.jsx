import React, { useState, useEffect } from "react";
import "../../styles/FrameObrasLista.css";
import ArtCard from "./ArtCard";
import ArtworkDetail from "../ArtworkDetail/ArtworkDetail";
import { useTranslation } from "react-i18next";
import useFetchArtworks from "../../hooks/useFetchArtworks";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom"; 

const FrameObrasLista = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const filterFn = location.state?.filterFn || (() => true); 

  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const { artworks, isLoading, error } = useFetchArtworks(filterFn);

  const title = t("destacado");

  useEffect(() => {
    if (!isLoading && artworks.length > 0 && !selectedArtwork) {
      const firstCard = document.querySelector(".art-card");
      firstCard?.focus();
    }
  }, [isLoading, artworks, selectedArtwork]);

  const handleBack = () => {
    setSelectedArtwork(null);
    const firstCard = document.querySelector(".art-card");
    if (firstCard) {
      firstCard.focus(); // Solo enfoca si el elemento existe
    }
  };

  if (error) {
    return <p>{t("errorCargandoObras")}</p>;
  }

  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <Link to="/" className="home-icon">
          <i className="fas fa-home"></i>
        </Link>

        <h2 className="gallery-title">{title}</h2>
      </header>

      {selectedArtwork ? (
        <ArtworkDetail artwork={selectedArtwork} onBack={handleBack} />
      ) : isLoading && artworks.length === 0 ? (
        <p>{t("cargandoObras")}</p>
      ) : (
        <div className="gallery-grid">
          {artworks.map((art, index) => (
            <ArtCard
              key={index}
              title={art.title}
              artist={art.artistDisplayName || t("desconocido")}
              date={art.objectDate}
              image={art.primaryImageSmall}
              onInfoClick={() => setSelectedArtwork(art)}
              tabIndex={0}
              onKeyDown={(e) => {
                const grid = document.querySelector(".gallery-grid");
                const cards = Array.from(grid.querySelectorAll(".art-card"));
                const columns = Math.floor(grid.offsetWidth / cards[0].offsetWidth);

                let newIndex = index;

                if (e.key === "ArrowRight") {
                  newIndex = (index + 1) % cards.length;
                } else if (e.key === "ArrowLeft") {
                  newIndex = (index - 1 + cards.length) % cards.length;
                } else if (e.key === "ArrowDown") {
                  newIndex = (index + columns) % cards.length;
                } else if (e.key === "ArrowUp") {
                  newIndex = (index - columns + cards.length) % cards.length;
                } else if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedArtwork(art);
                  return;
                }

                cards[newIndex]?.focus();
                e.preventDefault();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FrameObrasLista;