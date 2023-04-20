import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartProvider";
import ItemList from "../ItemList/ItemList";
import Item from "../../components/DisplayItem/DisplayItem";
import { getTotalPrice } from "../../services/utility";

const CheckOut = () => {
    const { cart, setCart } = useContext(CartContext);
    const roundedTotalPrice = (
        Math.round(getTotalPrice(cart) * 100) / 100
    ).toFixed(2);
    const renderCart = cart?.map((inCart) => {
        const { id, title, price, description, image } = inCart?.item;
        return (
            <Item
                key={id}
                id={id}
                title={title}
                price={price}
                description={description}
                image={image}
            />
        );
    });

    return (
        <div>
            <ItemList inCheckOutPage={true} />
            <section>
                <p>Total Price: ${roundedTotalPrice}</p>
                <form action="">
                    <button>Check Out</button>
                </form>
            </section>
        </div>
    );
};

export default CheckOut;
