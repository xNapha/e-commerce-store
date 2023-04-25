import Field from "../Field/Field";
import Input from "../Input/Input";

const SizeInfo = ({ number, register, index, required, styles }) => {
    return (
        <Field key={number} styles={styles}>
            <Input
                label="Item Size"
                name={`variants[${number}][sizes][${index}][size]`}
                type="string"
                register={register}
                required={required}
            />
            <Input
                label="Item Quantity"
                name={`variants[${number}][sizes][${index}][quantity]`}
                type="number"
                register={register}
                min={1}
                required={required}
            />
        </Field>
    );
};

export default SizeInfo;
