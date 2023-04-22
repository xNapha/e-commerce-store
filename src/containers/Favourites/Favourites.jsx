import React, { useContext, useEffect } from "react";
import { FavouritesContext } from "../../contexts/FavouritesProvider";
import ItemList from "../ItemList/ItemList";

const Favourites = () => {
    return (
        <div>
            <ItemList inFavouritesPage={true} />
        </div>
    );
};

export default Favourites;
