import React from "react";

export default function Home({ setIsLogged }) {
  return (
    <div>
      <p>Hello</p>
      <button
        onClick={() => {
          localStorage.removeItem("consciousearth");
          setIsLogged(false);
        }}
      >
        Logout
      </button>
    </div>
  );
}
