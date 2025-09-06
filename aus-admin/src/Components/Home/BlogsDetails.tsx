// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Typography,
//   TextField,
//   IconButton,
//   Button,
//   Chip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Input,
// } from '@mui/material';
// import { useUser } from '../../Context/UserContext';
// import { MdEdit, MdDelete } from 'react-icons/md';
// import { fetchBlogById, updateBlog, deleteBlog } from '../../API/blogsApi';

// import React from 'react'
// import Layout from './Layout';
// import { getBlogImageUploadURL } from '../../API/uploadApi';

// const BlogsDetails = () => {
//   return (
//     <Layout pageContent={<BlogDetailsContent />} />
//   )
// }

// export default BlogsDetails;

// const BlogDetailsContent = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { admin } = useUser();

//   const [blog, setBlog] = useState<any>(null);
//   const [editMode, setEditMode] = useState(false);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState<string[]>([]);
//   const [tags, setTags] = useState<string[]>([]);
//   const [images, setImages] = useState<string[]>([]);
//   const [newTag, setNewTag] = useState('');
//   const [confirmOpen, setConfirmOpen] = useState(false);

//   useEffect(() => {
//     const loadBlog = async () => {
//       try {
//         const data = await fetchBlogById(id!);
//         setBlog(data);
//         setTitle(data.title);
//         setContent(data.content.split('\n\n'));
//         setTags(data.tags);
//         setImages(data.images);
//       } catch {
//         alert('Failed to fetch blog');
//       }
//     };

//     loadBlog();
//   }, [id]);

//   const handleTagDelete = (tag: string) => {
//     setTags(tags.filter((t) => t !== tag));
//   };

//   const handleAddTag = () => {
//     const trimmed = newTag.trim().toLowerCase();
//     if (trimmed && !tags.includes(trimmed)) {
//       setTags([...tags, trimmed]);
//       setNewTag('');
//     }
//   };

//   const handleParagraphChange = (index: number, value: string) => {
//     const updated = [...content];
//     updated[index] = value;
//     setContent(updated);
//   };

//   const handleImageDelete = (url: string) => {
//     setImages(images.filter((img) => img !== url));
//   };

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;

//     const uploadedUrls: string[] = [];

//     for (const file of Array.from(files)) {
//       try {
//         const { uploadURL, fileUrl } = await getBlogImageUploadURL(file);

//         await fetch(uploadURL, {
//           method: 'PUT',
//           headers: { 'Content-Type': file.type },
//           body: file,
//         });

//         uploadedUrls.push(fileUrl);
//       } catch (err) {
//         console.error('Upload failed for', file.name, err);
//         alert(`Failed to upload ${file.name}`);
//       }
//     }

//     setImages(prev => [...prev, ...uploadedUrls]);
//   };


//   const handleSave = async () => {
//     try {
//       await updateBlog(blog._id, {
//         title,
//         content: content.join('\n\n'),
//         tags,
//         images,
//       });
//       alert('Blog updated');
//       setEditMode(false);
//     } catch {
//       alert('Failed to update blog');
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await deleteBlog(blog._id);
//       alert('Blog deleted');
//       navigate('/blogs');
//     } catch {
//       alert('Failed to delete blog');
//     }
//   };

//   if (!blog) return <Typography>Loading blog...</Typography>;

//   return (
//     <Box p={4}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         {editMode ? (
//           <TextField
//             variant="outlined"
//             fullWidth
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         ) : (
//           <Typography variant="h4">{title}</Typography>
//         )}

//         {admin?.superadmin && (
//           <>
//             <IconButton onClick={() => setEditMode(!editMode)}>
//               <MdEdit />
//             </IconButton>
//             <IconButton onClick={() => setConfirmOpen(true)}>
//               <MdDelete />
//             </IconButton>
//           </>
//         )}
//       </Box>

//       <Typography variant="subtitle2" color="text.secondary" mb={2}>
//         Created on: {new Date(blog.createdAt).toDateString()}
//       </Typography>

//       <Box mb={3}>
//         <Typography variant="h6">Tags</Typography>
//         <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
//           {tags.map((tag) => (
//             <Chip
//               key={tag}
//               label={tag}
//               onDelete={editMode ? () => handleTagDelete(tag) : undefined}
//             />
//           ))}
//         </Box>
//         {editMode && (
//           <Box display="flex" mt={2} gap={1}>
//             <TextField
//               label="Add Tag"
//               value={newTag}
//               onChange={(e) => setNewTag(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
//             />
//             <Button variant="outlined" onClick={handleAddTag}>
//               Add
//             </Button>
//           </Box>
//         )}
//       </Box>

//       <Box mb={3}>
//         <Typography variant="h6">Content</Typography>
//         {content.map((para, idx) => (
//           <Box key={idx} mt={2}>
//             {editMode ? (
//               <TextField
//                 multiline
//                 fullWidth
//                 value={para}
//                 onChange={(e) => handleParagraphChange(idx, e.target.value)}
//               />
//             ) : (
//               <Typography>{para}</Typography>
//             )}
//           </Box>
//         ))}
//       </Box>

//       <Box mb={3}>
//         <Typography variant="h6">Images</Typography>
//         <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
//           {images.map((img) => (
//             <Box key={img} position="relative">
//               <img
//                 src={img}
//                 alt="Blog"
//                 style={{ width: 200, height: 120, objectFit: 'cover', borderRadius: 8 }}
//               />
//               {editMode && (
//                 <IconButton
//                   size="small"
//                   onClick={() => handleImageDelete(img)}
//                   sx={{
//                     position: 'absolute',
//                     top: 5,
//                     right: 5,
//                     backgroundColor: 'rgba(0,0,0,0.5)',
//                     color: 'white',
//                   }}
//                 >
//                   <MdDelete />
//                 </IconButton>
//               )}
//             </Box>
//           ))}
//         </Box>
//         {editMode && (
//           <Box mt={2}>
//             <Input
//               type="file"
//               inputProps={{ accept: 'image/*', multiple: true }}
//               onChange={handleImageUpload}
//             />
//           </Box>
//         )}
//       </Box>

//       {editMode && (
//         <Button variant="contained" onClick={handleSave}>
//           Save Changes
//         </Button>
//       )}

//       {/* Confirm Delete Dialog */}
//       <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           Are you sure you want to delete this blog? This action cannot be undone.
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
//           <Button onClick={handleDelete} color="error" variant="contained">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };


import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Input,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { useUser } from '../../Context/UserContext';
import { MdEdit, MdDelete } from 'react-icons/md';
import { fetchBlogById, updateBlog, deleteBlog } from '../../API/blogsApi';
import React from 'react';
import Layout from './Layout';
import { getBlogImageUploadURL } from '../../API/uploadApi';
// import Loader from '../../utils/Loader';

const BlogsDetails = () => {
  return <Layout pageContent={<BlogDetailsContent />} />;
};

export default BlogsDetails;

const BlogDetailsContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useUser();

  const [blog, setBlog] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Loader state
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const data = await fetchBlogById(id!);
        setBlog(data);
        setTitle(data.title);
        setContent(data.content.split('\n\n'));
        setTags(data.tags);
        setImages(data.images);
      } catch {
        alert('Failed to fetch blog');
      }
    };

    loadBlog();
  }, [id]);

  const handleTagDelete = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleAddTag = () => {
    const trimmed = newTag.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setNewTag('');
    }
  };

  const handleParagraphChange = (index: number, value: string) => {
    const updated = [...content];
    updated[index] = value;
    setContent(updated);
  };

  const handleImageDelete = (url: string) => {
    setImages(images.filter((img) => img !== url));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    setUploadProgress(0);

    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      try {
        const { uploadURL, fileUrl } = await getBlogImageUploadURL(file);

        await fetch(uploadURL, {
          method: 'PUT',
          headers: { 'Content-Type': file.type },
          body: file,
        });

        uploadedUrls.push(fileUrl);

        setUploadProgress(Math.round(((i + 1) / files.length) * 100));
      } catch (err) {
        console.error('Upload failed for', file.name, err);
        alert(`Failed to upload ${file.name}`);
      }
    }

    setImages((prev) => [...prev, ...uploadedUrls]);
    setUploading(false);
  };

  const handleSave = async () => {
    try {
      await updateBlog(blog._id, {
        title,
        content: content.join('\n\n'),
        tags,
        images,
      });
      alert('Blog updated');
      setEditMode(false);
    } catch {
      alert('Failed to update blog');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBlog(blog._id);
      alert('Blog deleted');
      navigate('/blogs');
    } catch {
      alert('Failed to delete blog');
    }
  };

  if (!blog) return <Typography>Loading blog...</Typography>;

  return (
    <Box p={4}>
      <Backdrop open={uploading} sx={{ color: '#fff', zIndex: 9999 }}>
        <Box textAlign="center">
          <CircularProgress color="inherit" />
          <Typography mt={2}>Uploading... {uploadProgress}%</Typography>
        </Box>
      </Backdrop>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        {editMode ? (
          <TextField
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <Typography variant="h4">{title}</Typography>
        )}

        {admin?.superadmin && (
          <>
            <IconButton onClick={() => setEditMode(!editMode)}>
              <MdEdit />
            </IconButton>
            <IconButton onClick={() => setConfirmOpen(true)}>
              <MdDelete />
            </IconButton>
          </>
        )}
      </Box>

      <Typography variant="subtitle2" color="text.secondary" mb={2}>
        Created on: {new Date(blog.createdAt).toDateString()}
      </Typography>

      <Box mb={3}>
        <Typography variant="h6">Tags</Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={editMode ? () => handleTagDelete(tag) : undefined}
            />
          ))}
        </Box>
        {editMode && (
          <Box display="flex" mt={2} gap={1}>
            <TextField
              label="Add Tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
            />
            <Button variant="outlined" onClick={handleAddTag}>
              Add
            </Button>
          </Box>
        )}
      </Box>

      <Box mb={3}>
        <Typography variant="h6">Content</Typography>
        {content.map((para, idx) => (
          <Box key={idx} mt={2}>
            {editMode ? (
              <TextField
                multiline
                fullWidth
                value={para}
                onChange={(e) => handleParagraphChange(idx, e.target.value)}
              />
            ) : (
              <Typography>{para}</Typography>
            )}
          </Box>
        ))}
      </Box>

      <Box mb={3}>
        <Typography variant="h6">Images</Typography>
        <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
          {images.map((img) => (
            <Box key={img} position="relative">
              <img
                src={img}
                alt="Blog"
                style={{ width: 200, height: 120, objectFit: 'cover', borderRadius: 8 }}
              />
              {editMode && (
                <IconButton
                  size="small"
                  onClick={() => handleImageDelete(img)}
                  sx={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                  }}
                >
                  <MdDelete />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>
        {editMode && (
          <Box mt={2}>
            <Input
              type="file"
              inputProps={{ accept: 'image/*', multiple: true }}
              onChange={handleImageUpload}
            />
          </Box>
        )}
      </Box>

      {editMode && (
        <Button variant="contained" onClick={handleSave}>
          Save Changes
        </Button>
      )}

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this blog? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
