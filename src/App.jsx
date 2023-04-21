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
const App = () => {
    const { currentStock } = useContext(StockContext);
    const renderRouteForEachStock = currentStock.map((item) => {
        const { id, title, price, description, image, rating } = item;
        const DedicatedItemCard = (
            <DedicatedItem
                id={id}
                title={title}
                price={price}
                description={description}
                image={image}
                item={item}
                rate={rating.rate}
            />
        );
        return (
            <Route
                key={`${itemUrlPath(title) + uuidv4()}`}
                path={itemUrlPath(title)}
                element={DedicatedItemCard}
            />
        );
    });
    return (
        <>
            <NavigationBar />
            <Routes>
                <Route path="attire">
                    <Route path="" element={<Homepage />} />
                    <Route path="catalogue">
                        <Route
                            path=""
                            element={<ItemList stock={currentStock} />}
                        />
                        {renderRouteForEachStock}
                    </Route>
                    <Route path="checkout" element={<CheckOut />} />
                    <Route path="adminAccess" element={<AdminForm />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
