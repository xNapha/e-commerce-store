import React, { useContext, useState, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../contexts/CartProvider";
import { useForm } from "react-hook-form";
import {
    checkIfInCart,
    getItemsWithInTheSameCategory,
    getPopularItems,
} from "../../services/utility";
import ItemList from "../ItemList/ItemList";
import { StockContext } from "../../contexts/StockProvider";
import UserReviewForm from "../../components/UserReviewForm/UserReviewForm";

const DedicatedItem = ({
    id,
    title,
    price,
    description,
    image,
    item,
    rate,
}) => {
    const { cart, setCart, setNewItemAnimation } = useContext(CartContext);
    const { currentStock } = useContext(StockContext);
    const { handleSubmit } = useForm();
    const [error, setError] = useState(false);
    const [reviewFormVisibility, setReviewFormVisibility] = useState(false);

    const reducer = (state, action) => {
        switch (action.type) {
            case "increment":
                return { quantity: state.quantity + 1, item: state.item };
            case "decrement":
                return state.quantity <= 1
                    ? { quantity: 1, item: state.item }
                    : { quantity: state.quantity - 1, item: state.item };
            case "itemChange":
                return { quantity: 1, item: item };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, { quantity: 1, item: item });

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
    const showReviewForm = () => {
        setReviewFormVisibility(!reviewFormVisibility);
    };

    useEffect(() => {
        dispatch({ type: "itemChange" });
    }, [item]);

    return (
        <React.Fragment>
            <section>
                <img src="" alt={title} />
                <div>
                    <h2>{title}</h2>
                    <h3>{rate}/5</h3>
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
            </section>
            <section>
                <h4>You may also like this...</h4>
                <ItemList
                    stock={getItemsWithInTheSameCategory(currentStock, item)}
                />
            </section>
            <section>
                <h4>Our most popular items</h4>
                <ItemList stock={getPopularItems(currentStock, item)} />
            </section>
            <section>
                <div>
                    <h3>See what others had to think about our product</h3>
                    <button type="button" onClick={showReviewForm}>
                        Leave a Review
                    </button>
                    {reviewFormVisibility && <UserReviewForm />}
                </div>
            </section>
        </React.Fragment>
    );
};

export default DedicatedItem;
