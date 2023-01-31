import React from "react";
import { useStateValue } from "../context/StateProvider";
import { useEffect } from "react";
import { getAllArtists } from "../api";
import { actionType } from "../context/reducer";
import SongCard from "./SongCard";

const DashboardArtists = () => {
  const [{ allArtists }, dispatch]: any = useStateValue();

  useEffect(() => {
    if (!allArtists) {
      getAllArtists().then((data) => {
        console.log(data);
        
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.name,
        });
      });
    }
  }, []);
  return (

      <div className="w-full p-4 flex items-center justify-center flex-col">
        <div className="relative border w-full p-4 my-4 py-12 border-gray-300"></div>
        <ArtistContainer data={allArtists}/>
      </div>
  );
};

export const ArtistContainer = ({ data }: any) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data &&
        data.map((song: any, i: string) => (
          <SongCard key={song._id} data={song} index={i} type="artist" />
        ))}
    </div>
  );
};

export default DashboardArtists;
