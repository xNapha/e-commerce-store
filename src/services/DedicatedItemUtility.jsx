export const selectSizeForPurchase = (
    currentColorVariant,
    dispatch,
    setCurrentSelectedSize,
    setError,
    setLowStockError
) => {
    const handleClick = (size) => {
        dispatch({ type: "changeSize" });
        setCurrentSelectedSize(size);
        setError(false);
        setLowStockError(false);
    };
    return currentColorVariant.sizes.map((size) => {
        return (
            <button
                type="button"
                key={size.size}
                onClick={() => {
                    handleClick(size);
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
    const handleClick = (variant) => {
        setCurrentColorVariant(variant);
        dispatch({ type: "changeColor" });
        setError(false);
        setLowStockError(false);
    };
    return variants.map((variant) => {
        return (
            <button
                key={variant.color}
                type="button"
                onClick={() => {
                    handleClick(variant);
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
    const { quantity } = currentSelectedSize;
    return quantity > lowStockVariable ? (
        ""
    ) : quantity <= lowStockVariable && quantity > outOfStockVariable ? (
        <p>Only {quantity} remain </p>
    ) : (
        <p>Out of Stock</p>
    );
};
