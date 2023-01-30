import axios from "axios";

const baseURL = "http://localhost:4000/"

export const validateUser = async (token: string) =>{
    try {
        const result = await axios.get(`${baseURL}api/user/`, {
            headers : {
                Authorization: "Bearer " + token
            },
        });
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const getAllUSers = async () =>{
    try {
        const result = await axios.get(`${baseURL}api/user/getUsers`)
        // console.log(result)
        return result.data
    } catch (error) {
        console.log(error)
    }
}

export const getAllArtists = async ()=>{
    try {
        const result = await axios.get(`${baseURL}api/artist/getAll`)
        return result.data
    } catch (error) {
        return null
    }
}

export const getAllSongs = async() =>{
    try {
        const result = await axios.get(`${baseURL}api/song/getall`)
        return result.data
    } catch (error) {
        return null
    }
}

export const getAllAlbums = async () =>{
    try {
        const result = await axios.get(`${baseURL}api/album/getAll`)
        return result.data
    } catch (error) {
        return null
    }
}


export const removeUser = async(userId: string)=> {
    try {
      const res = axios.delete(`${baseURL}api/user/deleteUser/${userId}`)
      return res;
    } catch (error) {
      console.log(error)
    }
  }


  export const changingUserRole = async (userId: string , role: string) => {
    try {
      const res = await axios.put(`${baseURL}api/user/updateUser/${userId}`, { data : { role : role }});
      return res.data;
    } catch (error) {
        console.log(error);
        
    //   return null;
    }
  };

  export const saveNewSong = async ({...data})=>{
        try {
            const res = await axios.post(`${baseURL}api/song/create`, {...data})
            console.log(res) 
            // console.log(res.data.savedSong) 
            return res.data.savedSong

        } catch (error) {
            console.log(error);
            
        }
  }

  export const saveArtist = async({...data})=>{
    try {
        const res = await axios.post(`${baseURL}api/artist/create`, {...data})
        console.log(res)
        return res.data.savedArtist
    } catch (error) {
        console.log(error);
        
    }
  }

  export const SavedAlbum = async({...data})=>{
    try {
        const res = await axios.post(`${baseURL}api/album/create`, {...data})
        console.log(res)
        return res.data.savedAlbum
    } catch (error) {
        console.log(error);
        
    }
  }