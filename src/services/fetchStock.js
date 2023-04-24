import { collection, getDocs } from "firebase/firestore";
import { storage, db } from "../firebase";

export const fetchDataFromAPI = async (collectionName) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const newArr = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        newArr.push(doc.data());
    });
    return newArr;
};
