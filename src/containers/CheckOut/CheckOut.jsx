import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../contexts/CartProvider";
import ItemList from "../ItemList/ItemList";
import { getTotalPrice } from "../../services/utility";
import { reduceStock } from "../../services/updateDatabase";
import { StockContext } from "../../contexts/StockProvider";

const CheckOut = () => {
    const { cart, setCart } = useContext(CartContext);
    const { purchasedCart, setPurchasedCart } = useContext(StockContext);
    const [error, setError] = useState(false);
    const { currentStock } = useContext(StockContext);
    const roundedTotalPrice = (
        Math.round(getTotalPrice(cart) * 100) / 100
    ).toFixed(2);

    const onSubmit = (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            return setError(true);
        }
        setPurchasedCart(true);
        reduceStock(cart, currentStock);
        setCart([]);
    };

    useEffect(() => {
        if (cart.length === 0) {
            setError(true);
        }
        return setPurchasedCart(false);
    }, [cart]);

    const checkOutSummarySection = (
        <section>
            <p>Total Price (inc. GST): ${roundedTotalPrice} </p>
            <form onSubmit={onSubmit}>
                <button disabled={error}>Check Out</button>
            </form>
        </section>
    );

    return (
        <div>
            <ItemList inCheckOutPage={true} />
            {purchasedCart && <p>Thank you for your purchase</p>}
            {!purchasedCart && cart.length > 0 && checkOutSummarySection}
        </div>
    );
};

export default CheckOut;
