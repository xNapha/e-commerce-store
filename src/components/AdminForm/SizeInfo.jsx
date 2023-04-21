import Field from "./Field";
import Input from "./Input";

const SizeInfo = ({ number, register, errors, index }) => {
    return (
        <Field key={number}>
            <Input
                label="Item Size"
                name={`variants[${number}][sizes][${index}][size]`}
                type="string"
                register={register}
                errors={errors}
            />
            <Input
                label="Item Quantity"
                name={`variants[${number}][sizes][${index}][quantity]`}
                type="number"
                register={register}
                errors={errors}
            />
        </Field>
    );
};

export default SizeInfo;
