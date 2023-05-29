import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./sign/SignIn";
import MainPageForStudent from "./StudentPages/MainPageForStudent";
import PermissionFormForStudents from "./StudentPages/PermissionPage/PermissionFormForStudents";
import ApplicantPage from "./AplicantPage/ApplicantPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListPermissions from "./AdminPages/PermissionPage/ListPermissions";
import StudentProfilePage from "./StudentPages/ProfilePage/StudentProfilePage";
import ListApplicant from "./AdminPages/ApplicantPage/ListApplicant";
import * as React from "react";
import { UsernameProvider } from "./context/Context";
import ListStudents from "./AdminPages/ListStudent";
import ProfilePageForStudent from "./AdminPages/ProfilePageForStudent";
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
        <UsernameProvider>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route
              element={<MainPageForStudent />}
              path={"/MainPageForStudent/"}
            />
            <Route
              element={<PermissionFormForStudents />}
              path={"/PermissionFormForStudents/"}
            />
            <Route element={<ListStudents />} path={"/ListStudents"} />

            <Route element={<ListPermissions />} path={"/ListPermissions"} />
            <Route element={<ApplicantPage />} path={"/ApplicantPage"} />
            <Route
              element={<StudentProfilePage />}
              path={"/StudentProfilePage/"}
            />
            <Route
              element={<ProfilePageForStudent />}
              path={"/ProfilePageForStudent/"}
            />
            <Route element={<ListApplicant />} path={"/ListApplicant"} />
          </Routes>
        </UsernameProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
