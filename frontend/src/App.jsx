import { Route, Routes } from "react-router-dom";
import About from "./Pages/About";
import Contact from "./pages/Contact";
import Home from "./Pages/Home";
import Plan from "./pages/Plans";
import Trail from "./pages/Trainl";
import Login from "./components/Login";
import Dash from "./components/Dasbourd";
import { UserProvider } from "./contexts/UserContext";
import SignUp from "./components/SignIn";
import SideNav from "./components/SideNav";

function App() {
  return (
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
      </Routes>
    </UserProvider>
  );
}

export default App;
``
