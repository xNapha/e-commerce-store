import { addItemToDataBase } from "../../services/updateDatabase";
import { useForm } from "react-hook-form";
import React, { useContext, useState } from "react";
import styles from "./AdminForm.module.scss";
import ColorVariant from "../ColourVariant/ColorVariant";
import Field from "../../components/Field/Field";
import Input from "../../components/Input/Input";
import FormButton from "../../components/FormButton/FormButton";
import { StockContext } from "../../contexts/StockProvider";

const AdminForm = () => {
    const { register, handleSubmit, reset } = useForm();

    const { adminFormSent, setAdminFormSent } = useContext(StockContext);
    const [additionalColorInput, setAdditionalColorInput] = useState(1);
    const [updatingDataBase, setUpdatingDataBase] = useState(false);
    const [password, setPassword] = useState("");
    const adminAccessPw = "yk39j4a#i&2nYce^NWXHuyZVoQ9E@Uf@RF3gVf3iKR%A&$qo&";

    const submitForm = async (data) => {
        setUpdatingDataBase(true);
        await addItemToDataBase(data);
        reset();
        setUpdatingDataBase(false);
        setAdminFormSent(adminFormSent + 1);
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
                    required={true}
                />
            </Field>
            {renderAdditionalInputs(additionalColorInput)}
            <Field styles={styles["Admin_Form-main"]}>
                <FormButton
                    type="button"
                    onClick={() => {
                        setAdditionalColorInput(additionalColorInput + 1);
                    }}
                    textContent="Additional Color Info"
                />
                <FormButton
                    type="button"
                    onClick={() => {
                        setAdditionalColorInput(additionalColorInput - 1);
                    }}
                    textContent="Remove Last Color Field"
                />
            </Field>

            <Field styles={styles["Admin_Form-main"]}>
                <Input
                    label="Price"
                    name="price"
                    type="text"
                    register={register}
                    required={true}
                />
            </Field>
            <Field styles={styles["Admin_Form-main"]}>
                <Input
                    label="Category"
                    name="category"
                    type="string"
                    register={register}
                    required={true}
                />
            </Field>
            <Field styles={styles["Admin_Form-main"]}>
                <Input
                    label="Description"
                    name="description"
                    type="string"
                    register={register}
                    required={true}
                />
            </Field>
            <Field>
                <FormButton type="submit" textContent="Submit" />
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
