import React, { useEffect, useState } from 'react'
import { useStateValue } from '../context/StateProvider';
import { RiPlayListFill, RiUserStarFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { getAllSongs } from '../api';
import { actionType } from '../context/reducer';
import { duration } from 'moment';
import { IoClose, IoMusicalNote } from 'react-icons/io5';
import { trusted } from 'mongoose';

const MusicPlayer = () => {
  const [{ allSongs, isSongPlaying, songIndex, allAlertMassages}, dispatch]: String | any= useStateValue();
  const [isPlayList, setIsPlayList] = useState(false)

  const handleNextTrack = ()=>{
    if(songIndex > allSongs.length - 1){
        dispatch({
          type: actionType.SET_SONG_INDEX,
          songIndex: 0
        })
    }else {
        dispatch({
            type: actionType.SET_SONG_INDEX,
            songIndex: songIndex + 1
          })
    }
  }

  const handlePreviousTrack = ()=>{
    if(songIndex === 0){
        dispatch({
          type: actionType.SET_SONG_INDEX,
          songIndex: songIndex
        })
    }else {
        dispatch({
            type: actionType.SET_SONG_INDEX,
            songIndex: songIndex - 1
          })
    }
  }
  const handleClosePlayer = ()=>{
    dispatch({
        type: actionType.SET_ISSONG_PLAYING,
        isSongPlaying: false
      })
  }

  return (
    <div className='w-full items-center flex gap-3'>
        <div className='w-full items-center flex gap-1 p-4 relative'>
            <img src={allSongs[songIndex]?.imageURL} alt="" className='w-20 h-20 object-cover rounded-md'/>
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
                // onClick={()=> setIsPlayList(!isPlayList)}        
                >
                    <i className='text-textColor hover:text-headingColor text-2xl cursor-pointer' onClick={()=>console.log(setIsPlayList(true))}>
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
                onClickNext={handleNextTrack}
                onClickPrevious={handlePreviousTrack}
                />
            </div>

            {
                isSongPlaying && (
                    <PlayListCard />
                )
            }
            <IoClose onClick={handleClosePlayer}/>
        </div>
    </div>
  )
}
export const PlayListCard = () =>{
    const [{ allSongs, isSongPlaying, songIndex, allAlertMassages}, dispatch]: String | any= useStateValue();

    useEffect(()=> {
        if(!allSongs){
            getAllSongs().then((data)=>{
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.data
                })
            })
        }
    }, [])

    const setCurrentSongIndex = (index: any)=>{
        if(!isSongPlaying){
            dispatch({
              type: actionType.SET_ISSONG_PLAYING,
              isSongPlaying: true
            })
          }
          if(songIndex !== index){
              dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: index
              })
          }
    }

    

    return (
        <div className='absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md bg-primary shadow-md'>
            {
                allSongs.length > 0 ? (
                    allSongs.map((music: string, index: number)=>(
                        <motion.div initial={{opacity: 0, translateX: -50}} animate={{opacity: 1, translateX: 0}} transition={{duration: 0.3, delay: index * 0.1}} className='group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer bg-transparent'
                        onClick={()=>setCurrentSongIndex(index)}
                        key={index}
                        >
                           <i className='text-textColor group-hover:text-headingColor text-2xl cursor-pointer'><IoMusicalNote /></i>
                           <div className='flex items-start flex-col'>
                            <p className='text-lg text-headingColor font-semibold'>
                                {`${
                                    music?.name.length > 20 ? music?.name.slice(0, 20): music?.name 
                                }`}
                                <span className='text-base'>({music?.name})</span>
                            </p>
                            <p className='text-textColor'>{music?.artist}
                            <span className='text-sm text-textColor font-semibold'>({music.category})</span>
                            </p>
                            </div> 
                        </motion.div>
                    ) )
                ):<></>
            }

        </div>
    )

}
export default MusicPlayer