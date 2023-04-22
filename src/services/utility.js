export const itemUrlPath = (title) => {
    return title
        .replace(/[\W]/gi, " ")
        .split(" ")
        .filter((string) => string)
        .join("+")
        .toLowerCase();
};

const updateCartInformation = (cart, state) => {
    return cart.reduce((acc, curr) => {
        curr.id === state.id &&
        curr.color === state.color &&
        curr.size === state.size
            ? acc.push(state)
            : acc.push(curr);
        return [...acc];
    }, []);
};

export const checkIfInCart = (cart, state) => {
    const foundInCart = cart.find(
        (object) =>
            object.id === state.id &&
            object.color === state.color &&
            object.size === state.size
    );
    return foundInCart ? updateCartInformation(cart, state) : [...cart, state];
};

export const countTotalItemsInCart = (cart) => {
    return cart.reduce((acc, curr) => acc + curr.quantity, 0);
};

export const getItemsWithInTheSameCategory = (currentStock, item) => {
    return currentStock.filter(
        (stock) => stock.category === item.category && stock.id !== item.id
    );
};

// export const getPopularItems = (currentStock, item) => {
//     return currentStock.filter(
//         (stock) => stock.rating.rate > 4 && stock.id !== item.id
//     );
// };

export const getTotalPrice = (cart) => {
    return cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
};

export const checkItemQuantity = (cart) => {
    return cart.filter((inCart) => inCart.quantity !== 0);
};
