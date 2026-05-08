import axios from "axios";

const API_URL = "http://localhost:3000";

function extractError(error) {
    if (error.response) {
        return {
            success: false,
            status: error.response.status,
            data: error.response.data
        };
    }
    return {
        success: false,
        message: error.message
    };
}

export async function ListProducts() {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        return extractError(error);
    }
}

export async function getProduct(id) {
    try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        return extractError(error);
    }
}

export async function getOrder(id) {
    try {
        const response = await axios.get(`${API_URL}/orders/${id}`);
        return response.data;
    } catch (error) {
        return extractError(error);
    }
}

export async function createOrder(orderData) {
    try {
        const response = await axios.post(`${API_URL}/orders/createOrder`, orderData);
        return response.data;
    } catch (error) {
        return extractError(error);
    }
}