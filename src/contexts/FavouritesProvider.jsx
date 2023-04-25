import React, { createContext, useEffect, useState, useRef } from "react";
import IMAGES from "../images/images";
import {
    addFavouritesToDatabase,
    favouritesCollectionName,
} from "../services/updateDatabase";
import { fetchDataFromAPI } from "../services/fetchStock";

export const FavouritesContext = createContext();

const FavouritesProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);
    const firstRender = useRef(true);
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

    useEffect(() => {
        const asyncWrapper = async (favouritesCollectionName) => {
            const favouritesInDataBase = await fetchDataFromAPI(
                favouritesCollectionName
            );
            setFavourites(favouritesInDataBase[0].favourites);
        };
        asyncWrapper(favouritesCollectionName);
    }, []);

    useEffect(() => {
        if (!firstRender.current) {
            addFavouritesToDatabase({ favourites: favourites });
        } else {
            firstRender.current = false;
        }
    }, [favourites]);

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
