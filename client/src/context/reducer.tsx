export const actionType = {
    SET_USER : "SET_USER",
    SET_ALL_USERS: "SET_ALL_USERS",
    SET_ALL_ARTISTS: "SET_ALL_ARTISTS",
    SET_ALL_SONGS: "SET_ALL_SONGS",
    SET_ALL_ALBUMS: "SET_ALL_ALBUMS"
}

const reducer = (state: any, action: any)=>{
    console.log(action);
    console.log(state);
    switch(action.type){
        case actionType.SET_USER:
        return {
            ...state,
            users: action.users
        };
        case actionType.SET_ALL_ALBUMS:
        return {
            ...state,
            allAlbums: action.allAlbums
        };
        case actionType.SET_ALL_ARTISTS:
        return {
            ...state,
            allArtist: action.allArtists
        };
        case actionType.SET_ALL_SONGS:
        return {
            ...state,
            allSongs: action.allSongs
        };
        case actionType.SET_ALL_USERS:
        return {
            ...state,
            allUsers: action.allUsers
        };

        default: return state
    }
    
}

export default reducer