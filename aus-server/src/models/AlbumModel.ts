// src/models/AlbumModel.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface MediaItem {
  type: "image" | "video";
  url: string;
}

export interface IAlbum extends Document {
  name: string;
  media: MediaItem[]; // ✅ Array of objects, not strings
  createdAt: Date;
  updatedAt: Date;
}

const mediaSchema = new Schema<MediaItem>(
  {
    type: { type: String, enum: ['image', 'video'], required: true },
    url: { type: String, required: true },
  },
  { _id: false } // No need for _id inside subdocument
);

const albumSchema = new Schema<IAlbum>(
  {
    name: { type: String, required: true },
    media: { type: [mediaSchema], default: [] }, // ✅ use mediaSchema here
  },
  { timestamps: true }
);

const AlbumModel = mongoose.model<IAlbum>('Album', albumSchema);
export default AlbumModel;
