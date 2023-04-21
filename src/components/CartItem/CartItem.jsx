import { checkItemQuantity } from "../../services/utility";

const CartItem = ({ id, title, price, image, quantity, cart, setCart }) => {
    const roundedPricePoint = (
        Math.round(quantity * price * 100) / 100
    ).toFixed(2);

    const decrementOnClick = () => {
        const updateItem = cart.map((inCart) => {
            if (inCart.item.id === id) {
                inCart.quantity -= 1;
            }
            return inCart;
        });
        setCart(checkItemQuantity(updateItem));
    };
    const incrementOnClick = () => {
        const updateItem = cart.map((inCart) => {
            if (inCart.item.id === id && inCart.quantity < 10) {
                inCart.quantity += 1;
            }
            return inCart;
        });
        setCart(checkItemQuantity(updateItem));
    };

    return (
        <div>
            <img src="" alt={title} />
            <h5>{title}</h5>
            <div>
                <button type="button" onClick={decrementOnClick}>
                    -
                </button>
                <p>{quantity}</p>
                <button type="button" onClick={incrementOnClick}>
                    +
                </button>
            </div>
            <p>${roundedPricePoint}</p>
        </div>
    );
};

export default CartItem;
