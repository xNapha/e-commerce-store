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

export const reduceStock = async (cart) => {
    // cart id, cart quantity, cart color

    console.log(cart);
};
