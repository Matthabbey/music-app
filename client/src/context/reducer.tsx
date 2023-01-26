export const actionType = {
    SET_USER : "SET_USER",
    SET_ALL_USERS: "SET_ALL_USERS",
    SET_ALL_ARTISTS: "SET_ALL_ARTISTS",
    SET_ALL_SONGS: "SET_ALL_SONGS",
    SET_ALL_ALBUMS: "SET_ALL_ALBUMS",
    // Filter Type
    SET_ALL_FILTERTERM : "SET_ALL_FILTERTERM",
    SET_ALL_ARTISTFILTER: "SET_ALL_ARTISTFILTER",
    SET_ALL_LANGUAGEFILTER: "SET_ALL_LANGUAGEFILTER",
    SET_ALL_ALBUMFILTER: "SET_ALL_ALBUMFILTER"
}

const reducer = (state: any, action: any)=>{
    // console.log(action);
    // console.log(state);
    switch(action.type){
        case actionType.SET_USER:
        return {
            ...state,
            user: action.user
        };
        case actionType.SET_ALL_ALBUMS:
        return {
            ...state,
            allAlbums: action.allAlbums
        };
        case actionType.SET_ALL_ARTISTS:
        return {
            ...state,
            allArtists: action.allArtists
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
        case actionType.SET_ALL_FILTERTERM:
            return {
                ...state,
                filterTerm: action.filterTerm
            }
        case actionType.SET_ALL_ARTISTFILTER:
            return {
                ...state,
                artistFilter: action.artistFilter
            }
        case actionType.SET_ALL_LANGUAGEFILTER:
            return {
                ...state,
                languageFilter: action.languageFilter
            }
        case actionType.SET_ALL_ALBUMFILTER:
            return {
                ...state,
                albumFilter: action.albumFilter
            }

        default: return state
    }
    
}

export default reducer