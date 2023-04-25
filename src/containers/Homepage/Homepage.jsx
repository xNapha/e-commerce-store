import React from "react";
import IMAGES from "../../images/images";
import styles from "./Homepage.module.scss";
const Homepage = () => {
    return (
        <div className={styles.Homepage}>
            <img src={IMAGES.homepage} />
        </div>
    );
};

export default Homepage;
