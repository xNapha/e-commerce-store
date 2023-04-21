import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartProvider";
import ItemList from "../ItemList/ItemList";
import { getTotalPrice } from "../../services/utility";
import { useForm } from "react-hook-form";
import { reduceStock } from "../../services/updateDatabase";

const CheckOut = () => {
    const { register, handleSubmit } = useForm();
    const { cart, setCart } = useContext(CartContext);
    const roundedTotalPrice = (
        Math.round(getTotalPrice(cart) * 100) / 100
    ).toFixed(2);
    const onSubmit = (e) => {
        e.preventDefault();
        reduceStock(cart);
    };

    return (
        <div>
            <ItemList inCheckOutPage={true} />
            <section>
                <p>Total Price: ${roundedTotalPrice}</p>
                <form onSubmit={onSubmit}>
                    <button>Check Out</button>
                </form>
            </section>
        </div>
    );
};

export default CheckOut;
