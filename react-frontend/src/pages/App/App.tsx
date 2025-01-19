import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Login/login";
import Signup from '../Signup/signup';
import Explore from '../Explore/explore';
import CreatePage from '../Create/create';
import Services from '../Services/services';
import MyPlums from '../MyPlums/myPlums';
import ClientApk from "../Client_apk/Client_apk";
import GuardedRoute from '../../guards/authGuard';
import Contact from '../Contact/contact';
import Welcome from '../Welcome/welcome';
import { OAuthRedirectSuccess, OAuthRedirectFailed } from '../OAuthRedirect/oauthRedirect';
import MyServices from '../MyServices/myServices';

function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<GuardedRoute element={<Explore />} />}/>
            <Route path="welcome" element={<Welcome />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="contact" element={<Contact />} />
            <Route path="explore" element={<GuardedRoute element={<Explore />} />}/>
            <Route path="myPlums" element={<GuardedRoute element={<MyPlums />} />}/>
            <Route path="myServices" element={<GuardedRoute element={<MyServices />} />}/>
            <Route path="create" element={<GuardedRoute element={<CreatePage />} />}/>
            <Route path="services/:id" element={<GuardedRoute element={<Services />} />}/>
            <Route path="client.apk" element={<ClientApk />} />
            <Route path="/authentification_success" element={<OAuthRedirectSuccess />} />
            <Route path="/authentification_failed" element={<OAuthRedirectFailed />} />
            {/* <Route path="*" element={<NoPage />} /> TODO: Error 404 */}
        </Routes>
        </BrowserRouter>
    );
}

export default App;
