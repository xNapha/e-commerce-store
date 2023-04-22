import { checkItemQuantity } from "../../services/utility";

const CartItem = ({
    id,
    name,
    price,
    image,
    quantity,
    size,
    color,
    cart,
    setCart,
}) => {
    const roundedPricePoint = (
        Math.round(quantity * price * 100) / 100
    ).toFixed(2);

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
        <div>
            <img src={image} alt={name} />
            <h5>
                {name} - {size}
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
            <p>${roundedPricePoint}</p>
        </div>
    );
};

export default CartItem;
