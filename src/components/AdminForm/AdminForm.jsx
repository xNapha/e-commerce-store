import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Field from "./Field";
import Input from "./Input";
import { addItemToDataBase } from "../../services/updateDatabase";
import { render } from "react-dom";

const AdminForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [additionalSizeInput, setAdditionalSizeInput] = useState(1);
    const [additionalCategoryInput, setAdditionalCategoryInput] = useState(1);
    const [updatingDataBase, setUpdatingDataBase] = useState(false);

    const submitForm = async (data) => {
        setUpdatingDataBase(true);
        await addItemToDataBase(data);
        reset();
        setUpdatingDataBase(false);
    };

    const formSizeInfo = (number) => {
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
                <button
                    type="button"
                    onClick={() => {
                        setAdditionalSizeInput(additionalSizeInput - 1);
                    }}
                >
                    Remove Field
                </button>
            </Field>
        );
    };

    const categoryInfo = (number) => {
        return (
            <Field key={number}>
                <Input
                    label={`Category ${number + 1}`}
                    name={`category[${number}]`}
                    type="string"
                    register={register}
                    errors={errors}
                />
                <button
                    type="button"
                    onClick={() => {
                        setAdditionalCategoryInput(additionalCategoryInput - 1);
                    }}
                >
                    Remove Field
                </button>
            </Field>
        );
    };

    const renderAdditionalInputs = (additionalSizeInput, formInfo) => {
        const formToRender = [];

        for (let i = 0; i < additionalSizeInput; i++) {
            formToRender.push(formInfo(i));
        }
        return formToRender.map((jsx) => jsx);
    };

    const adminAccessForm = (
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
            {renderAdditionalInputs(additionalSizeInput, formSizeInfo)}
            <Field>
                <button
                    type="button"
                    onClick={() => {
                        setAdditionalSizeInput(additionalSizeInput + 1);
                    }}
                >
                    Add Additional Size Field
                </button>
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
            {renderAdditionalInputs(additionalCategoryInput, categoryInfo)}
            <Field>
                <button
                    type="button"
                    onClick={() => {
                        setAdditionalCategoryInput(additionalCategoryInput + 1);
                    }}
                >
                    Add Additional Category Field
                </button>
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

    return (
        <>
            {updatingDataBase && (
                <p>Updating database dont go anywhere, it will take a minute</p>
            )}
            {!updatingDataBase && adminAccessForm}
        </>
    );
};

export default AdminForm;
