import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (item) => {
    setFavorites(prev => {
      // Check if item already exists
      const exists = prev.find(fav => 
        fav.id === item.id && fav.partnerId === item.partnerId
      );
      if (exists) return prev;
      
      return [...prev, item];
    });
  };

  const removeFromFavorites = (itemId, partnerId) => {
    setFavorites(prev => 
      prev.filter(fav => !(fav.id === itemId && fav.partnerId === partnerId))
    );
  };

  const toggleFavorite = (item) => {
    const exists = favorites.find(fav => 
      fav.id === item.id && fav.partnerId === item.partnerId
    );
    
    if (exists) {
      removeFromFavorites(item.id, item.partnerId);
    } else {
      addToFavorites(item);
    }
  };

  const isFavorite = (itemId, partnerId) => {
    return favorites.some(fav => 
      fav.id === itemId && fav.partnerId === partnerId
    );
  };

  const getFavorites = () => favorites;

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      toggleFavorite,
      isFavorite,
      getFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};
