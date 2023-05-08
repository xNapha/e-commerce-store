import React, { useContext } from "react";
import AdminForm from "./containers/AdminForm/AdminForm";
import Homepage from "./containers/Homepage/Homepage";
import ItemList from "./containers/ItemList/ItemList";
import NotFound from "./containers/NotFound/NotFound";
import CheckOut from "./containers/CheckOut/CheckOut";
import DedicatedItem from "./containers/DedicatedItem/DedicatedItem";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Routes, Route } from "react-router-dom";
import { StockContext } from "./contexts/StockProvider";
import { v4 as uuidv4 } from "uuid";
import { itemUrlPath } from "./services/utility";
import Favourites from "./components/Favourites/Favourites";
import styles from "./App.module.scss";
const App = () => {
    const { currentStock } = useContext(StockContext);
    const renderRouteForEachStock = currentStock.map((item) => {
        const { id, name, price, description, image, variants } = item;
        const DedicatedItemCard = (
            <DedicatedItem
                id={id}
                name={name}
                price={price}
                description={description}
                image={image}
                item={item}
                variants={variants}
            />
        );
        return (
            <Route
                key={`${itemUrlPath(name) + uuidv4()}`}
                path={`/e-commerce-store/catalogue/${itemUrlPath(name)}`}
                element={DedicatedItemCard}
            />
        );
    });
    return (
        <>
            <div className={styles.App}>
                <NavigationBar />
                <Routes>
                    <Route path="/e-commerce-store/" element={<Homepage />} />
                    <Route
                        path="/e-commerce-store/catalogue"
                        element={
                            <ItemList
                                stock={currentStock}
                                inCataloguePage={true}
                            />
                        }
                    />
                    {renderRouteForEachStock};
                    <Route
                        path="/e-commerce-store/favourites"
                        element={<Favourites />}
                    />
                    <Route
                        path="/e-commerce-store/checkout"
                        element={<CheckOut />}
                    />
                    <Route
                        path="/e-commerce-store/adminAccess"
                        element={<AdminForm />}
                    />
                    <Route path="/e-commerce-store/*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    );
};

export default App;
