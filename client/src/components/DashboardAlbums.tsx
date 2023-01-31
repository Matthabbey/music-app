import React, { useEffect } from 'react'
import { getAllAlbums } from '../api';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import SongCard from './SongCard';

const DashboardAlbums = () => {
  const [{ allAlbums }, dispatch]: any = useStateValue();

  useEffect(() => {
    if (!allAlbums) {
      getAllAlbums().then((data) => {
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
        <ArtistContainer data={allAlbums}/>
      </div>
  );
};

export const ArtistContainer = ({ data }: any) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data &&
        data.map((song: any, i: string) => (
          <SongCard key={song._id} data={song} index={i} />
        ))}
    </div>
  );
}

export default DashboardAlbums