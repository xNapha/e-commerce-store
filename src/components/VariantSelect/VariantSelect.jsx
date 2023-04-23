import React from "react";

const VariantSelect = ({ name, className, selectContent }) => {
    return (
        <>
            <label htmlFor={name}>{name}</label>
            <select name={name} className={className}>
                {selectContent}
            </select>
        </>
    );
};

export default VariantSelect;
