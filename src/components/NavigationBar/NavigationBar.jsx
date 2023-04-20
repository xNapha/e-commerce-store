import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../contexts/CartProvider";
import { countTotalItemsInCart } from "../../services/utility";

const NavigationBar = () => {
    const { totalItems, newItemAnimation } = useContext(CartContext);

    const newItemInCart = "yes";

    useEffect(() => {}, [totalItems]);
    return (
        <header>
            <NavLink to="/topir/">
                <div>
                    <img src="" alt="logo" />
                    <h1>Topir</h1>
                </div>
            </NavLink>
            <NavLink to="/topir/puzzles">Catalogue</NavLink>
            <NavLink to="/topir/checkout">
                <div>
                    {" "}
                    {newItemAnimation && <p>yes</p>}
                    <img src="" alt="Checkout" />
                    {totalItems > 0 && <p>{totalItems}</p>}
                </div>
            </NavLink>
        </header>
    );
};

export default NavigationBar;
