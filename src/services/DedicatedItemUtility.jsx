export const selectSizeForPurchase = (
    currentColorVariant,
    dispatch,
    setCurrentSelectedSize,
    setError,
    setLowStockError
) => {
    return currentColorVariant.sizes.map((size) => {
        return (
            <button
                type="button"
                key={size.size}
                onClick={() => {
                    dispatch({ type: "changeSize" });
                    setCurrentSelectedSize(size);
                    setError(false);
                    setLowStockError(false);
                }}
            >
                {size.size}
            </button>
        );
    });
};
export const changeToDifferentColorVaraints = (
    variants,
    setCurrentColorVariant,
    dispatch,
    setError,
    setLowStockError
) => {
    return variants.map((variant) => {
        return (
            <button
                key={variant.color}
                type="button"
                onClick={() => {
                    setCurrentColorVariant(variant);
                    dispatch({ type: "changeColor" });
                    setError(false);
                    setLowStockError(false);
                }}
            >
                {variant.color}
            </button>
        );
    });
};

export const increment = (
    dispatch,
    setError,
    setLowStockError,
    state,
    maxPurchaseVariable,
    currentSelectedSize
) => {
    if (state.quantity === maxPurchaseVariable) return setError(true);
    if (state.quantity === currentSelectedSize.quantity)
        return setLowStockError(true);
    dispatch({ type: "increment" });
};

export const decrement = (dispatch, setError, setLowStockError) => {
    setError(false);
    setLowStockError(false);
    dispatch({ type: "decrement" });
};

export const addToCart = (
    setCart,
    checkIfInCart,
    cart,
    state,
    setNewItemAnimation
) => {
    setCart(checkIfInCart(cart, state));
    setNewItemAnimation(true);
};

export const checkItemAvailability = (
    currentSelectedSize,
    lowStockVariable,
    outOfStockVariable
) => {
    return currentSelectedSize.quantity > lowStockVariable ? (
        ""
    ) : currentSelectedSize.quantity <= lowStockVariable &&
      currentSelectedSize.quantity > outOfStockVariable ? (
        <p>Only {currentSelectedSize.quantity} remain </p>
    ) : (
        <p>Out of Stock</p>
    );
};
