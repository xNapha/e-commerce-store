import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../contexts/CartProvider";
import styles from "./NavigationBar.module.scss";
import IMAGES from "../../assets/images";

const NavigationBar = () => {
    const { totalPrice } = useContext(CartContext);

    const getPriceWithDecimals = (Math.round(totalPrice * 100) / 100).toFixed(
        2
    );

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
                    <div className={styles["Navigation_Bar-links-cart"]}>
                        <p>
                            Your Cart{" "}
                            {totalPrice > 0 && (
                                <span>${getPriceWithDecimals}</span>
                            )}
                        </p>
                        {/* <img src={IMAGES.shoppingCart} alt="Checkout" /> */}
                    </div>
                </NavLink>
            </div>
        </header>
    );
};

export default NavigationBar;
