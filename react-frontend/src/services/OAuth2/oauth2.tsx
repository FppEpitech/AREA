import axios from 'axios';

export const Oauth2Log = async (route: string) => {
    try {
        const token = localStorage.getItem("access_token");
        const headers = {
            Authorization: `Bearer ${token}`
        };

        const response = await axios.get(`${process.env.REACT_APP_API_URL}${route}`, { headers });
        const { authUrl } = response.data;

        window.location.href = authUrl;
    } catch (error) {
        console.error(error);
    }
};
