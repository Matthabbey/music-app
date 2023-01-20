import React, { useState } from "react";
import { changingUserRole, getAllUSers } from "../api";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import moment from "moment";
import {MdDelete} from 'react-icons/md'
import { actionType } from "../context/reducer";

// interface UpdateUserRole{
//   userId: string | any
//   role: string | any
// }

export const DashboardUserCard = ({ data, index }: any) => {
  const [{ user }, dispatch]: any | {} = useStateValue();
  const [updateRole, setUpdateRole] = useState<boolean>(false);
  const createdAt = moment(new Date(data.createdAt)).format("MMMM Do YYYY");

  const handleUpdateUserRole = (userId: string, role: string)=>{
    setUpdateRole(false)
    changingUserRole(userId, role).then((res)=>{
        console.log(res);
        if(res){
          getAllUSers().then((data)=>{
            dispatch({
              type: actionType.SET_ALL_USERS,
              allUsers: data.data
            })
          })
        }
      })
  }

  return (
    <motion.div
      key={index}
      className="relative w-full rounded-md flex items-center justify-between-py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md"
    >
      <motion.div whileTap={{scale: 0.75}} className="absolute w-8 h-8 left-3 items-center justify-center rounded-md bg-gray-200 flex "> < MdDelete className="text-xl text-red-400 hover:text-red-600"/></motion.div>
      <div className="w-275 flex item-center justify-center min-w-[160px]">
        <img
          src={data.imageUrl}
          referrerPolicy="no-referrer"
          alt=""
          className="w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md"
        />
      </div>

      <p className="text-base text-textColor text-center w-275 min-w-[160px]">
        {data.name}
      </p>
      <p className="text-base text-textColor text-center w-275 min-w-[160px]">
        {data.email}
      </p>
      <p className="text-base text-textColor text-center w-275 min-w-[160px]">
        {data.email_verified ? "True" : "False"}
      </p>
      <p className="text-base text-textColor text-center w-275 min-w-[160px]">
        {createdAt}
      </p>

      <div className="w-275 min-w-[160px] text-center flex items-center justify-center gap-6 relative">
        <p className="text-base text-textColor text-center w-275 min-w-[160px]">
          {data.role}
        </p>

        {data._id !== user?.user._id && (
          <motion.p
            whileTap={{ scale: 0.75 }}
            className="text-[10px] font-semibold text-textColor px-1 bg-purple-200 rounded-sm hover:shadow-md"
            onClick={() => setUpdateRole(true)}
          >
            {data.role === "admin" ? "Member" : "Admin"}
          </motion.p>
        )}
        {updateRole && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute z-10 top-6 right-6 p-4 flex items-start flex-col gap-4 bg-white shadow-xl rounded-md"
          >
            <p className="text-textColor text-[12px] font-semibold">
              Are you sure, you want to mark user as{" "}
              <span> {data.role === "admin" ? "Member" : "Admin "}</span> ?
            </p>
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none text-sm px-4 py1 rounded-md text-white bg-blue-500 hover:shadow-md "
                onClick={()=>handleUpdateUserRole(data._id, data.role === 'admin' ? "member" : "admin")}
              >
                Yes
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none text-sm px-4 py1 rounded-md text-white bg-red-500 hover:shadow-md"
                onClick={() => setUpdateRole(false)}
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
const DashboardUsers = () => {
  const [{ allUsers }, dispatch]: any | {} = useStateValue();
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
        <div className="absolute top-4 left-4">
          <p className="text-sm font-semibold">
            Count:{` `}
            <span className="text-xl fontbold text-textColor">
              {allUsers?.length}
            </span>
          </p>
        </div>

        <div className="w-full min-w-[750px] flex item-center justify-between">
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Image
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Name
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Email
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Verified
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Created
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Role
          </p>
        </div>
        {/* table body content */}
        {allUsers &&
          allUsers.map((data: string, i: string) => (
            <DashboardUserCard key={i} data={data} index={i} />
          ))}
      </div>
    </div>
  );
};

export default DashboardUsers;
