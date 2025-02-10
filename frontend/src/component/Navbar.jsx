import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex justify-around text-white font-semibold">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        <li><Link to="/myappointments" className="hover:underline">My Appointments</Link></li>
        <li><Link to="/login" className="hover:underline">Login</Link></li>
        <li><Link to="/register" className="hover:underline">Register</Link></li>
        <li><Link to="/adminpanel" className="hover:underline">Admin Panel</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
