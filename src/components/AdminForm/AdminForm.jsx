import React, { useState, useReducer } from "react";
import { useForm } from "react-hook-form";
import Field from "./Field";
import Input from "./Input";
import { addItemToDataBase } from "../../services/updateDatabase";
import { render } from "react-dom";
import ColorVariant from "./ColorVariant";

const AdminForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [additionalColorInput, setAdditionalColorInput] = useState(1);
    const [updatingDataBase, setUpdatingDataBase] = useState(false);

    const submitForm = async (data) => {
        setUpdatingDataBase(true);
        await addItemToDataBase(data);
        // console.log(data);
        reset();
        setUpdatingDataBase(false);
    };
    const renderAdditionalInputs = (additionalInput) => {
        const formToRender = [];
        for (let i = 0; i < additionalInput; i++) {
            formToRender.push(
                <ColorVariant
                    key={i}
                    number={i}
                    register={register}
                    additionalColorInput={additionalColorInput}
                    setAdditionalColorInput={setAdditionalColorInput}
                    errors={errors}
                />
            );
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
            {renderAdditionalInputs(additionalColorInput)}
            <Field>
                <button
                    type="button"
                    onClick={() => {
                        setAdditionalColorInput(additionalColorInput + 1);
                    }}
                >
                    Additional Color Info
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setAdditionalColorInput(additionalColorInput - 1);
                    }}
                >
                    Remove Color Field
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
            <Field>
                <Input
                    label={`Category `}
                    name={`category`}
                    type="string"
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
