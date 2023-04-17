import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StockProvider from "./contexts/StockProvider";
import CartProvider from "./contexts/CartProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <StockProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </StockProvider>
    </BrowserRouter>
);
