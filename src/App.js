import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Screens/Home/Home";
import LoginSignup from "./Screens/LoginSignup/LoginSignup";
import ProiecteTST from "./Screens/ProiecteTST/ProiecteTST";
import ProiecteMP from "./Screens/ProiecteMP/ProiecteMP";
import ProiecteleMeleTST from "./Screens/ProiecteleMeleTST/ProiecteleMeleTST";
import AdaugaProiect from "./Screens/AdaugaProiectMP/AdaugaProiect";
import ProiecteSiBugs from "./Screens/ProiecteSiBugs/ProiecteSiBugs";
import { GlobalProvider } from "./GlobalContext";

function App() {
  return (
    <Router>
      <GlobalProvider>
        <div className="mainContent">
          <Routes>
            {/* Definirea rutelor */}
            <Route path="/Home" element={<Home />} />
            <Route path="/ProiecteTST" element={<ProiecteTST />} />
            <Route path="/ProiecteMP" element={<ProiecteMP />} />
            <Route path="/AdaugaProiect" element={<AdaugaProiect/>} />
            <Route path="/ProiecteleMeleTST" element={<ProiecteleMeleTST />} />
            <Route path="/ProiecteSiBugs" element={<ProiecteSiBugs />} />
            <Route path="/" element={<LoginSignup />} />
          </Routes>
        </div>
      </GlobalProvider>
    </Router>
  );
}

export default App;
