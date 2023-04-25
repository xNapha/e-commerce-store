import { createContext, useEffect, useState } from "react";
import { dataBaseCollectionName } from "../services/updateDatabase";
import { fetchDataFromAPI } from "../services/fetchStock";

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
    const [currentStock, setCurrentStock] = useState([]);
    const [purchasedCart, setPurchasedCart] = useState(false);
    const [adminFormSent, setAdminFormSent] = useState(0);
    useEffect(() => {
        const wrapper = async (collectionName) => {
            const stock = await fetchDataFromAPI(collectionName);
            setCurrentStock(stock);
        };
        wrapper(dataBaseCollectionName);
    }, [purchasedCart, adminFormSent]);

    const value = {
        currentStock,
        setCurrentStock,
        purchasedCart,
        setPurchasedCart,
        setAdminFormSent,
    };

    return (
        <StockContext.Provider value={value}>{children}</StockContext.Provider>
    );
};

export default StockProvider;
