import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../styles/FrameObrasLista.css";
import ArtCard from "../FrameObrasLista/ArtCard";
import ArtworkDetail from "../ArtworkDetail/ArtworkDetail";
import { useTranslation } from "react-i18next";

const ObrasPorDepartamento = () => {
  const { departmentId } = useParams();
  const { t } = useTranslation();

  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [departmentName, setDepartmentName] = useState(""); 
  
  useEffect(() => {
    const fetchDepartmentName = async () => {
      try {
        const res = await fetch(
          "https://collectionapi.metmuseum.org/public/collection/v1/departments"
        );
        const data = await res.json();
        const department = data.departments.find(
          (dept) => dept.departmentId === parseInt(departmentId)
        );
        if (department) {
          setDepartmentName(department.displayName);
        }
      } catch (err) {
        console.error("Error al obtener el nombre del departamento:", err);
      }
    };

    fetchDepartmentName();
  }, [departmentId]);

  useEffect(() => {
    const fetchArtworks = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departmentId}`
        );
        const data = await res.json();
        const objectIDs = data.objectIDs || [];

        const promises = objectIDs.slice(0, 50).map(async (id) => {
          const res = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
          );
          const obj = await res.json();
          if (obj.primaryImageSmall) {
            return obj;
          }
          return null;
        });

        const results = await Promise.all(promises);
        const validArtworks = results.filter((art) => art !== null);
        setArtworks(validArtworks);
        setIsLoading(false);
      } catch (err) {
        console.error("Error al cargar obras:", err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchArtworks();
  }, [departmentId]);

  const handleBack = () => {
    setSelectedArtwork(null);
    const firstCard = document.querySelector(".art-card");
    if (firstCard) {
      firstCard.focus();
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
        <h2 className="gallery-title">{departmentName || t("obrasPorDepartamento")}</h2>
      </header>

      {selectedArtwork ? (
        <ArtworkDetail artwork={selectedArtwork} onBack={handleBack} />
      ) : isLoading ? (
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
                const columns = Math.floor(
                  grid.offsetWidth / cards[0].offsetWidth
                );

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

export default ObrasPorDepartamento;