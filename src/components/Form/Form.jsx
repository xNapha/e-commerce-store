import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Field from "./Field";
import Input from "./Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../../firebase";

const Form = () => {
    const [imageLinks, setImageLinks] = useState([]);
    const schema = yup
        .object({
            item: yup.string().required(),
            quantity: yup.number().integer().positive(),
            price: yup.string().required(),
            description: yup.string().required(),
        })
        .required();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const addToDataBase = (stockObj) => {
        const { images, ...rest } = stockObj;
        const stockImageArr = Array.from(images);
        const imagePromises = [];
        stockImageArr.forEach((image) => {
            const stockImageRef = ref(
                storage,
                `/images/${stockObj.name}/${image.name}`
            );
            const stockImagepromise = uploadBytes(stockImageRef, image).then(
                () => {
                    getDownloadURL(stockImageRef).then((value) => {
                        setImageLinks((prev) => [...prev, value]);
                    });
                }
            );
            imagePromises.push(stockImagepromise);
        });
        Promise.all(imagePromises).then(() => {
            addDoc(collection(db, "stock"), {
                ...rest,
                imageLinks: [...imageLinks],
            }).then(() => {
                setImageLinks([]);
                reset();
            });
        });
    };
    return (
        <form onSubmit={handleSubmit(addToDataBase)}>
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

export default Form;
