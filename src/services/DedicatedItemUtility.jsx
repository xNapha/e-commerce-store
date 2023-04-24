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
            <option
                type="button"
                key={size.size}
                onClick={() => {
                    handleClick(size);
                }}
            >
                {size.size.replace(/(([X]*[L,M,S]){1})/i, (e) =>
                    e.toUpperCase()
                )}
            </option>
        );
    });
};
export const changeToDifferentColorVaraints = (
    variants,
    setCurrentColorVariant,
    dispatch,
    setError,
    setLowStockError,
    setCurrentSelectedImage
) => {
    const handleClick = (variant) => {
        setCurrentSelectedImage(variant.images[0]);
        setCurrentColorVariant(variant);
        dispatch({ type: "changeColor" });
        setError(false);
        setLowStockError(false);
    };
    return variants.map((variant) => {
        return (
            <option
                key={variant.color}
                onClick={() => {
                    handleClick(variant);
                }}
            >
                {variant.color.replace(/[a-z]/i, (e) => e.toUpperCase())}
            </option>
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
export const userInputChange = (e, dispatch, setInputValue, setError) => {
    const currentVal = Number(e.target.value);
    setInputValue(currentVal);
    setError(false);
    if (currentVal > 10) {
        setError(true);
        setInputValue(10);
    }
    dispatch({ type: "onChange" });
};

export const addToCart = (setCart, checkIfInCart, cart, state) => {
    console.log(state);
    setCart(checkIfInCart(cart, state));
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
