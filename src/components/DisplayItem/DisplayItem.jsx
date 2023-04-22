import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { itemUrlPath } from "../../services/utility";
import { FavouritesContext } from "../../contexts/FavouritesProvider";
import IMAGES from "../../assets/images";

const DisplayItem = ({ id, name, price, image, quantity, item }) => {
    const { favourites, setFavourites, checkIfInFavourites, applyHeartSvg } =
        useContext(FavouritesContext);
    const foundInFavourites = favourites.find(
        (favourite) => favourite.id === id
    );
    const [heartIcon, setHeartIcon] = useState(
        foundInFavourites ? true : false
    );
    const itemLowInStock = (quantity) => {
        let lowStockMessage = "";
        switch (quantity) {
            case quantity <= 10:
                lowStockMessage = `There are only ${quantity} left in stock`;
                break;
            default:
                lowStockMessage = "";
                break;
        }
        return lowStockMessage;
    };

    const handleClick = () => {
        checkIfInFavourites(favourites, id, item, setFavourites, setHeartIcon);
    };

    return (
        <>
            <div onClick={handleClick}>
                <img src={applyHeartSvg(heartIcon)} alt="heart" />
            </div>
            <NavLink to={`/attire/catalogue/${itemUrlPath(name)}`}>
                <p>{name}</p>
                <p>{itemLowInStock(quantity)}</p>
            </NavLink>
        </>
    );
};

export default DisplayItem;
