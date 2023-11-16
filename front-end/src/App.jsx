import { Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Gallery from "./pages/gallery/Gallery";
import NotFound from "./pages/notFound/NotFound";
import Plans from "./pages/plans/Plans";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Authentication/login/login";
import SignUp from "./pages/Authentication/signup/signup";
import LoginSignup from "./pages/LoginSignup/LoginSignup";
import ForgotPassword from "./pages/Authentication/forgotPassword/forgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import ResetPassword from "./pages/Authentication/resetPassword/ResetPassword";
import Goals from "./pages/Goals/Goal";
import Sidebar from "./pages/Sidebar/SideBar";
import GoalsPage from "./pages/Goals/GoalsPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  let { pathname } = useLocation();
  const lowerpathname = pathname.toLocaleLowerCase();
  const isLoginPage =
    lowerpathname === "/login" ||
    lowerpathname === "/signup" ||
    lowerpathname === "/forgotpassword" ||
    lowerpathname === "/dashboard" ||
    lowerpathname.toLocaleLowerCase().startsWith("/resetpassword") ||
    lowerpathname.startsWith("/goals") ||
    lowerpathname.startsWith("/side");

  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="plans" element={<Plans />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="resetpassword/:token" element={<ResetPassword />} />

        <Route path="sidebar" element={<Sidebar />} />
        <Route
          path="goals"
          element={
            <ProtectedRoute>
              <GoalsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isLoginPage && <Footer />}
    </>
  );
};

export default App;
