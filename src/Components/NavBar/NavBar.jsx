import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useGlobalContext } from "../../GlobalContext";

function NavigationBar() {
  const { role } = useGlobalContext();

  return (
    <nav className="navbar bg-base-100 shadow-lg py-4 px-8">
      {/* Left section: Application name */}
      <div className="navbar-start">
        <a className="text-3xl font-extrabold text-black" style={{ fontFamily: 'Poppins, sans-serif' }}>Bug App</a>
      </div>

      {/* Center section: Navigation links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal space-x-8">
          <li><Link to="/Home" className="nav-link text-lg font-medium" style={{ fontFamily: 'Roboto, sans-serif' }}>Home</Link></li>
          <li><Link to="/" className="nav-link text-lg font-medium" style={{ fontFamily: 'Roboto, sans-serif' }}>Autentificare</Link></li>
          {role === "tester" && (
            <>
              <li><Link to="/ProiecteleMeleTST" className="nav-link text-lg font-medium" style={{ fontFamily: 'Roboto, sans-serif' }}>Proiectele Mele TST</Link></li>
              <li><Link to="/ProiecteTST" className="nav-link text-lg font-medium" style={{ fontFamily: 'Roboto, sans-serif' }}>Proiecte TST</Link></li>
            </>
          )}
          {role === "projectMember" && (
            <>
              <li><Link to="/ProiecteMP" className="nav-link text-lg font-medium" style={{ fontFamily: 'Roboto, sans-serif' }}>Proiecte MP</Link></li>
              <li><Link to="/AdaugaProiect" className="nav-link text-lg font-medium" style={{ fontFamily: 'Roboto, sans-serif' }}>Adauga proiect</Link></li>
              <li><Link to="/ProiecteSiBugs" className="nav-link text-lg font-medium" style={{ fontFamily: 'Roboto, sans-serif' }}>Gestionare bug-uri proiecte</Link></li>
            </>
          )}
        </ul>
      </div>

      {/* Right section: Role display */}
      <div className="navbar-end">
        <span className="text-xl font-semibold text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>Role: <strong>{role}</strong></span>
      </div>
    </nav>
  );
}

export default NavigationBar;
