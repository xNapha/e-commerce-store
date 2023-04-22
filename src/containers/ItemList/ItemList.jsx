import React, { useContext } from "react";
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
        const { id, name, price, image, quantity, size, color } = inCart;
        console.log(name);
        return (
            <CartItem
                key={id + uuidv4()}
                id={id}
                name={name}
                price={price}
                image={image}
                quantity={quantity}
                setCart={setCart}
                cart={cart}
                size={size}
                color={color}
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
