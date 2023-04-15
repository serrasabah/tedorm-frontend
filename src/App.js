import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./sign/SignIn";
import MainPageForStudent from "./StudentPages/MainPageForStudent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route
            element={<MainPageForStudent />}
            path={"/MainPageForStudent"}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
