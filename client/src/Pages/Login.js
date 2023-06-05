import React, { useState } from "react";

export default function Login({ setIsSigningUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Logged in:", data);
        if (data.token) {
          setMessageError(false);
          setMessage("Logged in ");
          return;
        } else {
          console.error("Check your email and password");
          setMessageError(true);
          setMessage("Check your email and password");
        }
      })
      .catch((error) => {
        console.error("Error Logging in :", error);
        setMessageError(true);
        setMessage("Check your email and password");
      });
  };

  return (
    <div className="shadow-xl p-8 bg-white rounded-lg min-w-[300px]">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <h1 className="text-2xl mb-4">Login</h1>

        <label className="flex flex-col">
          Email :
          <input
            type="email"
            placeholder="luke@starwars.com"
            className="border border-gray-400 px-1"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
          />
        </label>
        <label className="flex flex-col">
          Password :
          <input
            type="password"
            placeholder="password"
            className="border border-gray-400 px-1"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            required
          />
        </label>

        <button className="bg-cyan-500 text-white hover:bg-cyan-700 my-4">
          Login
        </button>
        {message && (
          <p className={messageError ? "text-red-500" : "text-green-500 "}>
            {message}
          </p>
        )}
      </form>
      <br />
      <p>Don't have an account yet ?</p>

      <button
        className="text-cyan-500"
        onClick={() => {
          setIsSigningUp(true);
        }}
      >
        Register Here
      </button>
    </div>
  );
}
