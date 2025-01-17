import axios from "axios";

export const getServices = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/services`);
        return response.data;
    } catch (error) {
        return [];
    }
};
