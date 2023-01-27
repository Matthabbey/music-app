import React from "react";
import { loginBg } from "../assets/videos";
import Header from "./Header";
import Logo from "../assets/img/images.png";

const Home = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <video
        src={loginBg}
        typeof="video/mp4"
        autoPlay
        muted
        loop
        className="w-full object-cover"
      />
    </div>
  );
};

export default Home;
