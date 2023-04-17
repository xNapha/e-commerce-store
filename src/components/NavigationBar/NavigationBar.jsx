import React from "react";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
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
                <img src="" alt="Checkout" />
            </NavLink>
        </header>
    );
};

export default NavigationBar;
