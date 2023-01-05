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