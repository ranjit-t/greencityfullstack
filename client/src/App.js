import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";

function App() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(false);
  }, []);
  return (
    <div className="App h-[100vh] bg-neutral-100">
      <h1 className="text-3xl font-bold pt-4">Conscious Guide</h1>

      <div className="flex flex-col justify-center items-center h-[80vh] ">
        {isLogged ? (
          <Home></Home>
        ) : isSigningUp ? (
          <Signup setIsSigningUp={setIsSigningUp}></Signup>
        ) : (
          <Login setIsSigningUp={setIsSigningUp}></Login>
        )}
      </div>
    </div>
  );
}

export default App;
