import React, { useContext, useEffect, useState } from "react";
import { fetchStockFromAPI } from "../../services/fetchStock";
import { StockContext } from "../../contexts/StockProvider";
import DisplayItem from "../../components/DisplayItem/DisplayItem";
import styles from "./ItemList.module.scss";
import { CartContext } from "../../contexts/CartProvider";
import { v4 as uuidv4 } from "uuid";
const ItemList = ({ stock, inCheckOutPage }) => {
    const { renderCart } = useContext(CartContext);

    const renderCurrentStock = stock?.map((item) => {
        const { id, title, price, description, image, quantity } = item;
        return (
            <DisplayItem
                key={id + uuidv4()}
                id={id}
                title={title}
                price={price}
                description={description}
                image={image}
                quantity={quantity}
            />
        );
    });

    return (
        <div className={styles.Item_List}>
            {inCheckOutPage ? renderCart : renderCurrentStock}
        </div>
    );
};

export default ItemList;
