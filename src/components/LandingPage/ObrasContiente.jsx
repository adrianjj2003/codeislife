import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../../styles/FrameObrasLista.css";
import ArtCard from "../FrameObrasLista/ArtCard";
import ArtworkDetail from "../ArtworkDetail/ArtworkDetail";
import { useTranslation } from "react-i18next";

const isValidImage = (url) =>
  new Promise((resolve) => {
    if (!url) return resolve(false);
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });

const CONTINENT_COUNTRY_MAP = {
  América: [
    "United States", "Mexico", "Canada", "Brazil", "Argentina", "Peru", "Colombia", "Chile", "Cuba", "Venezuela", "Guatemala", "Ecuador", "Bolivia", "Honduras", "Paraguay", "Nicaragua", "El Salvador", "Costa Rica", "Panama", "Jamaica", "Trinidad and Tobago", "Belize", "Barbados", "Saint Lucia", "Saint Vincent and the Grenadines", "Grenada", "Saint Kitts and Nevis", "Antigua and Barbuda", "Dominica", "Saint Pierre and Miquelon", "Bermuda", "The Bahamas", "Aruba", "Curacao", "Saint Barthelemy"
  ],
  Europa: [
    "France", "Italy", "Spain", "Germany", "United Kingdom", "Russia", "Greece", "Netherlands", "Belgium", "Portugal", "Poland", "Sweden", "Finland", "Norway", "Denmark", "Austria", "Switzerland", "Ukraine", "Ireland", "Czech Republic", "Romania", "Hungary", "Bulgaria", "Slovakia", "Croatia", "Serbia", "Bosnia and Herzegovina", "Slovenia", "North Macedonia", "Albania", "Montenegro", "Kosovo", "Moldova", "Estonia", "Latvia", "Lithuania", "Malta", "Andorra", "San Marino", "Liechtenstein", "Monaco", "Vatican City"
  ],
  África: [
    "Egypt", "Nigeria", "South Africa", "Ethiopia", "Morocco", "Algeria", "Ghana", "Tunisia", "Kenya", "Uganda", "Angola", "Mozambique", "Madagascar", "Cameroon", "Côte d'Ivoire", "Niger", "Burkina Faso", "Mali", "Malawi", "Zambia", "Senegal", "Chad", "Somalia", "Zimbabwe", "Guinea", "Benin", "Burundi", "Rwanda", "Togo", "Sierra Leone", "Libya", "Congo", "Liberia", "Mauritania", "Eritrea", "Namibia", "Gabon", "Lesotho", "Equatorial Guinea", "Mauritius", "Swaziland", "Seychelles", "Comoros", "São Tomé and Príncipe", "Cape Verde"
  ],
  Asia: [
    "China", "Japan", "India", "Iran", "Iraq", "Thailand", "Indonesia", "South Korea", "North Korea", "Vietnam", "Malaysia", "Singapore", "Philippines", "Sri Lanka", "Nepal", "Bangladesh", "Pakistan", "Afghanistan", "Kazakhstan", "Uzbekistan", "Turkmenistan", "Kyrgyzstan", "Tajikistan", "Armenia", "Azerbaijan", "Georgia", "Turkey", "Cyprus", "Israel", "Jordan", "Lebanon", "Syria", "Palestine", "Yemen", "Oman", "United Arab Emirates", "Qatar", "Bahrain", "Kuwait", "Saudi Arabia", "Bhutan", "Maldives"
  ],
  Oceanía: [
    "Australia", "New Zealand", "Papua New Guinea", "Fiji", "Solomon Islands", "Vanuatu", "Samoa", "American Samoa", "Tonga", "Tuvalu", "Nauru", "Kiribati", "Marshall Islands", "Palau", "Micronesia", "Northern Mariana Islands", "Guam", "Wake Island", "New Caledonia", "French Polynesia", "Wallis and Futuna", "Niue", "Tokelau"
  ],
};


const ObrasPorContinente = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const continente = location.state?.nombreContinente;

  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  useEffect(() => {
  if (!continente) return;

  const paises = CONTINENT_COUNTRY_MAP[continente] || [];
  const processedIDs = new Set(); // Para evitar duplicados
  const controller = new AbortController(); // Crear un controlador de abortos
  const signal = controller.signal;

  // Limpiar las obras anteriores al cambiar de continente
  setArtworks([]); // Limpiar las obras anteriores
  const fetchArtworks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects", { signal });
      const data = await res.json();
      const allIDs = data.objectIDs || [];
      let loadedCount = 0;
      const maxToLoad = 50;
      const blockSize = 100;

      for (let start = 0; start < allIDs.length && loadedCount < maxToLoad; start += blockSize) {
        const block = allIDs.slice(start, start + blockSize);

        const promises = block.map(async (id) => {
          if (processedIDs.has(id)) return null; // Saltar si ya fue procesado
          processedIDs.add(id); // Marcar como procesado

          try {
            const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`, { signal });
            const obj = await res.json();

            if (obj.primaryImageSmall && paises.includes(obj.country)) {
              setArtworks((prev) => [...prev, obj]); // Actualizar progresivamente
              loadedCount++;
              return obj;
            }
            return null;
          } catch (err) {
            if (err.name === "AbortError") {
              console.log("Solicitud cancelada:", id);
            } else {
              console.error(`Error al procesar ID ${id}:`, err);
            }
            return null;
          }
        });

        await Promise.all(promises);
      }

      setIsLoading(false);
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Solicitud principal cancelada");
      } else {
        console.error("Error al cargar obras:", err);
        setError(err);
      }
      setIsLoading(false);
    }
  };

  fetchArtworks();

  return () => {
    controller.abort(); // Cancelar todas las solicitudes pendientes al desmontar
  };
}, [continente]);


  useEffect(() => {
    if (!isLoading && artworks.length > 0 && !selectedArtwork) {
      const firstCard = document.querySelector(".art-card");
      firstCard?.focus();
    }
  }, [isLoading, artworks, selectedArtwork]);

  const handleBack = () => {
    setSelectedArtwork(null);
    const firstCard = document.querySelector(".art-card");
    firstCard?.focus();
  };

  if (!continente) {
    return <p>{t("sinContinente") || "Continente no especificado."}</p>;
  }

  if (error) {
    return <p>{t("errorCargandoObras")}</p>;
  }

  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <Link to="/" className="home-icon">
          <i className="fas fa-home"></i>
        </Link>
        <h2 className="gallery-title">{continente}</h2>
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

export default ObrasPorContinente;
