import React, { useEffect, useState } from "react";
import { storage } from "../config/firebase.config";
import { useStateValue } from "../context/StateProvider";
import FilterButtons from "./FilterButtons";
import { getAllAlbums, getAllArtists } from '../api/index';
import { actionType } from "../context/reducer";

const DashboardNewSong = () => {
    const [songName, setSongName] = useState('')
    const [{artists, allAlbums, language, filter}, dispatch ]: any = useStateValue()

    useEffect(()=>{
        // if(!artists){
            getAllArtists().then(data=>{
                console.log(data);
                
                dispatch({
                    type: actionType.SET_ALL_ARTISTS,
                    artists: data.artist
                })
            }
            )
        // }
        if(!allAlbums){
            getAllAlbums().then(data=>{
                dispatch({
                    type: actionType.SET_ALL_ALBUMS,
                    allAlbums: data.album
                })
            })
        }
    }, []
    )
  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-md">
        <input type="text" placeholder="type your new song" className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
        value={songName}
        onChange={(e)=> setSongName(e.target.value)}
        />
        <div className="flex w-full justify-between flex-wrap items-center gap-4">
            <FilterButtons filterData={artists} flag={"Artists"} />
            <FilterButtons filterData={allAlbums} flag={"Albums"} />
            <FilterButtons filterData={language} flag={"Languages"} />
            <FilterButtons filterData={filter} flag={"Categories"} />
        </div>
    </div>
  );
};

export default DashboardNewSong;
