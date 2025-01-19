import axios from "axios";

export const getServices = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/services`);
        return response.data;
    } catch (error) {
        return [];
    }
};

export const getServicesWithTokens = async () => {
    try {
        const token = localStorage.getItem("access_token");
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/token`, { headers: headers });
        return response.data;
    } catch (error) {
        return [];
    }
};

export const deleteToken = async (id: string) => {
    try {
        const token = localStorage.getItem("access_token");
        const headers = { Authorization: `Bearer ${token}` };
        await axios.delete(`${process.env.REACT_APP_API_URL}/token/${id}`, { headers: headers });
    } catch (error) {
        console.error(error);
    }
};
