import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard, Home, Login, MusicPlayer } from "./components";
import { app } from "./config/firebase.config";
import { AnimatePresence, motion } from "framer-motion";
import { validateUser } from './api/index';
import { useStateValue } from './context/StateProvider';
import { actionType } from "./context/reducer";

function App() {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [{user, isSongPlaying}, dispatch]: any = useStateValue()
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

        {isSongPlaying && (
          <motion.div
          initial={{opacity: 0, y: 50}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0}}
          className={`fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center `}
          >
            <MusicPlayer />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}

export default App;
