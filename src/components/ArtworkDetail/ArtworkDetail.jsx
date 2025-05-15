import React, { useState, useEffect } from 'react';
import '../../styles/ArtworkDetail.css';

const ArtworkDetail = ({ artwork, onBack }) => {
  const [imageIndex, setImageIndex] = useState(0);

  // Hook para inicializar el índice de la imagen
  useEffect(() => {
    setImageIndex(0);
  }, [artwork]);

  // Precarga imágenes adyacentes
  const images = [
    artwork?.primaryImageSmall || artwork?.primaryImage,
    ...(artwork?.additionalImages || [])
  ].filter(Boolean);

  const currentImage = images[imageIndex];

  useEffect(() => {
    if (images.length > 0) {
      const preloadImages = [
        currentImage,
        images[(imageIndex - 1 + images.length) % images.length],
        images[(imageIndex + 1) % images.length]
      ];
      preloadImages.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [imageIndex, images]);

  // Retorno temprano si no hay obra
  if (!artwork) return null;

  const handlePrevImage = () =>
    setImageIndex((i) => (i - 1 + images.length) % images.length);
  const handleNextImage = () =>
    setImageIndex((i) => (i + 1) % images.length);

  const {
    title,
    artistDisplayName,
    objectDate,
    department,
    culture,
    period,
    objectBeginDate
  } = artwork;

  return (
    <div className="artwork-detail-container">
      <header className="detail-header">
        <button className="btn-back" onClick={onBack}>
          <i className="fas fa-arrow-left"></i>
          <span> Volver</span>
        </button>
        <h1 className="detail-title">{title?.toUpperCase()}</h1>
      </header>

      <div className="detail-body">
        <div className="image-section">
          <div className="image-wrapper">
            {currentImage ? (
              <img src={currentImage} alt={title} />
            ) : (
              <p>No hay imagen disponible</p>
            )}
          </div>
        </div>

        <div className="nav-controls">
          {images.length > 1 && (
            <>  
              <button className="nav-arrow" onClick={handlePrevImage} disabled={images.length < 2}>
                <i className="fas fa-arrow-left"></i>
              </button>
              <button className="nav-arrow" onClick={handleNextImage} disabled={images.length < 2}>
                <i className="fas fa-arrow-right"></i>
              </button>
            </>
          )}
        </div>

        <ul className="detail-info">
          <li><strong>Artista:</strong> {artistDisplayName || 'Desconocido'}</li>
          <li><strong>Fecha:</strong> {objectDate || 'Desconocido'}</li>
          <li><strong>Departamento:</strong> {department || 'Desconocido'}</li>
          <li><strong>Cultura:</strong> {culture || 'Desconocido'}</li>
          <li><strong>Periodo histórico:</strong> {period || 'Desconocido'}</li>
          <li><strong>Año adquisición:</strong> {objectBeginDate || 'Desconocido'}</li>
        </ul>
      </div>
    </div>
  );
};

export default ArtworkDetail;
