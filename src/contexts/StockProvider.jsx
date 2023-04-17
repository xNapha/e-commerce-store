import { createContext, useEffect, useState } from "react";

import { fetchStockFromAPI } from "../services/fetchStock";

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
    const [currentStock, setCurrentStock] = useState([]);

    useEffect(() => {
        const wrapper = async () => {
            const stock = await fetchStockFromAPI();
            setCurrentStock(stock);
        };
        wrapper();
        console.log("render");
    }, []);
    const value = { currentStock, setCurrentStock };
    return (
        <StockContext.Provider value={value}>{children}</StockContext.Provider>
    );
};

export default StockProvider;
