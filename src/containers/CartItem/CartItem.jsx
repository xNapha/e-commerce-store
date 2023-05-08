import { checkItemQuantity, roundedTotalPrice } from "../../services/utility";
import styles from "./CartItem.module.scss";
const CartItem = ({
    id,
    name,
    price,
    quantity,
    size,
    color,
    cart,
    setCart,
    image,
}) => {
    const decrementOnClick = () => {
        const updateItem = cart.map((inCart) => {
            if (
                inCart.id === id &&
                inCart.size === size &&
                inCart.color === color
            ) {
                inCart.quantity -= 1;
            }
            return inCart;
        });
        setCart(checkItemQuantity(updateItem));
    };
    const incrementOnClick = () => {
        const updateItem = cart.map((inCart) => {
            if (
                inCart.id === id &&
                inCart.size === size &&
                inCart.color === color &&
                inCart.quantity < 10
            ) {
                inCart.quantity += 1;
            }
            return inCart;
        });
        setCart(checkItemQuantity(updateItem));
    };

    return (
        <div className={styles.Cart_Item}>
            <img src={image} alt={name} />
            <h5>
                {name} - {color}/{size}
            </h5>
            <div>
                <button type="button" onClick={decrementOnClick}>
                    -
                </button>
                <p>{quantity}</p>
                <button type="button" onClick={incrementOnClick}>
                    +
                </button>
            </div>
            <p>${roundedTotalPrice(quantity * price)}</p>
        </div>
    );
};

export default CartItem;
