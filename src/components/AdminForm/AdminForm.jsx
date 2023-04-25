import { addItemToDataBase } from "../../services/updateDatabase";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import styles from "./AdminForm.module.scss";
import ColorVariant from "./ColorVariant";
import Field from "./Field";
import Input from "./Input";

const AdminForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [additionalColorInput, setAdditionalColorInput] = useState(1);
    const [updatingDataBase, setUpdatingDataBase] = useState(false);
    const [password, setPassword] = useState("");
    const adminAccessPw = "yk39j4a#i&2nYce^NWXHuyZVoQ9E@Uf@RF3gVf3iKR%A&$qo&";

    const submitForm = async (data) => {
        setUpdatingDataBase(true);
        await addItemToDataBase(data);
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
                    required={true}
                />
            );
        }
        return formToRender.map((jsx) => jsx);
    };

    const adminAccessForm = (
        <form onSubmit={handleSubmit(submitForm)} className={styles.Admin_Form}>
            <Field styles={styles["Admin_Form-main"]}>
                <Input
                    label="Item Name"
                    name="name"
                    type="text"
                    register={register}
                    errors={errors}
                    required={true}
                />
            </Field>
            {renderAdditionalInputs(additionalColorInput)}
            <Field styles={styles["Admin_Form-main"]}>
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

            <Field styles={styles["Admin_Form-main"]}>
                <Input
                    label="Price"
                    name="price"
                    type="text"
                    register={register}
                    errors={errors}
                    required={true}
                />
            </Field>
            <Field styles={styles["Admin_Form-main"]}>
                <Input
                    label="Category"
                    name="category"
                    type="string"
                    register={register}
                    errors={errors}
                    required={true}
                />
            </Field>
            <Field styles={styles["Admin_Form-main"]}>
                <Input
                    label="Description"
                    name="description"
                    type="string"
                    register={register}
                    errors={errors}
                    required={true}
                />
            </Field>
            <Field>
                <button type="submit">Submit</button>
            </Field>
        </form>
    );

    return (
        <>
            {password !== adminAccessPw ? (
                <div className={styles.Password}>
                    <label>Password</label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
            ) : (
                " "
            )}
            {password === adminAccessPw && updatingDataBase && (
                <p>Updating database dont go anywhere, it will take a minute</p>
            )}
            {password === adminAccessPw && !updatingDataBase && adminAccessForm}
        </>
    );
};

export default AdminForm;
