import React, { useContext, useState, useReducer, useEffect } from "react";
import { CartContext } from "../../contexts/CartProvider";
import {
    checkIfInCart,
    getItemsWithInTheSameCategory,
} from "../../services/utility";
import ItemList from "../ItemList/ItemList";
import { StockContext } from "../../contexts/StockProvider";
import {
    changeToDifferentColorVaraints,
    selectSizeForPurchase,
    increment,
    decrement,
    addToCart,
    checkItemAvailability,
} from "../../services/DedicatedItemUtility";

const DedicatedItem = ({
    id,
    name,
    price,
    description,
    image,
    item,
    variants,
}) => {
    const { cart, setCart, setNewItemAnimation } = useContext(CartContext);
    const { currentStock } = useContext(StockContext);
    const [error, setError] = useState(false);
    const [lowStockError, setLowStockError] = useState(false);
    const [disableAddToCart, setDisableAddToCart] = useState(false);
    const [currentColorVariant, setCurrentColorVariant] = useState(
        item.variants[0]
    );
    const [currentSelectedSize, setCurrentSelectedSize] = useState(
        item.variants[0].sizes[0]
    );
    const maxPurchaseVariable = 10;
    const lowStockVariable = 5;
    const outOfStockVariable = 0;

    const reducer = (state, action) => {
        if (action.type === "increment") {
            const { quantity, ...rest } = state;
            return { quantity: quantity + 1, ...rest };
        } else if (action.type === "decrement" && state.quantity === 1) {
            const { quantity, ...rest } = state;
            return { quantity: 1, ...rest };
        } else if (action.type === "decrement" && state.quantity > 1) {
            const { quantity, ...rest } = state;
            return { quantity: quantity - 1, ...rest };
        } else if (action.type === "changeColor") {
            const { color, quantity, ...rest } = state;
            return { quantity: 1, color: currentColorVariant.color, ...rest };
        } else if (action.type === "changeSize") {
            const { size, quantity, ...rest } = state;
            return { quantity: 1, size: currentSelectedSize.size, ...rest };
        } else if (action.type === "itemChange") {
            const { quantity, image, color, size, ...rest } = state;
            return {
                quantity: 1,
                image: item.variants[0].images[0],
                color: item.variants[0].color,
                size: item.variants[0].sizes[0].size,
                ...rest,
            };
        } else {
            return state;
        }
    };

    const initialValue = {
        quantity: 1,
        id: id,
        name: name,
        price: price,
        image: image,
        color: currentColorVariant.color,
        size: currentSelectedSize.size,
    };

    const [state, dispatch] = useReducer(reducer, initialValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        addToCart(setCart, checkIfInCart, cart, state, setNewItemAnimation);
    };

    const handleIncrement = () => {
        increment(
            dispatch,
            setError,
            setLowStockError,
            state,
            maxPurchaseVariable,
            currentSelectedSize
        );
    };

    const handleDecrement = (e) => {
        decrement(dispatch, setError, setLowStockError);
    };

    useEffect(() => {
        dispatch({ type: "itemChange" });
        setCurrentColorVariant(item.variants[0]);
        setError(false);
        setLowStockError(false);
    }, [item]);

    useEffect(() => {
        currentSelectedSize.quantity > outOfStockVariable
            ? setDisableAddToCart(false)
            : setDisableAddToCart(true);
    });

    return (
        <React.Fragment>
            <section>
                <img src="" alt={name} />
                <div>
                    <h2>{name}</h2>
                    <h4>${price}</h4>
                    {checkItemAvailability(
                        currentSelectedSize,
                        lowStockVariable,
                        outOfStockVariable
                    )}
                    <img src={currentColorVariant.images[0]} />
                    <form onSubmit={handleSubmit}>
                        <div>
                            {changeToDifferentColorVaraints(
                                variants,
                                setCurrentColorVariant,
                                dispatch,
                                setError,
                                setLowStockError
                            )}
                        </div>
                        <div>
                            {selectSizeForPurchase(
                                currentColorVariant,
                                dispatch,
                                setCurrentSelectedSize,
                                setError,
                                setLowStockError
                            )}
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={handleDecrement}
                                disabled={disableAddToCart}
                            >
                                -
                            </button>
                            <p>
                                {disableAddToCart
                                    ? outOfStockVariable
                                    : state.quantity}
                            </p>
                            <button
                                type="button"
                                onClick={handleIncrement}
                                disabled={disableAddToCart}
                            >
                                +
                            </button>
                            {error && (
                                <p>
                                    Only a maximum of {maxPurchaseVariable} per
                                    customer
                                </p>
                            )}
                            {lowStockError && (
                                <p>
                                    We are low on stock unfortunately you wont
                                    be able to purchase more
                                </p>
                            )}
                        </div>
                        <button type="submit" disabled={disableAddToCart}>
                            {"ADD TO CART"}
                        </button>
                    </form>
                </div>
            </section>
            <section>
                <h4>You may also like this...</h4>
                <ItemList
                    stock={getItemsWithInTheSameCategory(currentStock, item)}
                />
            </section>
            {/* <section>
                <h4>Our most popular items</h4>
                <ItemList stock={getPopularItems(currentStock, item)} />
            </section> */}
        </React.Fragment>
    );
};

export default DedicatedItem;
