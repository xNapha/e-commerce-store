import React, { useContext } from "react";
import DisplayItem from "../../components/DisplayItem/DisplayItem";
import CartItem from "../../components/CartItem/CartItem";
import styles from "./ItemList.module.scss";

import { CartContext } from "../../contexts/CartProvider";

import { v4 as uuidv4 } from "uuid";
import { FavouritesContext } from "../../contexts/FavouritesProvider";
const ItemList = ({ stock, inCheckOutPage, inFavouritesPage }) => {
    const { cart, setCart } = useContext(CartContext);
    const { favourites, setFavourites } = useContext(FavouritesContext);
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
                item={item}
            />
        );
    });

    const renderCart = cart?.map((inCart) => {
        const { id, name, price, image, quantity, size, color } = inCart;
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

    const renderFavourites = favourites?.map((favourite) => {
        const { id, name, price, description, image, quantity } = favourite;
        return (
            <DisplayItem
                key={id + uuidv4()}
                id={id}
                name={name}
                price={price}
                description={description}
                image={image}
                quantity={quantity}
                item={favourite}
            />
        );
    });

    return (
        <div className={styles.Item_List}>
            {inCheckOutPage
                ? renderCart
                : inFavouritesPage
                ? renderFavourites
                : renderCurrentStock}
            {inFavouritesPage && favourites.length === 0 && (
                <p>
                    You don't have any favourite items, why not look for
                    something you might like
                </p>
            )}
            {inCheckOutPage && cart.length === 0 && (
                <p>
                    You dont have any items in your cart, why not look for
                    something you might like
                </p>
            )}
        </div>
    );
};

export default ItemList;
