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
        curr.item.id === state.item.id ? acc.push(state) : acc.push(curr);
        return [...acc];
    }, []);
};

export const checkIfInCart = (cart, state) => {
    const foundInCart = cart.find((object) => object.item.id === state.item.id);
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

export const getPopularItems = (currentStock, item) => {
    return currentStock.filter(
        (stock) => stock.rating.rate > 4 && stock.id !== item.id
    );
};

export const getTotalPrice = (cart) => {
    return cart.reduce((acc, curr) => acc + curr.quantity * curr.item.price, 0);
};
