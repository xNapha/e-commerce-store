import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Field from "./Field";
import Input from "./Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addItemToDataBase } from "../../services/updateDatabase";
const schema = yup
    .object({
        item: yup.string().required(),
        quantity: yup.number().integer().positive(),
        price: yup.string().required(),
        description: yup.string().required(),
    })
    .required();

const AdminForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const submitForm = async (data) => {
        await addItemToDataBase(data);
        reset();
    };
    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <Field>
                <Input
                    label="Item Name"
                    name="name"
                    type="text"
                    register={register}
                    errors={errors}
                />
            </Field>
            <Field>
                <Input
                    label="Item Quantity"
                    name="quantity"
                    type="number"
                    register={register}
                    errors={errors}
                />
            </Field>
            <Field>
                <Input
                    label="Price"
                    name="price"
                    type="text"
                    register={register}
                    errors={errors}
                />
            </Field>
            <Field>
                <Input
                    label="Description"
                    name="description"
                    type="text"
                    register={register}
                    errors={errors}
                />
            </Field>
            <Field>
                <Input
                    label="Images"
                    name="images"
                    type="file"
                    accept=" image/png, image/jpeg"
                    multiple={true}
                    register={register}
                    errors={errors}
                />
            </Field>
            <Field>
                <button type="submit">Submit</button>
            </Field>
        </form>
    );
};

export default AdminForm;
