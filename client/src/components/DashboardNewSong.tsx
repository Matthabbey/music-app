import React, { useEffect, useState } from "react";
import { storage } from "../config/firebase.config";
import { useStateValue } from "../context/StateProvider";
import FilterButtons from "./FilterButtons";
import { getAllAlbums, getAllArtists, getAllSongs, saveNewSong } from "../api/index";
import { actionType } from "../context/reducer";
import { BiCloudUpload } from "react-icons/bi";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { MdDelete } from "react-icons/md";
import { filterByLanguage, filters } from "../utils/styles";
import { motion } from "framer-motion";

const DashboardNewSong = () => {
  const [songName, setSongName] = useState("");
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [songImageCover, setSongImageCover] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const [audioUploadProgress, setAudioUploadProgress] = useState(0);
  const [audioImageCover, setAudioImageCover] = useState(null);
  const [audioUploading, setAudioUploading] = useState(false);

  const [artistUploadProgress, setArtistUploadProgress] = useState(0)
  const [artistImageCover, setArtistImageCover] = useState(null)
  const [artistUploading, setArtistUploading] = useState(false)
  const [artistName, setArtistName] = useState("")
  const [twitter, setTwitter] = useState("")
  const [instagram, setInstagram] = useState("")

  const [albumUploadingProgress, setAlbumUploadingProgress] = useState(0)
  const [albumImageCover, setAlbumImageCover] = useState(null)
  const [albumUploading, setAlbumUploading] = useState(false)
  const [albumName, setAlbumName] = useState("")

  const [{ allArtists, allAlbums, allSongs, artistFilter, albumFilter, filterTerm, languageFilter}, dispatch]: any =
    useStateValue();

  useEffect(() => {
    if (!allArtists) {
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

  const handleDeleteFileObject = (
    url: string | undefined,
    isImage: boolean
  ) => {
    if (isImage) {
      setImageUploading(true);
      setAudioUploading(true)
    }
    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      setSongImageCover(null);
      setImageUploading(false);
      setAudioImageCover(null);
      setAudioUploading(false);

    });
  };
  const handleSavedSong =()=>{
    if(!songImageCover || !audioImageCover){

    }else {
      setAudioUploading(true);
      setImageUploading(true);

        const data = {
            artist: allArtists.name,
            name: songName,
            imageURL: songImageCover,
            songURL: audioImageCover,
            album: albumFilter,
            language: languageFilter,
            category: filterTerm
        };
        console.log(data);
        console.log(data.album);
        console.log(data.artist);
        
        saveNewSong(data).then((response)=>{
            console.log(data);
            console.log(response);
            
            getAllSongs().then(songs=>{
                
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: songs.songs
                })
            })
            // const result = async()=>{
            //   const res = await getAllSongs()
            //   console.log(res);
            // } 
            
            
        })
        setSongName("");
        setAudioUploading(false);
        setImageUploading(false);
        setAudioImageCover(null);
        setSongImageCover(null);
        dispatch({type: actionType.SET_ALL_ARTISTFILTER, artistFilter: null});
        dispatch({type: actionType.SET_ALL_ALBUMFILTER, albumFilter: null});
        dispatch({type: actionType.SET_ALL_LANGUAGEFILTER, languageFilter: null});
        dispatch({type: actionType.SET_ALL_FILTERTERM, filterTerm: null});
    }

  }

  return (
    <div className="flex flex-col items-center justify-center p-2 border border-gray-300 rounded-md gap-4" >
      <input
        type="text"
        placeholder="type your new song"
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />
      <div className="flex w-full justify-between flex-wrap items-center">
        <FilterButtons filterData={allArtists} flag={"Artists"} />
        <FilterButtons filterData={allAlbums} flag={"Albums"} />
        <FilterButtons filterData={filterByLanguage} flag={"Languages"} />
        <FilterButtons filterData={filters} flag={"Categories"} />
      </div>
      <div className="bg-card backdrop-blow-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {imageUploading && <DocumentLoader progress={imageUploadProgress} />}
        {!imageUploading && (
          <>
            {!songImageCover ? (
              <FileDocumentUploader
                updateState={setSongImageCover}
                setProgress={setImageUploadProgress}
                isLoading={setImageUploading}
                isImage={true}
              />
            ) : (
              <div className="relative  bottom-3 w-full h-full rounded-md">
                <img
                  src={songImageCover}
                  className="w-full h-full object-cover"
                />
                <button
                  type="submit"
                  className="absolute buttom-2 right-0 rounded-full text-2xl  bg-red-500 cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => handleDeleteFileObject(songImageCover, true)}
                >
                  {" "}
                  <i className={"text-white cursor-pointer" }><MdDelete  /></i>
                </button>
              </div>
            )}
          </>
        )}
      </div>
                {/* Audio file uploading */}
      <div className="bg-card backdrop-blow-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {audioUploading && <DocumentLoader progress={audioUploadProgress} />}
        {!audioUploading && (
          <>
            {!audioImageCover ? (
              <FileDocumentUploader
                updateState={setAudioImageCover}
                setProgress={setAudioUploadProgress}
                isLoading={setAudioUploading}
                isImage={false}
              />
            ) : (
              <div className="relative top-3 w-full h-full flex items-center justify-center rounded-md">
                <audio
                  src={audioImageCover}
                  controls
                  className="w-[980px]"
                />
                <button
                  type="submit"
                  className="absolute buttom-2 right-0 rounded-full text-2xl  bg-red-500 cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => handleDeleteFileObject(audioImageCover, false)}
                >
                  {" "}
                  <i className={"text-white cursor-pointer"}><MdDelete  /></i>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Image Uploader for artist */}
      <div className="bg-card backdrop-blow-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {artistUploading && <DocumentLoader progress={artistUploadProgress} />}
        {!artistUploading && (
          <>
            {!artistImageCover ? (
              <FileDocumentUploader
                updateState={setArtistImageCover}
                setProgress={setArtistUploadProgress}
                isLoading={setArtistUploading}
                isImage={true}
              />
            ) : (
              <div className="relative top-3 w-full h-full flex items-center justify-center rounded-md">
                <audio
                  src={artistImageCover}
                  controls
                  className="w-[980px]"
                />
                <button
                  type="submit"
                  className="absolute buttom-2 right-0 rounded-full text-2xl  bg-red-500 cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => handleDeleteFileObject(artistImageCover, false)}
                >
                  {" "}
                  <i className={"text-white cursor-pointer"}><MdDelete  /></i>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex items-center justify-center w-60 p-5">
        {
            audioUploading || imageUploading ? (
                <DisableButton />

            ) : (
                <motion.button whileTap={{scale: 0.75}} className="px-8 py-2 w-full cursor-pointer text-white rounded-md bg-red-600 hover:shadow-lg" onClick={()=>handleSavedSong()}>
                    Save Song
                </motion.button>
            )
        }
      </div>
      
    </div>
  );
};
export const DisableButton = ()=>{
    return (
        <button disabled type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 inline-flex items-center">
        <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
        </svg>
        Loading...
    </button>
    )
}

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

export const FileDocumentUploader: React.FC<any> = ({
  updateState,
  setProgress,
  isLoading,
  isImage,
}) => {
  const handleUpLoadingDocument= (e: any) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];
    console.log(uploadedFile.name);

    const storageRef = ref(
      storage,
      `${isImage ? "images/ " : "Audios/"}${new Date()}}-${uploadedFile.name}`
    );

    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateState(downloadURL);
          isLoading(false);
          console.log("File available at", downloadURL);
        });
      }
    );
  };
  return (
    <label>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <i className="font-bold text-5xl">
            {" "}
            <BiCloudUpload />
          </i>
          <p>
            Click here to upload {isImage ? "song image cover" : "an audio"}
          </p>
        </div>
      </div>
      <input
        type="file"
        name="upload-file"
        accept={`${isImage ? "image/*" : "audio/*"}`}
        className="h-0"
        onChange={handleUpLoadingDocument}
      />
    </label>
  );
};

export default DashboardNewSong;
