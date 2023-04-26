import React, { useContext } from "react";
import DisplayItem from "../../components/DisplayItem/DisplayItem";
import CartItem from "../../components/CartItem/CartItem";
import styles from "./ItemList.module.scss";
import { CartContext } from "../../contexts/CartProvider";
import IMAGES from "../../images/images";
import { v4 as uuidv4 } from "uuid";
import { FavouritesContext } from "../../contexts/FavouritesProvider";
const ItemList = ({
    stock,
    inCheckOutPage,
    inFavouritesPage,
    inDedicatedPage,
    inCataloguePage,
    setCurrentSelectedImage,
}) => {
    const { cart, setCart } = useContext(CartContext);
    const { favourites, setFavourites } = useContext(FavouritesContext);
    const renderCurrentStock = stock?.map((item) => {
        const { id, name, price, description, variants } = item;
        return (
            <DisplayItem
                key={id + uuidv4()}
                id={id}
                name={name}
                price={price}
                description={description}
                image={variants[0].images}
                item={item}
                setCurrentSelectedImage={setCurrentSelectedImage}
                inDedicatedPage={inDedicatedPage}
            />
        );
    });

    const renderCart = cart?.map((inCart) => {
        const { id, name, price, quantity, size, color, image } = inCart;
        return (
            <CartItem
                key={id + uuidv4()}
                id={id}
                name={name}
                price={price}
                quantity={quantity}
                setCart={setCart}
                cart={cart}
                size={size}
                color={color}
                image={image}
            />
        );
    });

    const renderFavourites = favourites?.map((favourite) => {
        const { id, name, price, description, variants } = favourite;
        return (
            <DisplayItem
                key={id + uuidv4()}
                id={id}
                name={name}
                price={price}
                description={description}
                item={favourite}
                image={variants[0].images}
            />
        );
    });

    const renderCoverImage = inFavouritesPage ? (
        <img src={IMAGES.favourites} className={styles.Cover_Page_Image} />
    ) : inCataloguePage ? (
        <img src={IMAGES.catalogue} className={styles.Cover_Page_Image} />
    ) : (
        ""
    );

    const itemListStyling =
        inFavouritesPage || inCataloguePage
            ? `${styles.Item_List}  ${styles["Item_List-cover_image_present"]}`
            : inCheckOutPage
            ? styles.Check_Out_Page
            : styles.Item_List;

    return (
        <>
            {renderCoverImage}
            <div className={itemListStyling}>
                {inCheckOutPage
                    ? renderCart
                    : inFavouritesPage
                    ? renderFavourites
                    : renderCurrentStock}
                {inFavouritesPage && favourites.length === 0 && (
                    <p className={styles.Favourites_Page}>
                        You don't have any favourite items, why not look for
                        something you might like
                    </p>
                )}
                {inCheckOutPage && cart.length === 0 && (
                    <p>
                        You dont have any items in your cart, why not look for
                        something you might like
                    </p>
                )}
            </div>
        </>
    );
};

export default ItemList;
