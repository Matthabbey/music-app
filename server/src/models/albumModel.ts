import mongoose, { Schema }  from 'mongoose';

export interface AlbumInstance {
    name: string,
    imageURL: string
}

const albumSchema = new Schema<AlbumInstance>({
    name: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    }
},
{timestamps: true}
)

export const albumModel = mongoose.model<AlbumInstance>("album", albumSchema)
