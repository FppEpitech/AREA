import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Login/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="login" element={<Login />} />
          {/* <Route path="*" element={<NoPage />} /> TODO: Error 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
