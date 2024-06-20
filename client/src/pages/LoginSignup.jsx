import { useState } from "react";
import "./CSS/LoginSignup.css";
import { useNavigate } from "react-router-dom";
useState;
useNavigate;

import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setToken } = useContext(ShopContext);

  const handleLoginSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const parsed = await response.json();
        setToken(parsed.token);
        localStorage.setItem("auth-token", parsed.token);
        // navigate("/");
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUpSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, email, password }),
      });
      if (response.ok) {
        const newUser = await response.json();

        setState("Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <input
              type="text"
              placeholder="Your Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          )}
          <input
            type="email"
            placeholder="Your E-Mail Adress"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Your Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? handleLoginSubmit() : handleSignUpSubmit();
          }}
        >
          Continue
        </button>

        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                setState("Login");
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Don't have an account yet?{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Sign up here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
