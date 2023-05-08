export const maxPurchaseVariable = 10;
export const minimumPurchaseVariable = 1;
export const outOfStockVariable = 0;

export const maximumPerCustomerWarningMessage = (
    <p>Only a maximum of {maxPurchaseVariable} per customer</p>
);
export const lowStockWarningMessage = (
    <p>We are low on stock unfortunately you wont be able to purchase more</p>
);
export const outOfStockMessage = (
    <p>
        Sorry we are currently out of stock of this particular size, check again
        later
    </p>
);
export const addToCartTextContent = (totalPriceOfCurrentItem) => {
    return `ADD TO CART - $${totalPriceOfCurrentItem}`;
};

export const totalPriceOfCurrentItem = (price, quantity) => {
    return Math.round((price * quantity * 100) / 100).toFixed(2);
};

export const checkMaximumQuantity = (
    cart,
    state,
    setMaximumPurchaseError,
    setDisableAddToCart
) => {
    const found = itemInCart(cart, state);
    if (found && found.quantity >= 10) {
        setMaximumPurchaseError(true);
        setDisableAddToCart(true);
    }
};

const itemInCart = (cart, state) => {
    const foundInCart = cart.find(
        (object) =>
            object.id === state.id &&
            object.color === state.color &&
            object.size === state.size
    );
    return foundInCart;
};
