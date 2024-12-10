import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Login/login";
import Signup from '../Signup/signup';
import Explore from '../Explore/explore';
import CreatePage from '../Create/create';
import MyPlums from '../MyPlums/myPlums';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="explore" element={<Explore />} />
          <Route path="myPlums" element={<MyPlums />} />
          <Route path="create" element={<CreatePage />} />
          {/* <Route path="*" element={<NoPage />} /> TODO: Error 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
