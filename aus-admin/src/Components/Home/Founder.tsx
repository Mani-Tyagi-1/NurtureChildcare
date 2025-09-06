import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { createFounder, getFounderUploadUrl } from "../../API/founderApi";

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const CreateFounder = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [badges, setBadges] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const base64 = await convertToBase64(file);
      setPreview(base64);
    }
  };

  const handleSubmit = async () => {
    if (!name || !title || !bio || !imageFile) {
      alert("All fields including an image are required.");
      return;
    }

    setLoading(true);
    try {
      const { uploadURL, fileUrl } = await getFounderUploadUrl(imageFile);

      await fetch(uploadURL, {
        method: "PUT",
        headers: { "Content-Type": imageFile.type },
        body: imageFile,
      });

      await createFounder({
        name,
        title,
        bio,
        image: fileUrl,
        badges: badges
          .split(",")
          .map((b) => b.trim())
          .filter(Boolean),
      });

      alert("Founder created successfully!");
      setName("");
      setTitle("");
      setBio("");
      setBadges("");
      setImageFile(null);
      setPreview(null);
    } catch (err) {
      console.error("Error creating founder:", err);
      alert("Failed to create founder");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Create New Founder
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            label="Badges (comma separated)"
            value={badges}
            onChange={(e) => setBadges(e.target.value)}
            fullWidth
          />
          <Button variant="outlined" component="label">
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          {preview && (
            <Box>
              <Typography variant="caption" color="text.secondary">
                Image Preview:
              </Typography>
              <img
                src={preview}
                alt="preview"
                style={{ width: "100%", borderRadius: 4, marginTop: 8 }}
              />
            </Box>
          )}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            fullWidth
          >
            {loading ? "Creating..." : "Create Founder"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateFounder;
