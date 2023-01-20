import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import { useStateValue } from "../context/StateProvider";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import SongCard from "./SongCard";

const DashboardSongs = () => {
  const [isFocus, setIsFocus] = useState<boolean>();
  const [songFilter, setSongFilter] = useState("");
  const [{ allSongs }, dispatch]: any = useStateValue();

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex items-center justify-center gap-20">
        <NavLink
          to={"/dashboard/newSongs"}
          className="flex items-center justify-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer"
        >
          {" "}
          <IoAdd />
        </NavLink>
        <input
          type="text"
          value={songFilter}
          placeholder="Search your songs"
          className={`w-52 py-2 px-4 border ${
            isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
          } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base`}
          onChange={(e) => setSongFilter(e.target.value)}
          onBlur={() => {
            setIsFocus(false);
          }}
          onFocus={() => setIsFocus(true)}
        />
        <i className="text-3xl text-textColor cursor-pointer">
          <AiOutlineClear />
        </i>
      </div>
      {/* Main container */}
      <div className="relative border w-full p-4 my-4 border-gray-300">
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Count:{" "}
            </span>
            {allSongs?.length}
          </p>
        </div>
        < SongContainer  data={allSongs}/>
      </div>
    </div>
  );
};
 
export const SongContainer = ({data}: any)=>{
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data && data.map((song: string, i: string)=>(
        < SongCard key={song._id} data={song} index={i}/>
      ))}
    </div>
  )
}

export default DashboardSongs;
