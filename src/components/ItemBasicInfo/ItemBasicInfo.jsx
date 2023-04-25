import React from "react";
import IMAGES from "../../images/images";
import styles from "./ItemBasicInfo.module.scss";

const ItemBasicInfo = ({
    displayItem,
    name,
    applyHeartSvg,
    heartIcon,
    handleClick,
    hoverOverItem,
    getPrice,
}) => {
    return (
        <section>
            <div className={styles["Item_Basic_Info-images"]}>
                <img
                    src={displayItem ?? IMAGES.defaultImage}
                    alt={name}
                    className={styles["Item_Basic_Info-images-preview"]}
                />
                <img
                    src={applyHeartSvg(heartIcon)}
                    alt="heart"
                    onClick={handleClick}
                    className={styles["Item_Basic_Info-images-heart"]}
                />
            </div>
            <div className={styles["Item_Basic_Info-item"]}>
                <p className={styles["Item_Basic_Info-item_name"]}>{name}</p>
                {hoverOverItem ? <p>${getPrice}</p> : ""}
            </div>
        </section>
    );
};

export default ItemBasicInfo;
