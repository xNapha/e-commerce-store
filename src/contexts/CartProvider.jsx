import { createContext, useEffect, useState } from "react";
import { countTotalItemsInCart } from "../services/utility";
import CartItem from "../components/CartItem/CartItem";

export const CartContext = createContext();
// cart will be linked to the firebase/firestore database
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [newItemAnimation, setNewItemAnimation] = useState(false);

    const renderCart = cart?.map((inCart) => {
        const { id, title, price, description, image } = inCart?.item;
        console.log(image);
        return (
            <CartItem
                key={id}
                id={id}
                title={title}
                price={price}
                image={image}
                quantity={inCart.quantity}
            />
        );
    });

    const value = {
        cart,
        setCart,
        totalItems,
        newItemAnimation,
        setNewItemAnimation,
        renderCart,
    };

    useEffect(() => {
        if (totalItems !== countTotalItemsInCart(cart)) {
            setTotalItems(countTotalItemsInCart(cart));
        }
    }, [cart]);

    useEffect(() => {
        if (newItemAnimation) {
            setTimeout(() => {
                setNewItemAnimation(false);
            }, 1000);
        }
    }, [newItemAnimation]);

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

export default CartProvider;
