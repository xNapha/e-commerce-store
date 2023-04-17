import React, { useContext, useEffect, useState } from "react";
import { fetchStockFromAPI } from "../../services/fetchStock";
import { StockContext } from "../../contexts/StockProvider";
import Item from "../../components/Item/Item";
import styles from "./ItemList.module.scss";
const ItemList = () => {
    const { currentStock } = useContext(StockContext);
    const renderCurrentStock = currentStock.map((item) => {
        const { id, title, price, description, image } = item;
        return (
            <Item
                key={id}
                id={id}
                title={title}
                price={price}
                description={description}
                image={image}
            />
        );
    });
    return <div className={styles.Item_List}>{renderCurrentStock}</div>;
};

export default ItemList;
