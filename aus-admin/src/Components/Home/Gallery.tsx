// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { fetchAlbums, createAlbum, getAlbumUploadUrl } from "../../API/galleryApi";
// import { MdAdd } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import Layout from "./Layout";

// interface MediaItem {
//   type: "image" | "video";
//   url: string;
// }

// interface Album {
//   _id: string;
//   name: string;
//   media: MediaItem[];
//   createdAt: string;
//   updatedAt: string;
// }

// const convertToBase64 = (file: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = error => reject(error);
//   });
// };

// const Gallery = () => {
//   return (
//     <Layout pageContent={<GalleryContent />}/>
//   )
// }

// export default Gallery

// const GalleryContent = () => {
//   const [albums, setAlbums] = useState<Album[]>([]);
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("newest");
//   const [openDialog, setOpenDialog] = useState(false);
//   const [newName, setNewName] = useState("");
//   const [files, setFiles] = useState<File[]>([]);
//   const [previews, setPreviews] = useState<MediaItem[]>([]);

//   const navigate = useNavigate();

//   const loadAlbums = async () => {
//     try {
//       const data = await fetchAlbums();
//       setAlbums(data);
//     } catch {
//       alert("Failed to fetch albums.");
//     }
//   };

//   useEffect(() => {
//     loadAlbums();
//   }, []);

//   const filteredAlbums = [...albums]
//     .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
//     .sort((a, b) => {
//       switch (sort) {
//         case "newest":
//           return new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime();
//         case "oldest":
//           return new Date(a.updatedAt || a.createdAt).getTime() - new Date(b.updatedAt || b.createdAt).getTime();
//         case "az":
//           return a.name.localeCompare(b.name);
//         case "za":
//           return b.name.localeCompare(a.name);
//         default:
//           return 0;
//       }
//     });

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
//     setFiles(selectedFiles);
//     const previews: MediaItem[] = await Promise.all(
//       selectedFiles.map(async (file) => {
//         const base64 = await convertToBase64(file);
//         const type = file.type.startsWith("video") ? "video" : "image";
//         return { type, url: base64 };
//       })
//     );
//     setPreviews(previews);
//   };

//   const handleCreate = async () => {
//   if (!newName || files.length === 0) return alert("Album name and media required.");

//   try {
//     const uploadedMedia = await Promise.all(
//       files.map(async (file) => {
//         const { uploadURL, fileUrl } = await getAlbumUploadUrl(file);

//         await fetch(uploadURL, {
//           method: 'PUT',
//           headers: { 'Content-Type': file.type },
//           body: file,
//         });

//         return {
//           type: file.type.startsWith("video") ? "video" : "image",
//           url: fileUrl
//         };
//       })
//     );

//     await createAlbum({ name: newName, media: uploadedMedia });

//     setOpenDialog(false);
//     setNewName("");
//     setFiles([]);
//     setPreviews([]);
//     loadAlbums();
//   } catch (err) {
//     console.error("Album creation failed:", err);
//     alert("Failed to create album");
//   }
// };


//   return (
//     <Box p={3}>
//       {/* Controls */}
//       <Box display="flex" gap={2} mb={3} flexWrap="wrap">
//         <TextField
//           label="Search Albums"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           sx={{ minWidth: 220, flex: 1 }}
//         />
//         <FormControl sx={{ minWidth: 160 }}>
//           <InputLabel>Sort</InputLabel>
//           <Select value={sort} label="Sort" onChange={(e) => setSort(e.target.value)}>
//             <MenuItem value="newest">Newest</MenuItem>
//             <MenuItem value="oldest">Oldest</MenuItem>
//             <MenuItem value="az">A-Z</MenuItem>
//             <MenuItem value="za">Z-A</MenuItem>
//           </Select>
//         </FormControl>
//         <Button variant="contained" startIcon={<MdAdd />} onClick={() => setOpenDialog(true)}>
//           Add Album
//         </Button>
//       </Box>

//       {/* Album Cards */}
//       <Box display="flex" flexWrap="wrap" gap={3}>
//         {filteredAlbums.map((album) => (
//           <Card
//             key={album._id}
//             sx={{ flex: "1 1 calc(50% - 24px)", cursor: "pointer" }}
//             onClick={() => navigate(`/gallery/${album._id}`)}
//           >
//             <CardContent>
//               <Typography variant="h6">{album.name}</Typography>
//               <Typography variant="caption" color="text.secondary">
//                 Created: {new Date(album.createdAt).toLocaleDateString()}
//               </Typography>
//               <br />
//               <Typography variant="caption" color="text.secondary">
//                 Updated: {new Date(album.updatedAt).toLocaleDateString()}
//               </Typography>
//               <Box display="flex" gap={1} mt={2} flexWrap="wrap">
//                 {album.media.slice(0, 5).map((m, i) =>
//                   m.type === "image" ? (
//                     <img
//                       key={i}
//                       src={m.url}
//                       alt="preview"
//                       style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4 }}
//                     />
//                   ) : (
//                     <video
//                       key={i}
//                       src={m.url}
//                       style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4 }}
//                       muted
//                     />
//                   )
//                 )}
//               </Box>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>

//       {/* Add Album Dialog */}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Add New Album</DialogTitle>
//         <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
//           <TextField
//             label="Album Name"
//             value={newName}
//             onChange={(e) => setNewName(e.target.value)}
//           />
//           <Button variant="outlined" component="label">
//             Upload Photos/Videos
//             <input
//               type="file"
//               accept="image/*,video/*"
//               multiple
//               hidden
//               onChange={handleFileChange}
//             />
//           </Button>
//           <Box display="flex" gap={1} flexWrap="wrap">
//             {previews.map((media, idx) =>
//               media.type === "image" ? (
//                 <img
//                   key={idx}
//                   src={media.url}
//                   alt="preview"
//                   style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
//                 />
//               ) : (
//                 <video
//                   key={idx}
//                   src={media.url}
//                   style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
//                   muted
//                 />
//               )
//             )}
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleCreate}>Create</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };


import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchAlbums, createAlbum, getAlbumUploadUrl } from "../../API/galleryApi";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import Loader from "../../utils/Loader";

interface MediaItem {
  type: "image" | "video";
  url: string;
}

interface Album {
  _id: string;
  name: string;
  media: MediaItem[];
  createdAt: string;
  updatedAt: string;
}

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const Gallery = () => {
  return (
    <Layout pageContent={<GalleryContent />} />
  );
};

export default Gallery;

const GalleryContent = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [openDialog, setOpenDialog] = useState(false);
  const [newName, setNewName] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loadAlbums = async () => {
    setLoading(true);
    try {
      const data = await fetchAlbums();
      setAlbums(data);
    } catch {
      alert("Failed to fetch albums.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  const filteredAlbums = [...albums]
    .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      switch (sort) {
        case "newest":
          return new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime();
        case "oldest":
          return new Date(a.updatedAt || a.createdAt).getTime() - new Date(b.updatedAt || b.createdAt).getTime();
        case "az":
          return a.name.localeCompare(b.name);
        case "za":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles(selectedFiles);
    const previews: MediaItem[] = await Promise.all(
      selectedFiles.map(async (file) => {
        const base64 = await convertToBase64(file);
        const type = file.type.startsWith("video") ? "video" : "image";
        return { type, url: base64 };
      })
    );
    setPreviews(previews);
  };

  const handleCreate = async () => {
    if (!newName || files.length === 0) return alert("Album name and media required.");
    
    setLoading(true);
    try {
      const uploadedMedia = await Promise.all(
        files.map(async (file) => {
          const { uploadURL, fileUrl } = await getAlbumUploadUrl(file);

          await fetch(uploadURL, {
            method: 'PUT',
            headers: { 'Content-Type': file.type },
            body: file,
          });

          return {
            type: file.type.startsWith("video") ? "video" : "image",
            url: fileUrl
          };
        })
      );

      await createAlbum({ name: newName, media: uploadedMedia });

      setOpenDialog(false);
      setNewName("");
      setFiles([]);
      setPreviews([]);
      loadAlbums();
    } catch (err) {
      console.error("Album creation failed:", err);
      alert("Failed to create album");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <Box p={3}>
      {/* Controls */}
      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <TextField
          label="Search Albums"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 220, flex: 1 }}
        />
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Sort</InputLabel>
          <Select value={sort} label="Sort" onChange={(e) => setSort(e.target.value)}>
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="az">A-Z</MenuItem>
            <MenuItem value="za">Z-A</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" startIcon={<MdAdd />} onClick={() => setOpenDialog(true)}>
          Add Album
        </Button>
      </Box>

      {/* Album Cards */}
      <Box display="flex" flexWrap="wrap" gap={3}>
        {filteredAlbums.map((album) => (
          <Card
            key={album._id}
            sx={{ flex: "1 1 calc(50% - 24px)", cursor: "pointer" }}
            onClick={() => navigate(`/gallery/${album._id}`)}
          >
            <CardContent>
              <Typography variant="h6">{album.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                Created: {new Date(album.createdAt).toLocaleDateString()}
              </Typography>
              <br />
              <Typography variant="caption" color="text.secondary">
                Updated: {new Date(album.updatedAt).toLocaleDateString()}
              </Typography>
              <Box display="flex" gap={1} mt={2} flexWrap="wrap">
                {album.media.slice(0, 5).map((m, i) =>
                  m.type === "image" ? (
                    <img
                      key={i}
                      src={m.url}
                      alt="preview"
                      style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4 }}
                    />
                  ) : (
                    <video
                      key={i}
                      src={m.url}
                      style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4 }}
                      muted
                    />
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Add Album Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Album</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Album Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Button variant="outlined" component="label">
            Upload Photos/Videos
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              hidden
              onChange={handleFileChange}
            />
          </Button>
          <Box display="flex" gap={1} flexWrap="wrap">
            {previews.map((media, idx) =>
              media.type === "image" ? (
                <img
                  key={idx}
                  src={media.url}
                  alt="preview"
                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
                />
              ) : (
                <video
                  key={idx}
                  src={media.url}
                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
                  muted
                />
              )
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
