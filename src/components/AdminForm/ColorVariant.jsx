import { useState } from "react";
import Field from "./Field";
import Input from "./Input";
import SizeInfo from "./SizeInfo";
import styles from "./AdminForm.module.scss";

const ColorVariant = ({ number, register, errors, required }) => {
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
                    errors={errors}
                    required={required}
                />
            );
        }
        return formToRender.map((jsx) => jsx);
    };

    return (
        <Field key={number} styles={styles["Admin_Form-color_variant"]}>
            <Input
                label={`Item Variant`}
                name={`variants[${number}][color]`}
                type="string"
                register={register}
                errors={errors}
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
                    errors={errors}
                    required={required}
                />
            </Field>
            <Field>
                <button
                    type="button"
                    onClick={() => {
                        setAdditionalSizeInput(additionalSizeInput + 1);
                    }}
                >
                    Add Additional Size Field
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setAdditionalSizeInput(additionalSizeInput - 1);
                    }}
                >
                    Remove Field
                </button>
            </Field>
        </Field>
    );
};

export default ColorVariant;
