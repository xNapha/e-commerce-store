import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { itemUrlPath } from "../../services/utility";
import { FavouritesContext } from "../../contexts/FavouritesProvider";
import IMAGES from "../../images/images";
import styles from "./DisplayItem.module.scss";
import ItemBasicInfo from "../../components/ItemBasicInfo/ItemBasicInfo";

const DisplayItem = ({
    id,
    name,
    price,
    image,
    item,
    setCurrentSelectedImage,
    inDedicatedPage,
}) => {
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

    const handleClick = (e) => {
        e.preventDefault();
        checkIfInFavourites(favourites, id, item, setFavourites, setHeartIcon);
    };

    const onMouseEnter = () => {
        setHoverOverItem(true);
    };
    const onMouseLeave = () => {
        setHoverOverItem(false);
    };

    const displayItem = hoverOverItem ? image[0] : image[1];

    const getPrice = (Math.round(price * 100) / 100).toFixed(2);

    useEffect(() => {
        const totalStockOfItem = item.variants.reduce(
            (acc, curr) =>
                (acc += curr.sizes.reduce(
                    (acc, curr) => acc + Number(curr.quantity),

                    0
                )),

            0
        );
        if (totalStockOfItem <= miniumStockAvailableBeforeWarning)
            return setLowStockWarning(true);
    }, []);

    return (
        <div
            className={styles.Display_Item}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => {
                if (inDedicatedPage) {
                    setCurrentSelectedImage(image);
                }
            }}
        >
            <NavLink to={`/e-commerce-store/catalogue/${itemUrlPath(name)}`}>
                {lowStockWarning && (
                    <div
                        className={`${styles["Display_Item-low_stock_warning"]} ${styles["low_stock_warning-visible"]}`}
                    >
                        Low Stock
                    </div>
                )}
                <ItemBasicInfo
                    displayItem={displayItem}
                    name={name}
                    applyHeartSvg={applyHeartSvg}
                    heartIcon={heartIcon}
                    handleClick={handleClick}
                    hoverOverItem={hoverOverItem}
                    getPrice={getPrice}
                />
            </NavLink>
        </div>
    );
};

export default DisplayItem;
