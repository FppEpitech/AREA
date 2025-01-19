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
        localStorage.setItem("token_date", Date.now().toString());
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
        localStorage.setItem("token_date", Date.now().toString());
        navigate('/explore');
    } catch (error : any) {
        if (error.status === 409)
            setError(error.response.data.msg);
        else
            setError('Error retry please.');
    }
}

export function isLogged() {

    const token = localStorage.getItem('access_token');
    const token_date = localStorage.getItem('token_date');

    if (token === null || token_date === null) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('token_date');
        return false;
    }

    const date = parseInt(token_date, 10)
    const now = Date.now()
    if ((now - date) > (24 * 60 * 60 * 1000)) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('token_date');
        return false;
    }

    return true;
}

export function logout(navigate: (path: string) => void) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_date');
    navigate('/welcome');
}

/*export function deleteAccount(navigate: (path: string) => void) {
    axios.delete(`${process.env.REACT_APP_API_URL}/account/delete`, {
        headers: {*/