import React, { useContext, useState, useEffect } from "react";
import IMAGES from "../../images/images";
import { getItemsWithInTheSameCategory } from "../../services/utility";
import ItemList from "../ItemList/ItemList";
import { StockContext } from "../../contexts/StockProvider";
import { checkItemAvailability } from "../../services/DedicatedItemUtility";
import { FavouritesContext } from "../../contexts/FavouritesProvider";
import AddToCartForm from "../AddToCartForm/AddToCartForm";
import styles from "./DedicatedItem.module.scss";
import { CartContext } from "../../contexts/CartProvider";
const DedicatedItem = ({ id, name, price, description, item, variants }) => {
    const { currentStock } = useContext(StockContext);
    const { favourites, setFavourites, checkIfInFavourites, applyHeartSvg } =
        useContext(FavouritesContext);
    const { cart } = useContext(CartContext);

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
    const [currentSelectedImage, setCurrentSelectedImage] = useState(
        item.variants[0].images[0]
    );
    const [imagesIndex, setImagesIndex] = useState(0);
    const lowStockVariable = 5;
    const outOfStockVariable = 0;

    const previousImage = () => {
        const previousIndex = imagesIndex - 1;
        const absolutePreviousIndex = Math.abs(previousIndex) % 4;
        setImagesIndex(previousIndex);
        setCurrentSelectedImage(
            currentColorVariant.images[absolutePreviousIndex]
        );
    };
    const nextImage = () => {
        const nextIndex = imagesIndex + 1;
        const absoluteNextIndex = Math.abs(nextIndex) % 4;
        setImagesIndex(nextIndex);
        setCurrentSelectedImage(currentColorVariant.images[absoluteNextIndex]);
    };

    const handleClick = () => {
        checkIfInFavourites(favourites, id, item, setFavourites, setHeartIcon);
    };
    const renderWarning = checkItemAvailability(
        currentSelectedSize,
        lowStockVariable,
        outOfStockVariable
    );

    const renderVariantImages = currentColorVariant.images.map((image) => {
        return (
            <img
                src={image}
                key={image}
                className={styles["Dedicated_Item-product_image_carousel"]}
                onClick={() => {
                    setCurrentSelectedImage(image);
                }}
            />
        );
    });

    useEffect(() => {
        foundInFavourites;
        setHeartIcon(foundInFavourites ? true : false);
    }, [item]);

    return (
        <div className={styles.Dedicated_Item}>
            <section className={styles["Dedicated_Item-product"]}>
                <div>
                    <div
                        className={
                            styles["Dedicated_Item-product_image_buttons"]
                        }
                    >
                        <div
                            className={` ${styles["Dedicated_Item-product_arrows"]} ${styles["Dedicated_Item-product_previous_image"]}`}
                            onClick={previousImage}
                        >
                            <img src={IMAGES.arrowLeft} alt="left arrow" />
                        </div>
                        <div
                            className={` ${styles["Dedicated_Item-product_arrows"]} ${styles["Dedicated_Item-product_next_image"]}`}
                            onClick={nextImage}
                        >
                            <img src={IMAGES.arrowRight} alt="right arrow" />
                        </div>
                    </div>
                    <img
                        src={currentSelectedImage}
                        className={
                            styles["Dedicated_Item-product_current_image"]
                        }
                    />
                    <div>{renderVariantImages}</div>
                </div>
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
                            <h2>
                                <span onClick={handleClick}>
                                    <img
                                        src={applyHeartSvg(heartIcon)}
                                        alt="heart"
                                        className={
                                            styles[
                                                "Dedicated_Item-product_information-details_header-heart"
                                            ]
                                        }
                                    />
                                </span>
                                {name}
                            </h2>
                        </div>
                        {renderWarning}
                    </section>
                    <AddToCartForm
                        id={id}
                        name={name}
                        price={price}
                        item={item}
                        variants={variants}
                        currentColorVariant={currentColorVariant}
                        currentSelectedSize={currentSelectedSize}
                        setCurrentColorVariant={setCurrentColorVariant}
                        setCurrentSelectedSize={setCurrentSelectedSize}
                        setCurrentSelectedImage={setCurrentSelectedImage}
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
                <h4>You may also like these...</h4>
                <ItemList
                    inDedicatedPage={true}
                    stock={getItemsWithInTheSameCategory(currentStock, item)}
                    setCurrentSelectedImage={setCurrentSelectedImage}
                />
            </section>
        </div>
    );
};

export default DedicatedItem;
