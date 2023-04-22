import React, { createContext, useState } from "react";
import IMAGES from "../assets/images";

export const FavouritesContext = createContext();

const FavouritesProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);

    const checkIfInFavourites = (
        favourites,
        id,
        item,
        setFavourites,
        setHeartIcon
    ) => {
        const inFavourites = favourites.find(
            (favourite) => favourite.id === id
        );
        if (inFavourites) {
            const filteredFavourites = favourites.filter(
                (favourite) => favourite.id !== id
            );
            setFavourites(filteredFavourites);
            setHeartIcon(false);
        } else {
            setFavourites((prev) => [...prev, item]);
            setHeartIcon(true);
        }
    };

    const applyHeartSvg = (heartIcon) =>
        heartIcon ? IMAGES.fullHeart : IMAGES.emptyHeart;

    const value = {
        favourites,
        setFavourites,
        checkIfInFavourites,
        applyHeartSvg,
    };

    return (
        <FavouritesContext.Provider value={value}>
            {children}
        </FavouritesContext.Provider>
    );
};

export default FavouritesProvider;
