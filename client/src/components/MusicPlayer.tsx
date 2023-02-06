import React from 'react'
import { useStateValue } from '../context/StateProvider';

const MusicPlayer = () => {
  const [{ allSongs, isSongPlaying, songIndex, allAlertMassages}, dispatch]: String | any= useStateValue();

  return (
    <div className='w-full items-center flex gap-3 overflow-hidden'>
        <div className='w-full items-center flex gap-2 p-5 relative'>
            <img src={allSongs[songIndex]?.imageURL} alt="" className='w-40 h-20 object-cover rounded-md'/>
            <div className='flex items-center flex-col'>
                <p className='text-xl text-headingColor font-semibold'>{`${allSongs[songIndex]?.name.length > 15}`}</p>
            </div>
        </div>
    </div>
  )
}

export default MusicPlayer