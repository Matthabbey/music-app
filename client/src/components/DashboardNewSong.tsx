import React, { useEffect, useState } from "react";
import { storage } from "../config/firebase.config";
import { useStateValue } from "../context/StateProvider";
import FilterButtons from "./FilterButtons";
import { getAllAlbums, getAllArtists } from '../api/index';
import { actionType } from "../context/reducer"; 

const DashboardNewSong = () => {
    const [songName, setSongName] = useState('')
    const [songImageCover, setSongImageCover] = useState(null)
    const [imageUploading, setImageUploading] = useState(false)
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
        <div className="bg-card backdrop-blow-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
            {imageUploading && < DocumentLoader progress={10.555}/>}
        </div>
    </div>
  );
};

export const DocumentLoader = ({progress}: any) =>{
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="text-xl font-semibold text-textColor">{Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}</p>
            <div className="w-20 h-20 min-w-[40px] bg-gray-500 animate-ping rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-red-600 blur-xl"></div>
            </div>

        </div>
    )
}

export default DashboardNewSong;
