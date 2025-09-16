import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Plan from "./pages/Plans";
import Trail from "./pages/Trainl";
import Login from "./components/Login";
import Dash from "./components/Dasbourd";
import { UserProvider } from "./contexts/UserContext";
import SignUp from "./components/SignIn";
import SideNav from "./components/SideNav";
import SellerDash from "./Seller/SellerDash";
import { ProgramsProvider } from './contexts/ProgramsContext';
import SellerUsersDisplay from "./Seller/SellerUsersDisplay";
import AdminDashboard from "./Seller/AdminDashboard";
import Yoga from "./pages/Yoga";
import AddYoga from "./components/AddYoga";

function App() {
  return (
     <ProgramsProvider>
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/trainers" element={<Trail />} />
        <Route path="/plans" element={<Plan />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/signIn" element={<SignUp />} /> 
        <Route path="/dashboard" element={<Dash />} />
        <Route path="/Nav" element={<SideNav />} />
        <Route path="/seller" element={<SellerDash />} />
        <Route path="/sellerUserDisplay" element={<SellerUsersDisplay />} />
        {/* <Route path="/Adimin" element={<AdminDashboard />} /> */}
        <Route path="/yoga" element={<Yoga />} />
        <Route path="/addyoga" element={<AddYoga />} />
      </Routes>
    </UserProvider>
       

    </ProgramsProvider>
  );
}

export default App;

