import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { itemUrlPath } from "../../services/utility";
import { FavouritesContext } from "../../contexts/FavouritesProvider";
import IMAGES from "../../assets/images";
import styles from "./DisplayItem.module.scss";

const DisplayItem = ({ id, name, price, image, quantity, item }) => {
    const { favourites, setFavourites, checkIfInFavourites, applyHeartSvg } =
        useContext(FavouritesContext);
    const miniumStockAvailableBeforeWarning = 25;
    const [lowStockWarning, setLowStockWarning] = useState(false);
    const [hoverOverItem, setHoverOverItem] = useState(false);
    const foundInFavourites = favourites.find(
        (favourite) => favourite.id === id
    );
    const [heartIcon, setHeartIcon] = useState(
        foundInFavourites ? true : false
    );

    const itemLowInStock = (quantity) => {
        let lowStockMessage = "";
        switch (quantity) {
            case quantity <= 10:
                lowStockMessage = `There are only ${quantity} left in stock`;
                break;
            default:
                lowStockMessage = "";
                break;
        }
        return lowStockMessage;
    };

    const handleClick = (e) => {
        e.preventDefault();
        checkIfInFavourites(favourites, id, item, setFavourites, setHeartIcon);
    };

    const onMouseEnter = () => {
        setHoverOverItem(true);
    };
    const onMouseLeave = () => {
        setHoverOverItem(true);
    };

    const lowStockCardStyles = lowStockWarning
        ? `${styles["Display_Item-low_stock_warning"]} ${styles["low_stock_warning-visible"]}`
        : `${styles["Display_Item-low_stock_warning"]}`;

    useEffect(() => {
        const totalStockOfItem = item.variants.reduce(
            (acc, curr) =>
                (acc += curr.sizes.reduce(
                    (acc, curr) => acc + Number(curr.quantity),

                    0
                )),

            0
        );
        if (totalStockOfItem > miniumStockAvailableBeforeWarning)
            return setLowStockWarning(true);
    }, []);

    return (
        <div className={styles.Display_Item}>
            <NavLink to={`/attire/catalogue/${itemUrlPath(name)}`}>
                {lowStockWarning && hoverOverItem && (
                    <div
                        className={lowStockCardStyles}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        Low Stock
                    </div>
                )}
                <section>
                    <div className={styles["Display_Item-images"]}>
                        <img
                            src={image}
                            alt={name}
                            className={styles["Display_Item-images-preview"]}
                        />
                        <img
                            src={applyHeartSvg(heartIcon)}
                            alt="heart"
                            onClick={handleClick}
                            className={styles["Display_Item-images-heart"]}
                        />
                    </div>
                    <div className={styles["Display_Item-item"]}>
                        <p className={styles["Display_Item-item_name"]}>
                            {name}
                        </p>
                        <p className={styles["Display_Item-item_price"]}>
                            ${(Math.round(price * 100) / 100).toFixed(2)}
                        </p>
                    </div>
                </section>
            </NavLink>
        </div>
    );
};

export default DisplayItem;
