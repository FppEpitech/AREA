import axios from 'axios';

interface loginInterface {
    email: string;
    password: string;
}

export async function AuthLogin(login : loginInterface, navigate: (path: string) => void, setError: (error: string) => void) {
    try {
        const body = {mail : login.email, password : login.password};
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/account/login`, body);
        localStorage.setItem('access_token', response.data.token);
        navigate('/explore');
    } catch (error) {
        setError('Wrong login');
    }
}

export async function AuthSignUp(login : loginInterface, navigate: (path: string) => void, setError: (error: string) => void) {
    try {
        const body = {mail : login.email, password : login.password};
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/account/register`, body);
        localStorage.setItem('access_token', response.data.token);
        navigate('/explore');
    } catch (error : any) {
        if (error.status === 409)
            setError(error.response.data.msg);
        else
            setError('Error retry please.');
    }
}

export function isLogged() {
    return localStorage.getItem('access_token') !== null;
}
