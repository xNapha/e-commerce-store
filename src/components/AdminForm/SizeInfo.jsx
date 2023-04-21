import { useState } from "react";
import Field from "./Field";
import Input from "./Input";
import { useForm } from "react-hook-form";

const SizeInfo = ({ number, register, errors }) => {
    return (
        <Field key={number}>
            <Input
                label="Item Size"
                name={`variants[${number}][size]`}
                type="string"
                register={register}
                errors={errors}
            />
            <Input
                label="Item Quantity"
                name={`variants[${number}][quantity]`}
                type="number"
                register={register}
                errors={errors}
            />
        </Field>
    );
};

export default SizeInfo;
