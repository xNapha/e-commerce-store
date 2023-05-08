import { useState, useReducer, useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartProvider";
import {
    changeToDifferentColorVaraints,
    selectSizeForPurchase,
    increment,
    decrement,
    addToCart,
    userInputChange,
} from "../../services/DedicatedItemUtility";
import { checkIfInCart } from "../../services/utility";
import styles from "./AddToCartForm.module.scss";
import VariantSelect from "../../components/VariantSelect/VariantSelect";
import FormButton from "../../components/FormButton/FormButton";
import {
    maximumPerCustomerWarningMessage,
    lowStockWarningMessage,
    outOfStockMessage,
    addToCartTextContent,
    maxPurchaseVariable,
    minimumPurchaseVariable,
    outOfStockVariable,
    totalPriceOfCurrentItem,
    checkMaximumQuantity,
} from "../../services/AddToCartFormUtility";

const AddToCartForm = ({
    id,
    name,
    price,
    image,
    item,
    variants,
    currentColorVariant,
    setCurrentColorVariant,
    currentSelectedSize,
    setCurrentSelectedSize,
    setCurrentSelectedImage,
}) => {
    const initialValue = {
        quantity: minimumPurchaseVariable,
        id: id,
        name: name,
        price: price,
        image: image,
        color: currentColorVariant.color,
        size: currentSelectedSize.size,
    };

    const [inputValue, setInputValue] = useState(minimumPurchaseVariable);

    const reducer = (state, action) => {
        if (action.type === "increment") {
            const { quantity, ...rest } = state;
            setInputValue(quantity + 1);
            return { quantity: quantity + 1, ...rest };
        } else if (action.type === "decrement" && state.quantity === 1) {
            const { quantity, ...rest } = state;
            setInputValue(1);
            return { quantity: minimumPurchaseVariable, ...rest };
        } else if (action.type === "decrement" && state.quantity > 1) {
            const { quantity, ...rest } = state;
            setInputValue(quantity - 1);
            return { quantity: quantity - 1, ...rest };
        } else if (action.type === "onChange") {
            const { quantity, ...rest } = state;
            return { quantity: inputValue, ...rest };
        } else if (action.type === "changeColor") {
            const { color, quantity, image, ...rest } = state;
            setInputValue(minimumPurchaseVariable);
            return {
                quantity: minimumPurchaseVariable,
                color: currentColorVariant.color,
                image: currentColorVariant.images[0],
                ...rest,
            };
        } else if (action.type === "changeSize") {
            const { size, quantity, ...rest } = state;
            setInputValue(minimumPurchaseVariable);
            return {
                quantity: minimumPurchaseVariable,
                size: currentSelectedSize.size,
                ...rest,
            };
        } else if (action.type === "itemChange") {
            const { quantity, image, color, size, ...rest } = state;
            setInputValue(minimumPurchaseVariable);
            return {
                quantity: minimumPurchaseVariable,
                image: item.variants[0].images[0],
                color: item.variants[0].color,
                size: item.variants[0].sizes[0].size,
                ...rest,
            };
        } else {
            return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialValue);
    const { cart, setCart, setNewItemAnimation } = useContext(CartContext);
    const [maximumPurchaseError, setMaximumPurchaseError] = useState(false);
    const [lowStockError, setLowStockError] = useState(false);
    const [disableAddToCart, setDisableAddToCart] = useState(false);

    const renderDifferentColourVariantButtons = changeToDifferentColorVaraints(
        variants,
        setCurrentColorVariant,
        dispatch,
        setMaximumPurchaseError,
        setLowStockError,
        setCurrentSelectedImage
    );

    const renderDifferentSizeVariantButtons = selectSizeForPurchase(
        currentColorVariant,
        dispatch,
        setCurrentSelectedSize,
        setMaximumPurchaseError,
        setLowStockError
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        addToCart(setCart, checkIfInCart, cart, state, setNewItemAnimation);
    };

    const handleIncrement = () => {
        increment(
            dispatch,
            setMaximumPurchaseError,
            setLowStockError,
            state,
            maxPurchaseVariable,
            currentSelectedSize
        );
        setInputValue(state.quantity);
    };

    const handleDecrement = () => {
        decrement(dispatch, setMaximumPurchaseError, setLowStockError);
        setInputValue(state.quantity);
    };

    const handleOnChange = (e) => {
        userInputChange(
            e,
            dispatch,
            setInputValue,
            setMaximumPurchaseError,
            setDisableAddToCart
        );
    };

    useEffect(() => {
        dispatch({ type: "itemChange" });
        setCurrentColorVariant(item.variants[0]);
        setMaximumPurchaseError(false);
        setLowStockError(false);
    }, [item]);

    useEffect(() => {
        if (currentSelectedSize.quantity > outOfStockVariable) {
            setDisableAddToCart(false);
        } else {
            setDisableAddToCart(true);
        }
        // if item is already at a maximum of 10 disable button and show warning message
        checkMaximumQuantity(
            cart,
            state,
            setMaximumPurchaseError,
            setDisableAddToCart
        );
    });
    return (
        <form onSubmit={handleSubmit} className={styles["Add_To_Cart_Form"]}>
            <div className={styles["Add_To_Cart_Form-select"]}>
                <VariantSelect
                    name="color"
                    className={styles["Add_To_Cart_Form-select_color"]}
                    selectContent={renderDifferentColourVariantButtons}
                />
                <VariantSelect
                    name="size"
                    className={styles["Add_To_Cart_Form-select_size"]}
                    selectContent={renderDifferentSizeVariantButtons}
                />
            </div>
            <div className={styles["Add_To_Cart_Form-counter"]}>
                <FormButton
                    type="button"
                    onClick={handleDecrement}
                    disabled={disableAddToCart}
                    styles={styles["counter-decrement"]}
                    textContent="-"
                />
                <input
                    value={disableAddToCart ? 0 : inputValue}
                    onChange={handleOnChange}
                    max={maxPurchaseVariable}
                    min={minimumPurchaseVariable}
                    type="number"
                />
                <FormButton
                    type="button"
                    onClick={handleIncrement}
                    disabled={disableAddToCart}
                    styles={styles["counter-increment"]}
                    textContent="+"
                />
            </div>
            <FormButton
                type="submit"
                disabled={disableAddToCart}
                className={styles["Add_To_Cart_Form-cart_button"]}
                textContent={addToCartTextContent(
                    totalPriceOfCurrentItem(price, state.quantity)
                )}
            />
            <div className={styles["Add_To_Cart_Form-error_messages"]}>
                {maximumPurchaseError && maximumPerCustomerWarningMessage}
                {lowStockError && lowStockWarningMessage}
            </div>
        </form>
    );
};

export default AddToCartForm;
