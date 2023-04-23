import React, { useContext, useState, useEffect } from "react";

import { getItemsWithInTheSameCategory } from "../../services/utility";
import ItemList from "../ItemList/ItemList";
import { StockContext } from "../../contexts/StockProvider";
import { checkItemAvailability } from "../../services/DedicatedItemUtility";
import { FavouritesContext } from "../../contexts/FavouritesProvider";
import AddToCartForm from "../AddToCartForm/AddToCartForm";
import styles from "./DedicatedItem.module.scss";
const DedicatedItem = ({
    id,
    name,
    price,
    description,
    image,
    item,
    variants,
}) => {
    const { currentStock } = useContext(StockContext);
    const { favourites, setFavourites, checkIfInFavourites, applyHeartSvg } =
        useContext(FavouritesContext);

    const foundInFavourites = favourites.find(
        (favourite) => favourite.id === id
    );
    const [heartIcon, setHeartIcon] = useState(
        foundInFavourites ? true : false
    );

    const [currentColorVariant, setCurrentColorVariant] = useState(
        item.variants[0]
    );
    const [currentSelectedSize, setCurrentSelectedSize] = useState(
        item.variants[0].sizes[0]
    );
    const lowStockVariable = 5;
    const outOfStockVariable = 0;

    const handleClick = () => {
        checkIfInFavourites(favourites, id, item, setFavourites, setHeartIcon);
    };
    const renderWarning = checkItemAvailability(
        currentSelectedSize,
        lowStockVariable,
        outOfStockVariable
    );

    useEffect(() => {
        foundInFavourites;
        setHeartIcon(foundInFavourites ? true : false);
    }, [item]);

    return (
        <div className={styles.Dedicated_Item}>
            <section className={styles["Dedicated_Item-product"]}>
                <img
                    src={currentColorVariant.images[0]}
                    className={styles["Dedicated_Item-product_image"]}
                />
                <div className={styles["Dedicated_Item-product_information"]}>
                    <section
                        className={
                            styles["Dedicated_Item-product_information-details"]
                        }
                    >
                        <div
                            className={
                                styles[
                                    "Dedicated_Item-product_information-details_header"
                                ]
                            }
                        >
                            <h2>{name}</h2>
                            <div onClick={handleClick}>
                                <img
                                    src={applyHeartSvg(heartIcon)}
                                    alt="heart"
                                    className={
                                        styles[
                                            "Dedicated_Item-product_information-details_header-heart"
                                        ]
                                    }
                                />
                            </div>
                            <h4>
                                ${Math.round((price * 100) / 100).toFixed(2)}
                            </h4>
                        </div>
                        {renderWarning}
                    </section>
                    <AddToCartForm
                        id={id}
                        name={name}
                        price={price}
                        image={image}
                        item={item}
                        variants={variants}
                        currentColorVariant={currentColorVariant}
                        currentSelectedSize={currentSelectedSize}
                        setCurrentColorVariant={setCurrentColorVariant}
                        setCurrentSelectedSize={setCurrentSelectedSize}
                    />
                    <section
                        className={
                            styles[
                                "Dedicated_Item-product_information-description"
                            ]
                        }
                    >
                        {description}
                    </section>
                </div>
            </section>
            <section>
                <h4>You may also like this...</h4>
                <ItemList
                    stock={getItemsWithInTheSameCategory(currentStock, item)}
                />
            </section>
        </div>
    );
};

export default DedicatedItem;
