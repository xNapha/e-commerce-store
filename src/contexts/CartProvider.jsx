import { createContext, useEffect, useRef, useState } from "react";
import { fetchDataFromAPI } from "../services/fetchStock";
import { countTotalPriceInCart } from "../services/utility";
import {
    addCartToDatabase,
    cartCollectionName,
} from "../services/updateDatabase";

export const CartContext = createContext();
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const firstRender = useRef(true);
    const [totalPrice, setTotalPrice] = useState(0);

    const value = {
        cart,
        setCart,
        totalPrice,
    };
    useEffect(() => {
        const asyncWrapper = async (cartCollectionName) => {
            const cartInDataBase = await fetchDataFromAPI(cartCollectionName);
            setCart(cartInDataBase[0].cart);
        };
        asyncWrapper(cartCollectionName);
    }, []);

    useEffect(() => {
        setTotalPrice(countTotalPriceInCart(cart));
        if (!firstRender.current) {
            addCartToDatabase({ cart: cart });
        } else {
            firstRender.current = false;
        }
    }, [cart]);

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

export default CartProvider;
