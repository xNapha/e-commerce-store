import React, { useEffect } from "react";
import styles from "./NotFound.module.scss";

const NotFound = () => {
    return (
        <div className={styles.Not_Found}>
            <p>We couldn't find what you were looking for.</p>
            <p>Sending you back to the home page</p>
        </div>
    );
};

export default NotFound;
