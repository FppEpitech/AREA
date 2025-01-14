import axios from 'axios';

export const Oauth2Log = async (route: string) => {
    try {
        const token = localStorage.getItem("access_token");
        const headers = {
            Authorization: `Bearer ${token}`
        };
        await axios.get(`${process.env.REACT_APP_API_URL}/${route}`, { headers: headers });
    } catch (error) {
        console.error(error);
    }
};
