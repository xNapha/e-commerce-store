import React, { useContext, useState, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../contexts/CartProvider";
import { useForm } from "react-hook-form";
import { checkIfInCart } from "../../services/utility";

const reducer = (state, action) => {
    switch (action.type) {
        case "increment":
            return { quantity: state.quantity + 1, item: state.item };
        case "decrement":
            return state.quantity <= 1
                ? { quantity: 1, item: state.item }
                : { quantity: state.quantity - 1, item: state.item };
        default:
            return state;
    }
};

const DedicatedItem = ({ id, title, price, description, image, item }) => {
    const { cart, setCart, setNewItemAnimation } = useContext(CartContext);
    const { handleSubmit } = useForm();
    const [error, setError] = useState(false);
    const [state, dispatch] = useReducer(reducer, { quantity: 1, item: item });
    /*
    show name
    image
    description
    price
    form
    input for quantity
    button to add to cart
    */
    const addToCart = () => {
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
    useEffect(() => {
        console.log(cart, "cart");
    }, []);

    return (
        <React.Fragment>
            <div>
                <img src="" alt={title} />
                <div>
                    <h3>{title}</h3>
                    <h4>{price}</h4>
                    <form onSubmit={handleSubmit(addToCart)}>
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
            </div>
            <div>
                <h4>You may also like this...</h4>
                <div>{/* items all within the same category*/}</div>
            </div>
        </React.Fragment>
    );
};

export default DedicatedItem;
