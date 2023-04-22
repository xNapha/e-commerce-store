import React, { useContext, useState, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../contexts/CartProvider";
import { useForm } from "react-hook-form";
import {
    checkIfInCart,
    getItemsWithInTheSameCategory,
} from "../../services/utility";
import ItemList from "../ItemList/ItemList";
import { StockContext } from "../../contexts/StockProvider";

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
    const { handleSubmit } = useForm();
    const [error, setError] = useState(false);
    const [currentColorVariant, setCurrentColorVariant] = useState(
        item.variants[0]
    );
    const [sizesAvailable, setSizesAvailable] = useState(
        item.variants[0].sizes
    );
    const [currentSelectedSize, setCurrentSelectedSize] = useState(
        item.variants[0].sizes[0].size
    );

    const reducer = (state, action) => {
        switch (action.type) {
            case "increment":
                return {
                    quantity: state.quantity + 1,
                    id: state.id,
                    name: state.name,
                    price: state.price,
                    image: state.image,
                    color: state.color,
                    size: state.size,
                };
            case "decrement":
                return state.quantity <= 1
                    ? {
                          quantity: 1,
                          id: state.id,
                          name: state.name,
                          price: state.price,
                          image: state.image,
                          color: state.color,
                          size: state.size,
                      }
                    : {
                          quantity: state.quantity - 1,
                          id: state.id,
                          name: state.name,
                          price: state.price,
                          image: state.image,
                          color: state.color,
                          size: state.size,
                      };
            case "changeColor":
                return {
                    quantity: 1,
                    id: state.id,
                    name: state.name,
                    price: state.price,
                    image: state.image,
                    color: currentColorVariant.color,
                    size: state.size,
                };
            case "changeSize":
                return {
                    quantity: 1,
                    id: state.id,
                    name: state.name,
                    price: state.price,
                    image: state.image,
                    color: state.color,
                    size: currentSelectedSize,
                };
            case "itemChange":
                return {
                    quantity: 1,
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.variants[0].images[0],
                    color: item.variants[0].color,
                    size: item.variants[0].sizes[0].size,
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, {
        quantity: 1,
        id: id,
        name: name,
        price: price,
        image: image,
        color: currentColorVariant.color,
        size: currentSelectedSize,
    });

    const addToCart = (e) => {
        e.preventDefault();
        setCart(checkIfInCart(cart, state));
        setNewItemAnimation(true);
    };

    const increment = () => {
        if (state.quantity === 10) return setError(true);
        dispatch({ type: "increment" });
    };
    const decrement = () => {
        setError(false);
        dispatch({ type: "decrement" });
    };

    const changeToDifferentColorVaraints = () => {
        return variants.map((variant) => {
            return (
                <button
                    key={variant.color}
                    type="button"
                    onClick={() => {
                        setCurrentColorVariant(variant);
                        dispatch({ type: "changeColor" });
                        setSizesAvailable(variant.sizes);
                    }}
                >
                    {variant.color}
                </button>
            );
        });
    };

    const selectSizeForPurchase = () => {
        return sizesAvailable.map((size) => {
            return (
                <button
                    type="button"
                    key={size.size}
                    onClick={() => {
                        setCurrentSelectedSize(size.size);
                        dispatch({ type: "changeSize" });
                    }}
                >
                    {size.size}
                </button>
            );
        });
    };

    useEffect(() => {
        dispatch({ type: "itemChange" });
        setCurrentColorVariant(item.variants[0]);
    }, [item]);
    useEffect(() => {
        // console.log(currentColorVariant.color);
        // console.log(state);
    });

    return (
        <React.Fragment>
            <section>
                <img src="" alt={name} />
                <div>
                    <h2>{name}</h2>
                    <h4>${price}</h4>
                    <img src={currentColorVariant.images[0]} />
                    <form onSubmit={addToCart}>
                        <div>{changeToDifferentColorVaraints()}</div>
                        <div>{selectSizeForPurchase()}</div>
                        <div>
                            <button type="button" onClick={decrement}>
                                -
                            </button>
                            <p>{state.quantity}</p>
                            <button type="button" onClick={increment}>
                                +
                            </button>
                            {error && <p>Only a maximum of 10 per customer</p>}
                        </div>
                        <button type="submit">{"ADD TO CART"}</button>
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
