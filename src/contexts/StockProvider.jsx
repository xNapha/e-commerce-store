import { createContext, useEffect, useState } from "react";

import { fetchStockFromAPI } from "../services/fetchStock";

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
    const [currentStock, setCurrentStock] = useState([]);
    const [purchasedCart, setPurchasedCart] = useState(false);

    useEffect(() => {
        const wrapper = async () => {
            const stock = await fetchStockFromAPI();
            console.log(stock);
            setCurrentStock(stock);
        };
        wrapper();
    }, [purchasedCart]);
    const value = {
        currentStock,
        setCurrentStock,
        purchasedCart,
        setPurchasedCart,
    };
    return (
        <StockContext.Provider value={value}>{children}</StockContext.Provider>
    );
};

export default StockProvider;
