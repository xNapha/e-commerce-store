import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

const imagesRootFolder = "attire-images";
const dataBaseCollectionName = "attire-stock";

export const addItemToDataBase = async (item) => {
    const { variants, ...restOfItem } = item;
    const { images, ...restOfVariant } = variants;
    for (let i = 0; i < variants.length; i++) {
        const getArrayOfImages = Array.from(variants[i].images);
        const allUploadedImages = uploadImagesToStoragePromises(
            item.name,
            variants[i].color,
            getArrayOfImages
        );
        const imageMetadataArr = await Promise.all(allUploadedImages);
        const allImagePathNames =
            getImageUrlFromStoragePromises(imageMetadataArr);
        const allImageUrl = await Promise.all(allImagePathNames);
        variants[i].images = allImageUrl;
    }
    const itemInformationInDataBase = await addItemInformationToDataBase(item);
    const itemID = itemInformationInDataBase._key.path.segments[1];
    await addIdtoItemInDataBase(itemID);
};

const uploadImagesToStoragePromises = (
    itemName,
    variantColor,
    getArrayOfImages
) => {
    return getArrayOfImages.reduce((acc, curr) => {
        return reduceArrayOfImages(acc, curr, itemName, variantColor);
    }, []);
};

const reduceArrayOfImages = (acc, curr, itemName, variantColor) => {
    const itemImageRef = ref(
        storage,
        `/${imagesRootFolder}/${itemName}/${variantColor}/${curr.name}`
    );
    const itemImagePromise = uploadBytes(itemImageRef, curr);
    acc.push(itemImagePromise);
    return acc;
};

const getImageUrlFromStoragePromises = (imageMetadataArr) => {
    return imageMetadataArr.reduce(reduceMetadata, []);
};

const reduceMetadata = (acc, curr) => {
    const currPath = curr.metadata.fullPath;
    acc.push(getDownloadURL(ref(storage, currPath)));
    return acc;
};

const addItemInformationToDataBase = async (item) => {
    const itemInformation = await addDoc(
        collection(db, dataBaseCollectionName),
        item
    );
    return itemInformation;
};

const addIdtoItemInDataBase = async (itemID) => {
    await updateDoc(doc(db, dataBaseCollectionName, `${itemID}`), {
        id: itemID,
    });
};

export const reduceStock = async (cart, currentStock) => {
    // map through currentStock and reduce each quantity by each item in cart
    const updatedStock = currentStock.map((item) => {
        const { variants, ...rest } = item;
        const foundIdInCart = cart.find((inCart) => item.id === inCart.id);
        if (!foundIdInCart) {
            return item;
        }
        const updatedItem = item.variants.map((variant) => {
            const { sizes, ...rest } = variant;
            const foundVariant = variant.color === foundIdInCart.color;
            if (!foundVariant) {
                return variant;
            }
            const updatedVariant = variant.sizes.map((size) => {
                const { quantity, ...rest } = size;
                const foundSize = size.size === foundIdInCart.size;
                if (!foundSize) {
                    return size;
                }
                return {
                    quantity: size.quantity - foundIdInCart.quantity,
                    ...rest,
                };
            });
            return { sizes: updatedVariant, ...rest };
        });
        return { variants: updatedItem, ...rest };
    });
    const updatedStockPromises = updatedStock.map((item) => {
        return updateDoc(doc(db, dataBaseCollectionName, item.id), { ...item });
    });
    await Promise.all(updatedStockPromises);
};
