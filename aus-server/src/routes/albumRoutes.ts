// src/routes/albumRoutes.ts
const express = require('express');
import {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} from '../controllers/albumController';

const router = express.Router();

router.get('/albums', getAllAlbums);
router.get('/albums/:id', getAlbumById);
router.post('/albums', createAlbum);
router.put('/albums/:id', updateAlbum);
router.delete('/albums/:id', deleteAlbum);

export default router;
