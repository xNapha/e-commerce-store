export const fetchStockFromAPI = async () => {
    const response = await fetch("https://fakestoreapi.com/products/");
    const data = response.json();

    return data;
};
