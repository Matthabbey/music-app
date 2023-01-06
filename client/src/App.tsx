import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard, Home, Login } from "./components";
import { app } from "./config/firebase.config";
import { AnimatePresence } from "framer-motion";
import { validateUser } from './api/index';
import { useStateValue } from './context/StateProvider';
import { actionType } from "./context/reducer";

function App() {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [{user}, dispatch] = useStateValue()
  const [authState, setAuthState] = useState(false);
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      // console.log(userCred);
      if (userCred) {
        userCred.getIdToken().then((token) => {
          // console.log(token);
          validateUser(token).then((data)=>{
            // console.log(data)
            dispatch({
              type: actionType.SET_USER,
              user: data
            });
          })
        });
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        navigate("/login");
        dispatch({
          type: actionType.SET_USER,
          user: null
        });
      }
    });
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="h-auto min-w-(680px) bg-blue-400 flex justify-center items-center">
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/*" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />}/>
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default App;
