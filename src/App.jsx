import React, { useContext } from "react";
import AdminForm from "./components/AdminForm/AdminForm";
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
import Favourites from "./containers/Favourites/Favourites";
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
                path={`/e-commerce-store/attire/catalogue/${itemUrlPath(name)}`}
                element={DedicatedItemCard}
            />
        );
    });
    return (
        <>
            <div className={styles.App}>
                <NavigationBar />
                <Routes>
                    <Route path="/e-commerce-store/">
                        <Route path="" element={<Homepage />} />
                        <Route path="catalogue">
                            <Route
                                path=""
                                element={
                                    <ItemList
                                        stock={currentStock}
                                        inCataloguePage={true}
                                    />
                                }
                            />
                            {renderRouteForEachStock}
                        </Route>
                        <Route path="favourites" element={<Favourites />} />
                        <Route path="checkout" element={<CheckOut />} />
                        <Route path="adminAccess" element={<AdminForm />} />
                    </Route>
                    <Route path="/e-commerce-store/*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    );
};

export default App;
