import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from './pages/Login';
import Register from './pages/Register';
import Myappointments from "./pages/Myappointments.jsx";
import Navbar from "./component/Navbar.jsx";
import Footer from "./component/footer.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/Home" element={<Home/>} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myappointments" element={<Myappointments/>} />
        <Route path="/adminpanel" element={<AdminDashboard/>} />
      </Routes>
<Footer/>
    </Router>
  );
}

export default App;

