import React from "react";
import { useStateValue } from "../context/StateProvider";

const DashboardUsers = () => {
  const [{ user }, dispatch]: any | {} = useStateValue();
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3"></div>
    </div>
  );
};

export default DashboardUsers;
