import mongoose, { Schema } from "mongoose";
import { ArtistInstance } from "./artist";

export interface SongInstance {
    name: string,
    imageURL: string,
    artist: string,
    category: string,
    songURL: string,
    album: string,
    language: string
}

const ArtistSchema = new Schema<SongInstance>({
    name: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    songURL: {
        type: String,
        required: true
    },
    album: {
        type: String
    }, 
    artist: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    }
},
{timestamps: true}
)

export const artistModel = mongoose.model<ArtistInstance>("user", ArtistSchema);
