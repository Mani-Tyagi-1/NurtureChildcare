// import {
//     Box,
//     Typography,
//     TextField,
//     Button,
//     IconButton,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
// } from "@mui/material";
// import { MdDelete } from "react-icons/md";
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//     fetchAlbumById,
//     updateAlbum,
//     deleteAlbum,
// } from "../../API/galleryApi";
// import { getGalleryUploadUrl } from "../../API/uploadApi";

// interface MediaItem {
//     type: "image" | "video";
//     url: string;
// }

// const AlbumDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [albumName, setAlbumName] = useState("");
//     const [media, setMedia] = useState<MediaItem[]>([]);
//     const [confirmOpen, setConfirmOpen] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const load = async () => {
//             if (!id) return;
//             try {
//                 const data = await fetchAlbumById(id);
//                 setAlbumName(data.name);
//                 setMedia(data.media);
//             } catch (err) {
//                 alert("Failed to load album");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         load();
//     }, [id]);

//     const handleMediaDelete = (url: string) => {
//         setMedia((prev) => prev.filter((m) => m.url !== url));
//     };

//     const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const files = e.target.files;
//         if (!files) return;

//         try {
//             const uploads: MediaItem[] = await Promise.all(
//                 Array.from(files).map(async (file) => {
//                     const { uploadURL, fileUrl } = await getGalleryUploadUrl(file.name, file.type);
//                     await fetch(uploadURL, {
//                         method: "PUT",
//                         headers: { "Content-Type": file.type },
//                         body: file,
//                     });
//                     return {
//                         url: fileUrl,
//                         type: file.type.startsWith("video") ? "video" : "image",
//                     } as MediaItem;
//                 })
//             );

//             // 🛠 Properly update media after uploads
//             setMedia(prev => [...prev, ...uploads]);
//         } catch (err) {
//             console.error("Upload failed", err);
//             alert("Failed to upload media.");
//         }
//     };


//     const handleSave = async () => {
//         if (!id) return;
//         try {
//             console.log("Final media to save:", media); // ✅ See if it includes new uploads
//             await updateAlbum(id, { name: albumName, media });
//             alert("Album updated!");
//             setIsEditing(false);
//         } catch {
//             alert("Update failed");
//         }
//     };

//     const handleDeleteAlbum = async () => {
//         if (!id) return;
//         await deleteAlbum(id);
//         navigate("/gallery");
//     };

//     if (loading) return <Typography p={3}>Loading album...</Typography>;

//     return (
//         <Box p={3}>
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//                 <Typography variant="h4">Album Details</Typography>
//                 <Box display="flex" gap={1}>
//                     <Button variant="outlined" onClick={() => setIsEditing(!isEditing)}>
//                         {isEditing ? "Cancel" : "Edit"}
//                     </Button>
//                     <Button
//                         variant="contained"
//                         color="error"
//                         onClick={() => setConfirmOpen(true)}
//                         startIcon={<MdDelete />}
//                     >
//                         Delete
//                     </Button>
//                 </Box>
//             </Box>

//             <Box mt={3}>
//                 <Typography variant="h6">Name</Typography>
//                 {isEditing ? (
//                     <TextField
//                         fullWidth
//                         value={albumName}
//                         onChange={(e) => setAlbumName(e.target.value)}
//                         sx={{ mt: 1 }}
//                     />
//                 ) : (
//                     <Typography>{albumName}</Typography>
//                 )}
//             </Box>

//             <Box mt={4}>
//                 <Typography variant="h6" mb={1}>Media</Typography>
//                 <Box display="flex" gap={2} flexWrap="wrap">
//                     {media.map((item) =>
//                         item.type === "image" ? (
//                             <Box key={item.url} position="relative">
//                                 <img
//                                     src={item.url}
//                                     alt=""
//                                     style={{ width: 150, height: 100, objectFit: "cover", borderRadius: 6 }}
//                                     onClick={() => window.open(item.url, "_blank")}
//                                 />
//                                 {isEditing && (
//                                     <IconButton
//                                         size="small"
//                                         onClick={() => handleMediaDelete(item.url)}
//                                         sx={{
//                                             position: "absolute",
//                                             top: 4,
//                                             right: 4,
//                                             background: "rgba(0,0,0,0.6)",
//                                             color: "white",
//                                         }}
//                                     >
//                                         <MdDelete />
//                                     </IconButton>
//                                 )}
//                             </Box>
//                         ) : (
//                             <Box key={item.url} position="relative">
//                                 <video
//                                     src={item.url}
//                                     controls
//                                     style={{ width: 150, height: 100, borderRadius: 6 }}
//                                 />
//                                 {isEditing && (
//                                     <IconButton
//                                         size="small"
//                                         onClick={() => handleMediaDelete(item.url)}
//                                         sx={{
//                                             position: "absolute",
//                                             top: 4,
//                                             right: 4,
//                                             background: "rgba(0,0,0,0.6)",
//                                             color: "white",
//                                         }}
//                                     >
//                                         <MdDelete />
//                                     </IconButton>
//                                 )}
//                             </Box>
//                         )
//                     )}
//                 </Box>

//                 {isEditing && (
//                     <Box mt={2}>
//                         <Button variant="outlined" component="label">
//                             Add Media
//                             <input type="file" hidden multiple accept="image/*,video/*" onChange={handleFileUpload} />
//                         </Button>
//                     </Box>
//                 )}
//             </Box>

//             {isEditing && (
//                 <Box mt={4}>
//                     <Button variant="contained" onClick={handleSave}>
//                         Save Changes
//                     </Button>
//                 </Box>
//             )}

//             {/* Confirm Delete Dialog */}
//             <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
//                 <DialogTitle>Delete Album</DialogTitle>
//                 <DialogContent>Are you sure you want to delete this album?</DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
//                     <Button onClick={handleDeleteAlbum} color="error" variant="contained">
//                         Delete
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default AlbumDetails;


import {
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    
    CircularProgress,
    Backdrop,
} from "@mui/material";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    fetchAlbumById,
    updateAlbum,
    deleteAlbum,
} from "../../API/galleryApi";
import { getGalleryUploadUrl } from "../../API/uploadApi";


interface MediaItem {
    type: "image" | "video";
    url: string;
}

const AlbumDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [albumName, setAlbumName] = useState("");
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [apiLoading, setApiLoading] = useState(false); // For update/delete APIs

    useEffect(() => {
        const load = async () => {
            if (!id) return;
            try {
                const data = await fetchAlbumById(id);
                setAlbumName(data.name);
                setMedia(data.media);
            } catch (err) {
                alert("Failed to load album");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const handleMediaDelete = (url: string) => {
        setMedia((prev) => prev.filter((m) => m.url !== url));
    };

    const uploadFileWithProgress = async (file: File): Promise<MediaItem> => {
        const { uploadURL, fileUrl } = await getGalleryUploadUrl(file.name, file.type);

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", uploadURL, true);
            xhr.setRequestHeader("Content-Type", file.type);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentComplete = Math.round((event.loaded / event.total) * 100);
                    setUploadProgress(percentComplete);
                }
            };

            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve({
                        url: fileUrl,
                        type: file.type.startsWith("video") ? "video" : "image",
                    });
                } else {
                    reject(new Error("Upload failed"));
                }
            };

            xhr.onerror = () => reject(new Error("Upload error"));
            xhr.send(file);
        });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        setUploading(true);
        setUploadProgress(0);
        try {
            const uploads: MediaItem[] = [];
            for (let i = 0; i < files.length; i++) {
                const item = await uploadFileWithProgress(files[i]);
                uploads.push(item);
            }
            setMedia((prev) => [...prev, ...uploads]);
        } catch (err) {
            console.error("Upload failed", err);
            alert("Failed to upload media.");
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const handleSave = async () => {
        if (!id) return;
        setApiLoading(true);
        try {
            await updateAlbum(id, { name: albumName, media });
            alert("Album updated!");
            setIsEditing(false);
        } catch {
            alert("Update failed");
        } finally {
            setApiLoading(false);
        }
    };

    const handleDeleteAlbum = async () => {
        if (!id) return;
        setApiLoading(true);
        try {
            await deleteAlbum(id);
            navigate("/gallery");
        } catch {
            alert("Delete failed");
        } finally {
            setApiLoading(false);
        }
    };

    if (loading) return <Typography p={3}>Loading album...</Typography>;

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">Album Details</Typography>
                <Box display="flex" gap={1}>
                    <Button variant="outlined" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? "Cancel" : "Edit"}
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => setConfirmOpen(true)}
                        startIcon={<MdDelete />}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>

            <Box mt={3}>
                <Typography variant="h6">Name</Typography>
                {isEditing ? (
                    <TextField
                        fullWidth
                        value={albumName}
                        onChange={(e) => setAlbumName(e.target.value)}
                        sx={{ mt: 1 }}
                    />
                ) : (
                    <Typography>{albumName}</Typography>
                )}
            </Box>

            <Box mt={4}>
                <Typography variant="h6" mb={1}>Media</Typography>
                <Box display="flex" gap={2} flexWrap="wrap">
                    {media.map((item) =>
                        item.type === "image" ? (
                            <Box key={item.url} position="relative">
                                <img
                                    src={item.url}
                                    alt=""
                                    style={{ width: 150, height: 100, objectFit: "cover", borderRadius: 6 }}
                                    onClick={() => window.open(item.url, "_blank")}
                                />
                                {isEditing && (
                                    <IconButton
                                        size="small"
                                        onClick={() => handleMediaDelete(item.url)}
                                        sx={{
                                            position: "absolute",
                                            top: 4,
                                            right: 4,
                                            background: "rgba(0,0,0,0.6)",
                                            color: "white",
                                        }}
                                    >
                                        <MdDelete />
                                    </IconButton>
                                )}
                            </Box>
                        ) : (
                            <Box key={item.url} position="relative">
                                <video
                                    src={item.url}
                                    controls
                                    style={{ width: 150, height: 100, borderRadius: 6 }}
                                />
                                {isEditing && (
                                    <IconButton
                                        size="small"
                                        onClick={() => handleMediaDelete(item.url)}
                                        sx={{
                                            position: "absolute",
                                            top: 4,
                                            right: 4,
                                            background: "rgba(0,0,0,0.6)",
                                            color: "white",
                                        }}
                                    >
                                        <MdDelete />
                                    </IconButton>
                                )}
                            </Box>
                        )
                    )}
                </Box>

                {isEditing && (
                    <Box mt={2}>
                        <Button variant="outlined" component="label">
                            Add Media
                            <input type="file" hidden multiple accept="image/*,video/*" onChange={handleFileUpload} />
                        </Button>
                    </Box>
                )}
            </Box>

            {isEditing && (
                <Box mt={4}>
                    <Button variant="contained" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Box>
            )}

            {/* Confirm Delete Dialog */}
            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Delete Album</DialogTitle>
                <DialogContent>Are you sure you want to delete this album?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteAlbum} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Uploading Loader */}
            <Backdrop open={uploading || apiLoading} sx={{ color: "#fff", zIndex: 1300 }}>
                <Box textAlign="center">
                    {uploading ? (
                        <>
                            <CircularProgress variant="determinate" value={uploadProgress} size={60} />
                            <Typography mt={2}>{uploadProgress}% Uploaded</Typography>
                        </>
                    ) : (
                        <>
                            <CircularProgress size={60} />
                            <Typography mt={2}>Processing...</Typography>
                        </>
                    )}
                </Box>
            </Backdrop>
        </Box>
    );
};

export default AlbumDetails;
