import Field from "./Field";
import Input from "./Input";
import styles from "./AdminForm.module.scss";

const SizeInfo = ({ number, register, errors, index, required }) => {
    return (
        <Field key={number} styles={styles["Admin_Form-size_info"]}>
            <Input
                label="Item Size"
                name={`variants[${number}][sizes][${index}][size]`}
                type="string"
                register={register}
                errors={errors}
                required={required}
            />
            <Input
                label="Item Quantity"
                name={`variants[${number}][sizes][${index}][quantity]`}
                type="number"
                register={register}
                errors={errors}
                min={1}
                required={required}
            />
        </Field>
    );
};

export default SizeInfo;
