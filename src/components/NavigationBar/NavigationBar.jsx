import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../contexts/CartProvider";
import styles from "./NavigationBar.module.scss";

const NavigationBar = () => {
    const { totalItems, newItemAnimation } = useContext(CartContext);

    const applyCartAnimation = newItemAnimation
        ? `${styles.New_Item_In_Cart} ${styles["Navigation_Bar-cart"]}`
        : `${styles["Navigation_Bar-cart"]}`;

    return (
        <header>
            <NavLink to="/attire/">
                <div>
                    <img src="" alt="logo" />
                    <h1>attire</h1>
                </div>
            </NavLink>
            <NavLink to="/attire/catalogue">Catalogue</NavLink>
            <NavLink to="/attire/favourites">Favourites</NavLink>
            <NavLink to="/attire/checkout">
                <div className={applyCartAnimation}>
                    <img src="" alt="Checkout" />
                    {totalItems > 0 && <p>{totalItems}</p>}
                </div>
            </NavLink>
        </header>
    );
};

export default NavigationBar;
