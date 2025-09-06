// src/controllers/albumController.ts
import { Request, Response } from 'express';
import AlbumModel from '../models/AlbumModel';

// GET all albums
export const getAllAlbums = async (_req: Request, res: Response) => {
  try {
    const albums = await AlbumModel.find().sort({ createdAt: -1 });
    res.json(albums);
  } catch (err) {
    console.error('Error fetching albums:', err);
    res.status(500).json({ error: 'Failed to fetch albums.' });
  }
};

// GET album by ID
export const getAlbumById = async (req: Request, res: Response) => {
  try {
    const album = await AlbumModel.findById(req.params.id);
    if (!album) return res.status(404).json({ error: 'Album not found.' });
    res.json(album);
  } catch (err) {
    console.error('Error fetching album:', err);
    res.status(500).json({ error: 'Failed to fetch album.' });
  }
};

// POST create a new album
export const createAlbum = async (req: Request, res: Response) => {
  const { name, media } = req.body;

  if (!name || !Array.isArray(media)) {
    return res.status(400).json({ error: 'Name and media array are required.' });
  }

  try {
    const newAlbum = await AlbumModel.create({ name, media });
    res.status(201).json(newAlbum);
  } catch (err) {
    console.error('Error creating album:', err);
    res.status(500).json({ error: 'Failed to create album.' });
  }
};

// PUT update album
export const updateAlbum = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, media } = req.body;

  if (!name || !Array.isArray(media)) {
    return res.status(400).json({ error: 'Name and media are required' });
  }

  try {
    const updated = await AlbumModel.findByIdAndUpdate(
      id,
      {
        name,
        media, // ✅ this will overwrite the entire array
        updatedAt: new Date(), // ✅ ensure updatedAt is refreshed
      },
      { new: true } // ✅ to return the updated doc
    );

    if (!updated) {
      return res.status(404).json({ error: 'Album not found' });
    }

    res.json({ message: 'Album updated', album: updated });
  } catch (err) {
    console.error('Failed to update album:', err);
    res.status(500).json({ error: 'Failed to update album' });
  }
};

// DELETE album
export const deleteAlbum = async (req: Request, res: Response) => {
  try {
    const deleted = await AlbumModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Album not found.' });
    res.json({ message: 'Album deleted successfully.' });
  } catch (err) {
    console.error('Error deleting album:', err);
    res.status(500).json({ error: 'Failed to delete album.' });
  }
};
