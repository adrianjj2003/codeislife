import { useState, useEffect } from "react";

const isValidImage = (url) =>
  new Promise((resolve) => {
    if (!url) return resolve(false);
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });

const useFetchArtworks = (filterFn) => {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects");
        const data = await res.json();
        const objectIDs = data.objectIDs.sort(() => Math.random() - 0.5);
        let count = 0;

        for (let i = 0; i < objectIDs.length && count < 50; i++) {
          try {
            const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectIDs[i]}`);
            const obj = await res.json();

            if (filterFn(obj) && await isValidImage(obj.primaryImageSmall)) {
              setArtworks(prev => [...prev, obj]);
              count++;
            }
          } catch (err) {
            console.error(`Error con objeto ${objectIDs[i]}:`, err);
          }
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error al cargar obras:", err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchArtworks();
  }, [filterFn]);

  return { artworks, isLoading, error };
};

export default useFetchArtworks;
