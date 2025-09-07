"use client";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Chip,
  Stack,
} from "@mui/material";
import React, { useEffect, useMemo, useState, type JSX } from "react";
import { createFounder, getFounderUploadUrl } from "../../API/founderApi";

// --- Types ---
type IdLike = { _id?: string; id?: string };

export interface Founder extends IdLike {
  name: string;
  title: string;
  bio: string;
  image: string;
  badges: string[];
}

type FounderResponseShape =
  | Founder
  | { data: Founder | null | undefined }
  | Founder[]
  | null
  | undefined;

// --- Utils ---
const convertToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = (error) => reject(error);
  });

const API_BASE = "http://localhost:5000/api/founder" as const;

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

const isFounder = (v: unknown): v is Founder => {
  if (!isObject(v)) return false;
  // minimal structural check
  return (
    typeof v.name === "string" &&
    typeof v.title === "string" &&
    typeof v.bio === "string" &&
    typeof v.image === "string" &&
    Array.isArray(v.badges)
  );
};

const extractFounder = (payload: FounderResponseShape): Founder | null => {
  if (Array.isArray(payload)) {
    const first = payload[0];
    return isFounder(first) ? first : null;
  }
  if (isObject(payload) && "data" in payload) {
    const inner = (payload as { data: unknown }).data;
    return isFounder(inner) ? inner : null;
  }
  return isFounder(payload) ? payload : null;
};

const parseBadges = (input: string): string[] =>
  input
    .split(",")
    .map((b) => b.trim())
    .filter((b) => b.length > 0);

// --- Component ---
export function FounderPage(): JSX.Element {
  // Form fields
  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [badges, setBadges] = useState<string>(""); // comma-separated in UI
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Data state
  const [founder, setFounder] = useState<Founder | null>(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);

  // Derived ID helper
  const founderId = useMemo<string | null>(
    () => founder?._id ?? founder?.id ?? null,
    [founder]
  );

  // --- Fetch founder on mount ---
  useEffect(() => {
    const fetchFounder = async () => {
      setInitialLoading(true);
      try {
        const res = await fetch(API_BASE, { cache: "no-store" });
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = (await res.json()) as unknown;
        const candidate = extractFounder(data as FounderResponseShape);
        setFounder(candidate);
      } catch (err) {
        console.error("Error fetching founder:", err);
        // allow creating if fetch fails
        setFounder(null);
      } finally {
        setInitialLoading(false);
      }
    };

    void fetchFounder();
  }, []);

  // --- Handlers ---
  const resetForm = () => {
    setName("");
    setTitle("");
    setBio("");
    setBadges("");
    setImageFile(null);
    setPreview(null);
  };

  const loadFormFromFounder = (f: Founder) => {
    setName(f.name ?? "");
    setTitle(f.title ?? "");
    setBio(f.bio ?? "");
    setBadges(Array.isArray(f.badges) ? f.badges.join(", ") : "");
    setPreview(f.image ?? null);
    setImageFile(null);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    try {
      setImageFile(file);
      const base64 = await convertToBase64(file);
      setPreview(base64);
    } catch (err) {
      console.error("Failed to read image:", err);
      alert("Failed to read the selected image.");
      setImageFile(null);
      setPreview(null);
    }
  };

  const refreshFounder = async () => {
    try {
      const res = await fetch(API_BASE, { cache: "no-store" });
      const data = (await res.json()) as unknown;
      const candidate = extractFounder(data as FounderResponseShape);
      setFounder(candidate);
    } catch (err) {
      console.error("Error refreshing founder:", err);
      setFounder(null);
    }
  };

  const handleCreate = async () => {
    if (!name || !title || !bio || !imageFile) {
      alert("All fields including an image are required.");
      return;
    }

    setSubmitting(true);
    try {
      const { uploadURL, fileUrl } = await getFounderUploadUrl(imageFile);
      const uploadRes = await fetch(uploadURL, {
        method: "PUT",
        headers: { "Content-Type": imageFile.type },
        body: imageFile,
      });
      if (!uploadRes.ok) {
        throw new Error(`Image upload failed: ${uploadRes.status}`);
      }

      await createFounder({
        name,
        title,
        bio,
        image: fileUrl,
        badges: parseBadges(badges),
      });

      alert("Founder created successfully!");
      resetForm();
      await refreshFounder();
      setEditing(false);
    } catch (err) {
      console.error("Error creating founder:", err);
      alert("Failed to create founder.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStartEdit = () => {
    if (founder) {
      loadFormFromFounder(founder);
      setEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
    resetForm();
  };

  const handleUpdate = async () => {
    if (!founder) return;

    if (!name || !title || !bio) {
      alert("Name, Title and Bio are required.");
      return;
    }

    setSubmitting(true);
    try {
      // If user selected a new image, upload it first
      let imageUrl = founder.image;
      if (imageFile) {
        const { uploadURL, fileUrl } = await getFounderUploadUrl(imageFile);
        const uploadRes = await fetch(uploadURL, {
          method: "PUT",
          headers: { "Content-Type": imageFile.type },
          body: imageFile,
        });
        if (!uploadRes.ok) {
          throw new Error(`Image upload failed: ${uploadRes.status}`);
        }
        imageUrl = fileUrl;
      }

      const payload: Partial<Founder> = {
        name,
        title,
        bio,
        image: imageUrl,
        badges: parseBadges(badges),
      };

      // Try PUT /api/founder/:id if an id exists, otherwise PUT /api/founder
      const target = founderId ? `${API_BASE}/${founderId}` : API_BASE;
      const res = await fetch(target, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Update failed: ${res.status}`);

      alert("Founder updated successfully!");
      setEditing(false);
      resetForm();
      await refreshFounder();
    } catch (err) {
      console.error("Error updating founder:", err);
      alert("Failed to update founder.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!founder) return;
    const ok = window.confirm("Are you sure you want to delete this founder?");
    if (!ok) return;

    setSubmitting(true);
    try {
      const target = founderId ? `${API_BASE}/${founderId}` : API_BASE;
      const res = await fetch(target, { method: "DELETE" });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);

      alert("Founder deleted.");
      setFounder(null);
      resetForm();
    } catch (err) {
      console.error("Error deleting founder:", err);
      alert("Failed to delete founder.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- UI ---
  if (initialLoading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography>Loading founder…</Typography>
        </Paper>
      </Container>
    );
  }

  // If founder exists and not editing → read view
  if (founder && !editing) {
    return (
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Founder
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            {founder.image && (
              <img
                src={founder.image}
                alt={founder.name}
                style={{
                  width: 250,
                  height: "auto",
                  borderRadius: 8,
                  alignSelf: "center",
                  display: "block",
                }}
              />
            )}

            <Typography variant="h6">{founder.name}</Typography>
            <Typography color="text.secondary">{founder.title}</Typography>
            <Typography sx={{ whiteSpace: "pre-wrap" }}>
              {founder.bio}
            </Typography>

            {Array.isArray(founder.badges) && founder.badges.length > 0 ? (
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {founder.badges.map((b, i) => (
                  <Chip key={`${b}-${i}`} label={b} variant="outlined" />
                ))}
              </Stack>
            ) : null}

            <Box display="flex" gap={1} mt={1}>
              <Button
                variant="contained"
                onClick={handleStartEdit}
                disabled={submitting}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
                disabled={submitting}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    );
  }

  // Else (no founder, or editing) → form
  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          {founder ? "Edit Founder" : "Create New Founder"}
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            fullWidth
          />

          <TextField
            label="Title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            fullWidth
          />

          <TextField
            label="Bio"
            value={bio}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBio(e.target.value)
            }
            multiline
            rows={4}
            fullWidth
          />

          <TextField
            label="Badges (comma separated)"
            value={badges}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBadges(e.target.value)
            }
            fullWidth
          />

          <Button variant="outlined" component="label">
            {founder ? "Change Image" : "Upload Image"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {(preview || founder?.image) && (
            <Box>
              <Typography variant="caption" color="text.secondary">
                Image Preview:
              </Typography>
              <img
                src={preview ?? founder?.image ?? ""}
                alt="preview"
                style={{ width: "100%", borderRadius: 4, marginTop: 8 }}
              />
            </Box>
          )}

          <Box display="flex" gap={1}>
            {founder ? (
              <>
                <Button
                  variant="contained"
                  onClick={handleUpdate}
                  disabled={submitting}
                  fullWidth
                >
                  {submitting ? "Saving…" : "Save Changes"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCancelEdit}
                  disabled={submitting}
                  fullWidth
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={handleCreate}
                disabled={submitting}
                fullWidth
              >
                {submitting ? "Creating…" : "Create Founder"}
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

import Layout from "./Layout";

const Founder = () => {
    return <Layout pageContent={<FounderPage />} />;
};

export default Founder;


