import { createContext, useEffect, useState } from "react";
import { dataBaseCollectionName } from "../services/updateDatabase";
import { fetchDataFromAPI } from "../services/fetchStock";

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
    const [currentStock, setCurrentStock] = useState([]);
    const [purchasedCart, setPurchasedCart] = useState(false);

    useEffect(() => {
        const wrapper = async (collectionName) => {
            const stock = await fetchDataFromAPI(collectionName);
            setCurrentStock(stock);
        };
        wrapper(dataBaseCollectionName);
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
