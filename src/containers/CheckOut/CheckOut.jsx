import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../contexts/CartProvider";
import ItemList from "../ItemList/ItemList";
import { getTotalPrice } from "../../services/utility";
import { reduceStock } from "../../services/updateDatabase";
import { StockContext } from "../../contexts/StockProvider";
import styles from "./CheckOut.module.scss";
const CheckOut = () => {
    const { cart, setCart } = useContext(CartContext);
    const { purchasedCart, setPurchasedCart } = useContext(StockContext);
    const { currentStock } = useContext(StockContext);
    const roundedTotalPrice = (
        Math.round(getTotalPrice(cart) * 100) / 100
    ).toFixed(2);

    const onSubmit = (e) => {
        e.preventDefault();
        setPurchasedCart(true);
        reduceStock(cart, currentStock);
        setCart([]);
    };

    useEffect(() => {
        return setPurchasedCart(false);
    }, [cart]);

    const checkOutSummarySection = (
        <section>
            <p>Total Price (inc. GST): ${roundedTotalPrice} </p>
            <form onSubmit={onSubmit}>
                <button>Check Out</button>
            </form>
        </section>
    );

    return (
        <div className={styles.Check_Out}>
            <ItemList inCheckOutPage={true} />
            {purchasedCart && <p>Thank you for your purchase</p>}
            {!purchasedCart && cart.length > 0 && checkOutSummarySection}
        </div>
    );
};

export default CheckOut;
