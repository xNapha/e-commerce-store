import { useState } from "react";
import Field from "../../components/Field/Field";
import Input from "../../components/Input/Input";
import SizeInfo from "../../components/SizeInfo/SizeInfo";
import styles from "../AdminForm/AdminForm.module.scss";
import FormButton from "../../components/FormButton/FormButton";

const ColorVariant = ({ number, register, required }) => {
    const [additionalSizeInput, setAdditionalSizeInput] = useState(1);

    const renderAdditionalInputs = (additionalInput) => {
        const formToRender = [];
        for (let i = 0; i < additionalInput; i++) {
            formToRender.push(
                <SizeInfo
                    key={i}
                    number={number}
                    index={i}
                    register={register}
                    required={required}
                    styles={styles["Admin_Form-size_info"]}
                />
            );
        }
        return formToRender.map((jsx) => jsx);
    };

    return (
        <Field key={number} styles={styles["Admin_Form-color_variant"]}>
            <Input
                label={`Different Item Variant/Colour`}
                name={`variants[${number}][color]`}
                type="string"
                register={register}
                required={required}
            />
            {renderAdditionalInputs(additionalSizeInput)}
            <Field>
                <Input
                    label="Images"
                    name={`variants[${number}][images]`}
                    type="file"
                    accept=" image/png, image/jpeg"
                    multiple={true}
                    register={register}
                    required={required}
                />
            </Field>
            <Field>
                <FormButton
                    type="button"
                    onClick={() => {
                        setAdditionalSizeInput(additionalSizeInput + 1);
                    }}
                    textContent="Add Additional Size Field"
                />
                <FormButton
                    type="button"
                    onClick={() => {
                        setAdditionalSizeInput(additionalSizeInput - 1);
                    }}
                    textContent="Remove Last Size Field"
                />
            </Field>
        </Field>
    );
};

export default ColorVariant;
