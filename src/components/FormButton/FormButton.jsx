import React from "react";

const FormButton = ({ type, onClick, textContent, styles, disabled }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={styles}
            disabled={disabled}
        >
            {textContent}
        </button>
    );
};

export default FormButton;
