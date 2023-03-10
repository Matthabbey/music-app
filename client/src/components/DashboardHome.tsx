import React, { useEffect } from "react";
import { getAllSongs, getAllUSers } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from '../context/StateProvider';
import { bgColors } from "../utils/styles";
import DashboardUsers from "./DashboardUsers";
import { getAllArtists, getAllAlbums } from '../api/index';
import { FaUsers } from 'react-icons/fa'
import { GiLoveSong, GiMusicalNotes} from 'react-icons/gi'
import { RiUserStarFill } from 'react-icons/ri'


export const DashboardCard = ({ icon, name, count }: any) => {
  const bg_color = bgColors[Math.floor(Math.random() * bgColors.length)]
  return (
    <div style={{background: `${bg_color}`}} className={`p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center`}>
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
          type: actionType.SET_ALL_ARTISTS,
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
     <DashboardCard icon={ <i className="text-3xl text-textColor" ><FaUsers /></i> } name={"Users"} count={allUsers?.length > 0 ? allUsers.length : 0} />
     <DashboardCard icon={<i className="text-3xl text-textColor" >< GiLoveSong/></i>} name={"Songs"} count={allSongs?.length  > 0 ? allSongs?.length : 0} />
     <DashboardCard icon={<i className="text-3xl text-textColor" ><GiMusicalNotes /></i>} name={"Artists"} count={allArtists?.length  > 0 ? allArtists?.length : 0} />
     <DashboardCard icon={<i className="text-3xl text-textColor" ><RiUserStarFill /></i>} name={"Albums"} count={allAlbums?.length  > 0 ? allAlbums?.length : 0} />
    </div>
  );
};

export default DashboardHome;
