import React, { createContext, useContext, useEffect, useState } from 'react';


// Define the shape of the context
interface FavoritesContextType {
  favorites: Photo[];
  addToFavorites: (photo: Photo) => void;
}

interface Photo {
  id: number;
  title: string;
}
// Create the context
const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addToFavorites: () => {},
});

// Define a provider component to manage the favorites state
export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Photo[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (photo: Photo) => {
    setFavorites((prevFavorites) => [...prevFavorites, photo]);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to access the favorites context
export const useFavorites = () => useContext(FavoritesContext);
