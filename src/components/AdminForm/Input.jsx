import React from "react";

const Input = ({
    label,
    name,
    type,
    register,
    accept,
    multiple,
    errors,
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
            {errors && errors[name] && <p>{errors[name].message}</p>}
        </>
    );
};

export default Input;
