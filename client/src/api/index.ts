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
        console.log(result)
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


export const removeUser = async(userId: any)=> {
    try {
      const res = axios.delete(`${baseURL}/api/users/deleteUser/${userId}`)
      return res;
    } catch (error) {
      console.log(error)
    }
  }


  export const changingUserRole = async (userId: any, role: any ) => {
    try {
      const res = await axios.put(`${baseURL}/api/users/updateRole/${userId}`, { data : { role : role }});
      return res;
    } catch (error) {
      return null;
    }
  };


  
  export const getAllUsers =  async() => {
      try {
          const res = await axios.get(`${baseURL}/api/users/getUsers`);
          return res.data;
      } catch (error) {
          console.log(error)   
      }
  }