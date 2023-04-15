import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./sign/SignIn";
import MainPageForStudent from "./StudentPages/MainPageForStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route element={<MainPageForStudent />} path={"/MainPageForStudent"} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
