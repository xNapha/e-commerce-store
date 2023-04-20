import React from "react";

const CartItem = ({ id, title, price, image, quantity }) => {
    const roundedPricePoint = (
        Math.round(quantity * price * 100) / 100
    ).toFixed(2);

    return (
        <div>
            <img src="" alt={title} />
            <h5>{title}</h5>
            <p>{quantity}</p>
            <p>${roundedPricePoint}</p>
        </div>
    );
};

export default CartItem;
