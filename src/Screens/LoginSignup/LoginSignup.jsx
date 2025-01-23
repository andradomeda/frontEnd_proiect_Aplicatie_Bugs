import React, { useState } from "react";
import "./LoginSignup.css"; // Import CSS
import user_icon from "../../Components/Assets/user.png";
import Email_icon from "../../Components/Assets/email.png";
import Parola_icon from "../../Components/Assets/padlock.png";
import { useGlobalContext } from "../../GlobalContext";

function LoginSignupScreen() {
  const [Nume, setNume] = useState("");
  const [Parola, setParola] = useState("");
  const [Email, setEmail] = useState("");
  const [role, setRole] = useState("tester");
  const [isSignUp, setIsSignUp] = useState(false);

  const { handleLogin } = useGlobalContext(); // Acces direct din context

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Nume || !Parola || (isSignUp && !Email)) {
      alert("Please fill out all required fields!");
      return;
    }

    const endpoint =
      role === "tester"
        ? isSignUp
          ? "/api/tester"
          : "/api/tester/login"
        : isSignUp
          ? "/api/membru"
          : "/api/membru/login";
    try {
      const payload = isSignUp
        ? { Nume, Email, Parola }
        : { Nume, Parola };

      const response = await fetch(`http://localhost:9000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });


      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
     
      let id = null;
      if (role === "tester" && data.data && data.data.TesterId) {
        id = data.data.TesterId; // ID-ul testerului
      } else if (role === "projectMember" && data.data && data.data.MembruId) {
        id = data.data.MembruId; // ID-ul membrului proiectului
      }
      
      if (!id) {
        throw new Error("User ID not found in response!");
      }

      // Apelează handleLogin cu ID-ul
      handleLogin(Nume, Parola, role, id, isSignUp);
    } catch (error) {
      console.error("Error occurred:", error);
      alert(error.message);
    }
  };


  return (
    <div className="container">
      <div className="header">
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit} className="inputs">
        <div className="input">
          <img src={user_icon} className="user-icon" alt="User Icon" />
          <input
            type="text"
            placeholder="Name"
            value={Nume}
            onChange={(e) => setNume(e.target.value)}
          />
        </div>

        {isSignUp && (
          <div className="input">
            <img src={Email_icon} className="Email-icon" alt="Email Icon" />
            <input
              type="email"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}

        <div className="input">
          <img src={Parola_icon} className="parola_icon" alt="Parola Icon" />
          <input
            type="password"
            placeholder="Parola"
            value={Parola}
            onChange={(e) => setParola(e.target.value)}
          />
        </div>

        <div className="role-selection-container">
          <span className="role-text">Select Role:</span>
          <div>
            <label className="role-option">
              <input
                type="radio"
                name="role"
                value="tester"
                checked={role === "tester"}
                onChange={(e) => setRole(e.target.value)}
              />
              Tester
            </label>
            <label className="role-option">
              <input
                type="radio"
                name="role"
                value="projectMember"
                checked={role === "projectMember"}
                onChange={(e) => setRole(e.target.value)}
              />
              Project Member
            </label>
          </div>
        </div>
        <div className="submit-container">
          <button type="submit" className="submit">{isSignUp ? "Sign Up" : "Login"}</button>
        </div>
      </form>
      <p className="forgot-Parola">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <span className="toggleLink" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Login" : "Sign Up"}
        </span>
      </p>
    </div>
  );
}

export default LoginSignupScreen;
