import React from 'react'
import { useStateValue } from '../context/StateProvider';
import { RiPlayListFill, RiUserStarFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import AudioPlayer from 'react-h5-audio-player'
import '../'

const MusicPlayer = () => {
  const [{ allSongs, isSongPlaying, songIndex, allAlertMassages}, dispatch]: String | any= useStateValue();

  return (
    <div className='w-full items-center flex gap-3 overflow-hidden'>
        <div className='w-full items-center flex gap-2 p-5 relative'>
            <img src={allSongs[songIndex]?.imageURL} alt="" className='w-40 h-20 object-cover rounded-md'/>
            <div className='flex items-center flex-col'>
                <p className='text-xl text-headingColor font-semibold'>{`${allSongs[songIndex]?.name.length > 15 ? allSongs[songIndex]?.name.slice(0, 20) : allSongs[songIndex]?.name} `}
                <span className="text-sm">({allSongs[songIndex]?.album})</span>
                </p>
                <p className='text-textColor'>
                    {allSongs[songIndex]?.artist}
                    <span className='text-sm text-textColor font-semibold'>{allSongs[songIndex]?.category}</span>
                </p>
                <motion.i 
                whileTap={{opacity: 0.58}}
                
                >
                    <i className='text-textColor hover:text-headingColor'>
                        <RiPlayListFill />
                        </i>
                </motion.i>
            </div>

            <div className='flex-1'>
                <AudioPlayer
                src={allSongs[songIndex]?.songURL}
                onPlay={()=>console.log('is playing')}
                autoPlay={true}
                showSkipControls={true}
                />
            </div>
        </div>
    </div>
  )
}

export default MusicPlayer