import React from "react";
import NavigationBar from "../../Components/NavBar/NavBar.jsx";
import './Home.css'; // importă fișierul CSS
import { useGlobalContext } from '../../GlobalContext';


function Home() {
  const { username} = useGlobalContext()
  return (
    <div>
      <NavigationBar /> 
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Bine ai venit {username}</h1>
            <p className="mb-5">
              Ai aici cea mai buna aplicatie de gestionare de bugs ever !!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
