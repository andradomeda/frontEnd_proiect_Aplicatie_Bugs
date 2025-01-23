import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState(null); // Adaugă userId pentru a salva ID-ul utilizatorului
  const navigate = useNavigate(); // Adaugă useNavigate

  const handleLogin = (name, password, role, id, isSignUp) => {
    // ID-ul primit de la backend
    if (isSignUp) {
      alert("Account created successfully!");
    } else {
      alert("Logged in successfully!");
    }

    setIsAuthenticated(true);
    setUsername(name);
    setRole(role);

    // Setează ID-ul în funcție de rol
    if (role === "tester") {
      setUserId(id); // TesterId
    } else if (role === "projectMember") {
      setUserId(id); // MembruId
    }

    // Navighează către pagina Home
    navigate("/Home");
  };

  return (
    <GlobalContext.Provider
      value={{ isAuthenticated, username, role, userId, handleLogin }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
