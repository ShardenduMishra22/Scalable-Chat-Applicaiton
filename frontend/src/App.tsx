/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/MyComponent/Navbar";
import Home from "./components/MyComponent/Home";
import LandingPage from "./components/MyComponent/LandingPage";
import Footer from "./components/MyComponent/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import UnProtectedRoute from "./components/UnProtectedRoute";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="bottom-left" />
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={ <UnProtectedRoute><LandingPage /></UnProtectedRoute> } />
          <Route path="/home" element={ <ProtectedRoute> <Home /> </ProtectedRoute> } />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
