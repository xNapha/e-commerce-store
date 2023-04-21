import { collection, getDocs } from "firebase/firestore";
import { storage, db } from "../firebase";

export const fetchStockFromAPI = async () => {
    const querySnapshot = await getDocs(collection(db, "attire-stock"));
    const allStock = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        allStock.push(doc.data());
    });
    return allStock;
};
