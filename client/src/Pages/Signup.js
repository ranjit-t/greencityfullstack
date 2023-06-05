import React, { useState } from "react";

export default function Signup({ setIsSigningUp }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const userData = {
        fullName,
        email,
        password,
      };

      fetch("http://localhost:5000/api/createNewUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.error);
          if (data.error === "duplicate") {
            setMessageError(true);
            setMessage("User already exists");
            return;
          }
          setMessageError(false);
          setMessage("signed up");
          // setTimeout(() => {
          //   setIsSigningUp(false);
          // }, 2000);
        })
        .catch((error) => {
          console.error("Error submitting form data:", error);
          setMessageError(true);
          setMessage("oups there is an error");
        });

      // console.log(userData);
    } else {
      setMessageError(true);
      setMessage("passwords do not match");
    }
  };

  return (
    <div className="shadow-xl p-10 bg-white rounded-lg min-w-[350px]">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <h1 className="text-2xl mb-4">Signup</h1>
        <label className="flex flex-col">
          Full Name :
          <input
            type="text"
            placeholder="Luke Skywalker"
            className="border border-gray-400 px-1"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            value={fullName}
            required
          />
        </label>
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
        <label className="flex flex-col">
          Confirm Password :
          <input
            type="password"
            placeholder="confirm password"
            className="border border-gray-400 px-1"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            value={confirmPassword}
            required
          />
        </label>

        <button className="bg-cyan-500 text-white hover:bg-cyan-700 my-4">
          Signup
        </button>
        {message && (
          <p className={messageError ? "text-red-500" : "text-green-500"}>
            {message}
          </p>
        )}
      </form>
      <br />
      <p>Already have an account ?</p>

      <button
        className="text-cyan-500"
        onClick={() => {
          setIsSigningUp(false);
        }}
      >
        Register Here
      </button>
    </div>
  );
}
