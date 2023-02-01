import { deleteObject, ref } from "firebase/storage";
import { motion } from "framer-motion";
import { duration } from "moment";
import React, { useState }from "react";
import { IoTrash } from "react-icons/io5";
import { deleteAlbumById, deleteSong, getAllAlbums, getAllSongs } from "../api";
import { storage } from "../config/firebase.config";
import { actionType } from "../context/reducer";
import { useStateValue } from '../context/StateProvider';

const SongCard = ({ data, index }: any, type: string) => {
const [isDelete, setIsDelete] = useState(false)
const [{ allSongs }, dispatch]:any = useStateValue()

const handleDeleteAlbum = (data: any) => {
if(type === "songs"){
  const deleteRef = ref(storage, data.imageURL)
  deleteObject(deleteRef).then(()=>{})
  deleteSong(data._id).then((res) => {
      if (res?.data) {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allAlertMassages: "success",
          });
          setInterval(()=>{
            dispatch({
              type: actionType.SET_ALL_USERS,
              allAlertMassages: "",
            });
          }, 3000)
          getAllSongs().then((data)=>{
            dispatch({
              type: actionType.SET_ALL_SONGS,
              allSongs: data.songs
            })
          })
        } else {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allAlertMassages: "danger",
          });
          setInterval(()=>{
            dispatch({
              type: actionType.SET_ALL_USERS,
              allAlertMassages: "",
            });
          }, 3000)
        }
      },
    )};

    if(type === "album"){
      const deleteRef = ref(storage, data.imageURL)
      deleteObject(deleteRef).then(()=>{})
      deleteAlbumById(data._id).then((res) => {
          if (res?.data) {
              dispatch({
                type: actionType.SET_ALL_USERS,
                allAlertMassages: "success",
              });
              setInterval(()=>{
                dispatch({
                  type: actionType.SET_ALL_USERS,
                  allAlertMassages: "",
                });
              }, 3000)
              getAllAlbums().then((data)=>{
                dispatch({
                  type: actionType.SET_ALL_ALBUMS,
                  allAlbums: data.album
                })
              })
            } else {
              dispatch({
                type: actionType.SET_ALL_ALERTMESSAGES,
                allAlertMassages: "danger",
              });
              setInterval(()=>{
                dispatch({
                  type: actionType.SET_ALL_ALERTMESSAGES,
                  allAlertMassages: "",
                });
              }, 3000)
            }
          },
        )};
  };
  return (
    <motion.div className="relative w-50 min-w-210 px-2 py-3 cursor-pointer hover:bg-card items-center flex flex-col shadow-md hover:bg-gray-100 rounded-lg">
        <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
            <motion.img whileHover={{scale: 1.09}} src={data.imageURL} className="w-full h-full rounded-lg object-cover "/>
        </div>
        <p className="text-base text-center text-headingColor font-semibold py-1">{data.name.length > 25 ? `${data.name.slice(0, 10)}...`: data.name}
        {data.artist && (

            <span className="block text-sm my-2 text-gray-400">{data.artist.length > 15 ? `${data.artist.slice(0, 10)}...` : data.artist}</span>
        )}
        </p>
        <div className="w-full bottom-2 right-0 absolute flex items-center justify-between">
          <motion.i whileTap={{scale: 0.75}}
          className="text-base text-red-400 drop-shadow-md hover:text-red-600"
          onClick={()=>setIsDelete(true)}
          >
            <IoTrash/>
          </motion.i>
        </div>
          {isDelete && (

            <motion.div className="absolute inset-0 backdrop-blur-md bg-cardOverlay flex items-center justify-center flex-col px-4 py-4" initial={{ opacity: 0}}
            animate={{opacity: 1}}>
            <p className="text-center uppercase text-sm text-headingColor">are you sure, you want to delete it?</p>
            <div className="gap-4 flex items-center">
              <motion.button className="uppercase text-red-500 text-sm px-4 py-3 font-bold cursor-pointer hover:text-red-700" whileTap={{scale: 0.7}} onClick={()=>handleDeleteAlbum(data)}>Yes</motion.button>
              <motion.button className="uppercase text-green-600 text-sm px-4 py-3 font-bold hover:text-green-800 rounded-md" whileTap={{scale: 0.7}} onClick={()=>setIsDelete(false)}>No</motion.button>
            </div>
        </motion.div>
          )}
    </motion.div>
  );
};

export default SongCard;

