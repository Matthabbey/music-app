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
    SET_ALL_ALBUMFILTER: "SET_ALL_ALBUMFILTER",
    SET_ALL_ALERTMESSAGES: "SET_ALL_ALERTMESSAGES",

    //SETTING SONG
    SET_ISSONG_PLAYING: "SET_ISSONG_PLAYING",
    SET_SONG_INDEX: "SET_SONG_INDEX" 
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

        // Filter Cases
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

            //All Alert Message
        case actionType.SET_ALL_ALERTMESSAGES:
            return {
                ...state,
                allAlertMassages: action.allAlertMassages
            }
        case actionType.SET_ISSONG_PLAYING:
            return {
                ...state,
                 isSongPlaying: action.isSongPlaying
            }
        case actionType.SET_SONG_INDEX:
            return {
                ...state,
                songIndex: action.songIndex
            }



        default: return state
    }
    
}

export default reducer