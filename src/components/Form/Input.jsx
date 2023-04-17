import React from "react";

const Input = ({ label, name, type, register, accept, multiple, errors }) => {
    return (
        <>
            <label>{label}</label>
            <input
                type={type}
                {...register(name)}
                accept={accept}
                multiple={multiple}
            />
            {errors && errors[name] && <p>{errors[name].message}</p>}
        </>
    );
};

export default Input;
