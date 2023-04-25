import React, { useContext } from "react";
import IMAGES from "../../images/images";
import styles from "./Homepage.module.scss";
import { StockContext } from "../../contexts/StockProvider";
import { NavLink } from "react-router-dom";

const Homepage = () => {
    const { currentStock } = useContext(StockContext);

    const getCategories = currentStock?.reduce((acc, curr) => {
        const itemInAcc = acc.find((item) => item.category === curr.category);
        if (!itemInAcc) {
            acc.push({
                category: curr.category,
                image: curr.variants[0].images[3],
            });
        }
        return acc;
    }, []);

    const renderCategories = getCategories.map((item) => {
        return (
            <NavLink to="/e-commerce-store/catalogue" key={item.category}>
                <div>
                    <img src={item.image} />
                    <h1>{item.category}</h1>
                </div>
            </NavLink>
        );
    });
    return (
        <div className={styles.Homepage}>
            <img
                src={IMAGES.homepage}
                className={styles["Homepage_cover-image"]}
            />
            <div className={styles["Homepage_quick-links"]}>
                <h1>What we sell</h1>
                <div>{renderCategories}</div>
            </div>
        </div>
    );
};

export default Homepage;
