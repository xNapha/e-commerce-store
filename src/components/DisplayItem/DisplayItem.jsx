import React from "react";
import { NavLink } from "react-router-dom";
import { itemUrlPath } from "../../services/utility";

const DisplayItem = ({ id, title, price, image, quantity }) => {
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
        <NavLink to={`/topir/puzzles/${itemUrlPath(title)}`}>
            <p>{title}</p>
            <p>{itemLowInStock(quantity)}</p>
        </NavLink>
    );
};

export default DisplayItem;
