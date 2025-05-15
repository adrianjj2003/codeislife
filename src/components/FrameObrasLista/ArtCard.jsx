import React from 'react';
import '../../styles/ArtCard.css';
import { useTranslation } from "react-i18next";

const ArtCard = ({ title, artist, date, image, onInfoClick, tabIndex, onKeyDown }) => {
  const { t } = useTranslation();

  return (
    <div
      className="art-card"
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      onClick={onInfoClick}   
      style={{ cursor: 'pointer' }}
    >
      <img src={image} alt={title} className="art-card-image" />
      <h3 className="art-card-title">{title}</h3>
      <p><strong>{t("artista")}:</strong> {artist}</p>
      <p><strong>{t("fecha")}:</strong> {date}</p>
      <a
        href="#"
        className="art-card-link"
        onClick={(e) => {
          e.preventDefault();
          onInfoClick();
        }}
      >
        + info
      </a>
    </div>
  );
};

export default ArtCard;