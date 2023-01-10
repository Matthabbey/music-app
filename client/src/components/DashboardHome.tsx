import React, { useEffect } from "react";
import { getAllSongs, getAllUSers } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from '../context/StateProvider';
import { bgColors } from "../utils/styles";
import DashboardUsers from "./DashboardUsers";
import { getAllArtists, getAllAlbums } from '../api/index';

export const DashboardCard = ({ icon, name, count }: any) => {
  const bg_color = bgColors[Number(Math.random() * bgColors.length)]
  return (
    <div style={{background: `${bg_color}`}} className="p-4 w-40 gap-3 h-auto rounded-lg shadow-md bg-blue-400">
      {icon}
      <p className="text-xl text-textColor font-semibold"> { name }</p>
      <p className="text-xl text-textColor"> { count }</p>
    </div>
  );
};

const DashboardHome = () => {
  const [{ allUsers, allSongs, allAlbums, allArtists}, dispatch]: any = useStateValue()

  useEffect(()=>{
    if(!allUsers){
      getAllUSers().then((data) =>{
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data
        })
      })
    }
    if(!allSongs){
      getAllSongs().then((data)=>{
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data
        })
      })
    }
    if(!allArtists){
      getAllArtists().then((data)=>{
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allArtists: data.data
        })
      })
    }
    if(!allAlbums){
      getAllAlbums().then((data)=>{
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.data
        })
      })
    }
  }, [])
  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
     <DashboardUsers />
    </div>
  );
};

export default DashboardHome;
