import React, { useContext, useEffect, useState } from "react";
import { fetchStockFromAPI } from "../../services/fetchStock";
import { StockContext } from "../../contexts/StockProvider";
import DisplayItem from "../../components/DisplayItem/DisplayItem";
import CartItem from "../../components/CartItem/CartItem";
import styles from "./ItemList.module.scss";

import { CartContext } from "../../contexts/CartProvider";

import { v4 as uuidv4 } from "uuid";
const ItemList = ({ stock, inCheckOutPage }) => {
    const { cart, setCart } = useContext(CartContext);
    const renderCurrentStock = stock?.map((item) => {
        const { id, name, price, description, image, quantity } = item;
        return (
            <DisplayItem
                key={id + uuidv4()}
                id={id}
                name={name}
                price={price}
                description={description}
                image={image}
                quantity={quantity}
            />
        );
    });

    const renderCart = cart?.map((inCart) => {
        const { id, name, price, description, image } = inCart?.item;
        return (
            <CartItem
                key={id}
                id={id}
                name={name}
                price={price}
                image={image}
                quantity={inCart.quantity}
                setCart={setCart}
                cart={cart}
            />
        );
    });

    return (
        <div className={styles.Item_List}>
            {inCheckOutPage ? renderCart : renderCurrentStock}
        </div>
    );
};

export default ItemList;
