import { motion } from "framer-motion";
import React from "react";
import { IoTrash } from "react-icons/io5";

const SongCard = ({ data, index }: any) => {
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
          >
            <IoTrash/>
          </motion.i>
        </div>
    </motion.div>
  );
};

export default SongCard;
