import mongoose, { Schema } from "mongoose";

export interface ArtistInstance {
    name: string,
    imageURL: string,
    twitter: string,
    instagram: string
}

const ArtistSchema = new Schema<ArtistInstance>({
    name: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    twitter: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        required: true
    }
},
{timestamps: true}
)

export const artistModel = mongoose.model<ArtistInstance>("artist", ArtistSchema);
