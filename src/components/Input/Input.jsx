import React from "react";

const Input = ({
    label,
    name,
    type,
    register,
    accept,
    multiple,
    required,
    min,
}) => {
    return (
        <>
            <label>{label}</label>
            <input
                type={type}
                {...register(name)}
                accept={accept}
                multiple={multiple}
                required={required}
                min={min}
            />
        </>
    );
};

export default Input;
