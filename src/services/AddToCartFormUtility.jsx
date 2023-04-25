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
