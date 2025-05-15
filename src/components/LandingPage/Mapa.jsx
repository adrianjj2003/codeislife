import React from "react";
import { useState, useEffect, useRef } from "react";
import "../../styles/mapa.css";
import mapaImagen from "../../assets/img/mapa1.png"; // Ajusta la ruta si está en otro sitio
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Mapa = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [manualSelectOpen, setManualSelectOpen] = useState(false);
  const [selectedCont, setSelectedCont] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleClick = (nombreContinente) => {
    navigate("/continente", { state: { nombreContinente } });
  };

  const handleManualSelect = () => {
    if (selectedCont) {
      // Aquí podrías navegar a una página específica o hacer lo que necesites
      alert(`Has seleccionado: ${selectedCont}`);
      setManualSelectOpen(false);
      handleClick(selectedCont);
    }
  };

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      {/* Tooltip: lo ponemos fuera del mapa para que sea fijo en pantalla */}
      {hovered && (
        <div
          className="tooltip"
          style={{
            position: "fixed",
            top: mousePos.y + 15 + "px",
            left: mousePos.x + 15 + "px",
            backgroundColor: "rgb(255, 246, 246)",
            color: "rgb(44, 42, 42)",
            padding: "8px 12px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "bold",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            zIndex: 1000,
          }}
        >
          {hovered}
        </div>
      )}
      <div className="fondo-mapa">
        <div className="mapa"></div>
        <img src={mapaImagen} alt="Mapa del mundo" style={{ width: "100%" }} />

        <div className="manual">
          <button
            className="btn-manual"
            onClick={() => setManualSelectOpen(true)}
          >
            {t("manual")}
          </button>
        </div>

        {/* Selector manual */}
        {manualSelectOpen && (
          <div className="manual-selector">
            <select
              value={selectedCont}
              onChange={(e) => setSelectedCont(e.target.value)}
            >
              <option value="">Seleccione un continente</option>
              <option value="África">África</option>
              <option value="Europa">Europa</option>
              <option value="Asia">Asia</option>
              <option value="Oceanía">Oceanía</option>
              <option value="América">América</option>
              {/* Añade más países aquí */}
            </select>
            <div style={{ marginTop: "10px" }}>
              <button
                className="btn-manual"
                onClick={handleManualSelect}
                style={{ marginRight: "5px" }}
              >
                OK
              </button>
              <button
                className="btn-manual"
                onClick={() => setManualSelectOpen(false)}
              >
                {t("cancelar")}
              </button>
            </div>
          </div>
        )}

        <div
          id="america"
          alt="America"
          onClick={() => handleClick("América")}
          onMouseEnter={() => setHovered("América")}
          onMouseLeave={() => setHovered(null)}
          onMouseMove={handleMouseMove}
        />
        <div
          id="africa"
          alt="Africa"
          onClick={() => handleClick("África")}
          onMouseEnter={() => setHovered("África")}
          onMouseLeave={() => setHovered(null)}
          onMouseMove={handleMouseMove}
        />
        <div
          id="europa"
          alt="Europa"
          onClick={() => handleClick("Europa")}
          onMouseEnter={() => setHovered("Europa")}
          onMouseLeave={() => setHovered(null)}
          onMouseMove={handleMouseMove}
        />
        <div
          id="asia"
          alt="Asia"
          onClick={() => handleClick("Asia")}
          onMouseEnter={() => setHovered("Asia")}
          onMouseLeave={() => setHovered(null)}
          onMouseMove={handleMouseMove}
        />
        <div
          id="oceania"
          alt="Oceania"
          onClick={() => handleClick("Oceanía")}
          onMouseEnter={() => setHovered("Oceanía")}
          onMouseLeave={() => setHovered(null)}
          onMouseMove={handleMouseMove}
        />
      </div>
    </>
  );
};

export default Mapa;
