import { createContext, useState } from "react";

export const CartContext = createContext();
// cart will be linked to the firebase/firestore database
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({});
    const value = { cart, setCart };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

export default CartProvider;
