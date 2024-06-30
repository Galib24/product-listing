import axios from "axios";

const API = 'https://fakestoreapi.com/products';

export const fetchProducts = async () => {
    try {
        const response = await axios.get(API);
        
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('error fetching products:', error);
    }
}