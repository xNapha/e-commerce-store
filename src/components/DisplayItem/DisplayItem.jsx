import React from "react";
import { NavLink } from "react-router-dom";
import { itemUrlPath } from "../../services/utility";

const DisplayItem = ({ id, name, price, image, quantity }) => {
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

    return (
        <NavLink to={`/attire/catalogue/${itemUrlPath(name)}`}>
            <p>{name}</p>
            <p>{itemLowInStock(quantity)}</p>
        </NavLink>
    );
};

export default DisplayItem;
