import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../../styles/popup_museos.css";
import estatuaLibertad from "./../../assets/img/estatuaLibertad.png";
import { useTranslation } from "react-i18next";

const PopupMuseos = () => {
  const { t, i18n } = useTranslation();
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [mapaUrl, setMapaUrl] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setMostrarPopup(true);
        window.removeEventListener("scroll", handleScroll); // Ya no escucha más después de la primera vez
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOk = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setMapaUrl(
            `https://www.google.com/maps?q=museos&ll=${lat},${lon}&z=14&output=embed`
          );
        },
        () => {
          setMapaUrl(`https://www.google.com/maps?q=museos&output=embed`);
        }
      );
    } else {
      setMapaUrl(`https://www.google.com/maps?q=museos&output=embed`);
    }
  };

  const handleCancel = () => {
    setMostrarPopup(false);
  };

  return ReactDOM.createPortal(
    <div className={`popup ${mostrarPopup ? "mostrar" : ""}`}>
      <div className={`popup-museos ${mapaUrl ? "con-mapa" : ""}`}>
        <button className="cerrar-btn" onClick={handleCancel}>
          ❌
        </button>
        {!mapaUrl ? (
          <>
            <p>{t("museosCercanos")} </p>
            <div className="botones">
              <button onClick={handleOk}>OK</button>
              <button onClick={handleCancel}>{t("cancelar")}</button>
            </div>
          </>
        ) : (
          <iframe
            title="Mapa Museos"
            src={mapaUrl}
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: "10px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        )}
      </div>
      <img src={estatuaLibertad} alt="estatua libertad" />
    </div>,
    document.body
  );
};

export default PopupMuseos;
