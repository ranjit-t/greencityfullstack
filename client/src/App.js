import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";

import jwtDecode from "jwt-decode";

function App() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const existingToken = JSON.parse(localStorage.getItem("consciousearth"));

    if (existingToken) {
      const decodedToken = jwtDecode(existingToken);
      console.log(decodedToken);
      // Check if the token is expired
      const isTokenExpired = Date.now() >= decodedToken.exp * 1000;

      if (!isTokenExpired) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
        // Token is expired, perform any additional cleanup or redirection
        localStorage.removeItem("consciousearth");
      }
    } else {
      setIsLogged(false);
    }
    setIsLoading(false);
  }, [setIsLogged]);
  return (
    <div className="App h-[100vh] bg-neutral-100">
      <h1 className="text-3xl font-bold pt-4">Conscious Guide</h1>

      {isLoading ? (
        <div>...loading</div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[80vh] ">
          {isLogged ? (
            <Home setIsLogged={setIsLogged}></Home>
          ) : isSigningUp ? (
            <Signup setIsSigningUp={setIsSigningUp}></Signup>
          ) : (
            <Login
              setIsSigningUp={setIsSigningUp}
              setIsLogged={setIsLogged}
            ></Login>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
