import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../contexts/CartProvider";
import ItemList from "../ItemList/ItemList";
import { getTotalPrice, roundedTotalPrice } from "../../services/utility";
import { reduceStock } from "../../services/updateDatabase";
import { StockContext } from "../../contexts/StockProvider";
import styles from "./CheckOut.module.scss";

const CheckOut = () => {
    const { cart, setCart } = useContext(CartContext);
    const { purchasedCart, setPurchasedCart } = useContext(StockContext);
    const { currentStock } = useContext(StockContext);

    const onSubmit = (e) => {
        e.preventDefault();
        setPurchasedCart(true);
        reduceStock(cart, currentStock);
        setCart([]);
    };
    useEffect(() => {
        return setPurchasedCart(false);
    }, []);

    const checkOutSummarySection = (
        <section>
            <p>
                Total Price (inc. GST): $
                {roundedTotalPrice(getTotalPrice(cart))}{" "}
            </p>
            <form onSubmit={onSubmit}>
                <button>Check Out</button>
            </form>
        </section>
    );

    return (
        <div className={styles.Check_Out}>
            {purchasedCart && <p>Thank you for your purchase</p>}
            {!purchasedCart && <ItemList inCheckOutPage={true} />}
            {!purchasedCart && cart.length > 0 && checkOutSummarySection}
        </div>
    );
};

export default CheckOut;
