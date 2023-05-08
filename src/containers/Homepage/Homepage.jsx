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

    return (
        <div className={styles.Homepage}>
            <img
                src={IMAGES.homepage}
                className={styles["Homepage_cover-image"]}
            />
            <div className={styles["Homepage_quick-links"]}>
                <NavLink to="/e-commerce-store/catalogue">
                    {`>>>`} The Basic Essentials {`<<<`}
                </NavLink>
            </div>
        </div>
    );
};

export default Homepage;
