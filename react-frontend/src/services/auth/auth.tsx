import axios from 'axios';

interface loginInterface {
    email: string;
    password: string;
}

async function AuthLogin(login : loginInterface, navigate: (path: string) => void) {
    try {
        const body = {mail : login.email, password : login.password}
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/account/login`, body)
        localStorage.setItem('access_token', response.data.token)
        navigate('/explore');
    } catch (error) {
        console.log(error);
    }
}

export default AuthLogin;
