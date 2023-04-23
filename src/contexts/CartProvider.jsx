import { createContext, useEffect, useState } from "react";
import { countTotalPriceInCart } from "../services/utility";

export const CartContext = createContext();
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const value = {
        cart,
        setCart,
        totalPrice,
    };

    useEffect(() => {
        setTotalPrice(countTotalPriceInCart(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

export default CartProvider;
