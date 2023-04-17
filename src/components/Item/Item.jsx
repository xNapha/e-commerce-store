import React from "react";
import { NavLink } from "react-router-dom";
import { itemUrlPath } from "../../services/utility";

const Item = ({ id, title, price, image }) => {
    return (
        <NavLink to={itemUrlPath(title)}>
            <p>{title}</p>
        </NavLink>
    );
};

export default Item;
