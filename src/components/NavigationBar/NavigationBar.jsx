import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../contexts/CartProvider";
import styles from "./NavigationBar.module.scss";
import IMAGES from "../../assets/images";

const NavigationBar = () => {
    const { totalItems, newItemAnimation } = useContext(CartContext);

    const applyCartAnimation = newItemAnimation
        ? `${styles.New_Item_In_Cart} ${styles["Navigation_Bar-links-cart"]}`
        : `${styles["Navigation_Bar-links-cart"]}`;

    return (
        <header className={styles.Navigation_Bar}>
            <NavLink to="/attire/">
                <div className={styles["Navigation_Bar-logo"]}>
                    <img src={IMAGES.attireIcon} alt="attire logo" />
                    <h1>attire</h1>
                </div>
            </NavLink>
            <div className={styles["Navigation_Bar-links"]}>
                <NavLink to="/attire/catalogue">Catalogue</NavLink>
                <NavLink to="/attire/favourites">Favourites</NavLink>
                <NavLink to="/attire/checkout">
                    <div className={applyCartAnimation}>
                        <img src={IMAGES.shoppingCart} alt="Checkout" />
                        {totalItems > 0 && <p>{totalItems}</p>}
                    </div>
                </NavLink>
            </div>
        </header>
    );
};

export default NavigationBar;
