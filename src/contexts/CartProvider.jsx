import { createContext, useEffect, useState } from "react";
import { countTotalItemsInCart } from "../services/utility";

export const CartContext = createContext();
// cart will be linked to the firebase/firestore database
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [newItemAnimation, setNewItemAnimation] = useState(false);

    const value = {
        cart,
        setCart,
        totalItems,
        newItemAnimation,
        setNewItemAnimation,
    };

    useEffect(() => {
        if (totalItems !== countTotalItemsInCart(cart)) {
            setTotalItems(countTotalItemsInCart(cart));
        }
    }, [cart]);

    useEffect(() => {
        setTimeout(() => {
            setNewItemAnimation(false);
        }, 1000);
    }, [newItemAnimation]);

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

export default CartProvider;
