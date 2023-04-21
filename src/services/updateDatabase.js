import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

const imagesRootFolder = "attire-images";
const dataBaseCollectionName = "attire-stock";

export const addItemToDataBase = async (item) => {
    const { images, ...rest } = item;
    const getArrayOfImages = Array.from(images);
    const allUploadedImages = uploadImagesToStoragePromises(
        item.name,
        getArrayOfImages
    );
    const imageMetadataArr = await Promise.all(allUploadedImages);
    const allImagePathNames = getImageUrlFromStoragePromises(imageMetadataArr);
    const allImageUrl = await Promise.all(allImagePathNames);
    const itemInformationInDataBase = await addItemInformationToDataBase(
        rest,
        allImageUrl
    );
    const itemID = itemInformationInDataBase._key.path.segments[1];
    await addIdtoItemInDataBase(itemID);
};

const uploadImagesToStoragePromises = (itemName, getArrayOfImages) => {
    return getArrayOfImages.reduce((acc, curr) => {
        return reduceArrayOfImages(acc, curr, itemName);
    }, []);
};

const reduceArrayOfImages = (acc, curr, itemName) => {
    const itemImageRef = ref(
        storage,
        `/${imagesRootFolder}/${itemName}/${curr.name}`
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

const addItemInformationToDataBase = async (rest, downloadLinks) => {
    const itemInformation = await addDoc(
        collection(db, dataBaseCollectionName),
        {
            ...rest,
            imageLinks: downloadLinks,
        }
    );
    return itemInformation;
};

const addIdtoItemInDataBase = async (itemID) => {
    await updateDoc(doc(db, dataBaseCollectionName, `${itemID}`), {
        id: itemID,
    });
};
