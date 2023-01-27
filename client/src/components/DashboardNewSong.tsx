import React, { useEffect, useState } from "react";
import { storage } from "../config/firebase.config";
import { useStateValue } from "../context/StateProvider";
import FilterButtons from "./FilterButtons";
import { getAllAlbums, getAllArtists } from "../api/index";
import { actionType } from "../context/reducer";
import {BiCloudUpload} from 'react-icons/bi'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { MdDelete } from "react-icons/md";
import { filterByLanguage, filters } from "../utils/styles";

const DashboardNewSong = () => {
  const [songName, setSongName] = useState("");
  const [imageUploadProgress, setImageUploadProgress] = useState(0)
  const [songImageCover, setSongImageCover] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [{ allArtists, allAlbums, language, filter }, dispatch]: any =
    useStateValue();

  useEffect(() => {
    if(!allArtists){
    getAllArtists().then((data) => {
    //   console.log(data);

      dispatch({
        type: actionType.SET_ALL_ARTISTS,
        allArtists: data.artist,
      });
    });
    }
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album,
        });
      });
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-md">
      <input
        type="text"
        placeholder="type your new song"
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />
      <div className="flex w-full justify-between flex-wrap items-center gap-4">
        <FilterButtons filterData={allArtists} flag={"Artists"} />
        <FilterButtons filterData={allAlbums} flag={"Albums"} />
        <FilterButtons filterData={filterByLanguage} flag={"Languages"} />
        <FilterButtons filterData={filters} flag={"Categories"} />
      </div>
      <div className="bg-card backdrop-blow-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {imageUploading && <DocumentLoader progress={imageUploadProgress} />}
        {!imageUploading && (
          <>{!songImageCover ? <FileDocumentUploader updateState = {setSongImageCover} setProgress = {setImageUploadProgress} isLoading = {setImageUploading} isImage={true}/> : 
          <div className="relative w-full h-full overflow-hidden rounded-md">
            <img src={songImageCover} alt="" className="w-full h-full object-cover"/>
            <button type="submit" className="absolute buttom-3 right-3 rounded-full text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out bg-red-500" >  <MdDelete className={"text-w"}/></button>
            </div>}</>
        )}
      </div>
    </div>
  );
};

export const DocumentLoader = ({ progress }: any) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-xl font-semibold text-textColor">
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div className="w-20 h-20 min-w-[40px] bg-gray-500 animate-ping rounded-full flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full bg-red-600 blur-xl"></div>
      </div>
    </div>
  );
};

export const FileDocumentUploader: React.FC<any>= ({ updateState, setProgress, isLoading, isImage}) =>{

    const handleUpLoadingDocument: React.FC<any> = (e)=>{
        isLoading(true)
        const uploadedFile = e.target.files[0]
        console.log(uploadedFile.name)

        const storageRef = ref(storage, `${isImage ? "Images/ " : "Audios/"}${new Date}}-${uploadedFile.name}`)

        const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

        uploadTask.on("state_changed", (snapshot)=>{
            setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        },(error)=> {
            console.log(error)
        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                updateState(downloadURL)
                isLoading(false)
                console.log('File available at', downloadURL); 
            })
        }
        )


        
    }
    return (
        <label>
            <div className="flex flex-col items-center justify-center h-full">
                <div className="flex flex-col justify-center items-center cursor-pointer">
                        <i className="font-bold text-5xl"> <BiCloudUpload /></i>
                        <p>Click here to upload {isImage ? "song image cover" : "an audio/mp3"}</p>
                </div>
            </div>
            <input type="file" name="upload-file" accept={`${isImage ? 'image/*' : 'audio/*'}`}  className="h-0" onChange={handleUpLoadingDocument}/>
        </label>
    )
}

export default DashboardNewSong;
