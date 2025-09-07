import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { changePassword } from "../../API/authService";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const MIN_LEN = 8;

const PasswordChangeCard = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [errors, setErrors] = useState<{
    current?: string;
    next?: string;
    confirm?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!currentPassword.trim()) e.current = "Current password is required";
    if (!newPassword.trim()) e.next = "New password is required";
    if (newPassword && newPassword.length < MIN_LEN)
      e.next = `Use at least ${MIN_LEN} characters`;
    if (newPassword && currentPassword && newPassword === currentPassword)
      e.next = "New password must be different";
    if (!confirmNewPassword.trim()) e.confirm = "Confirm your new password";
    if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword)
      e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!validate()) return;

    try {
      setSubmitting(true);
      await changePassword({ currentPassword, newPassword });
      setSuccessOpen(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to change password";
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Change Password" />
      <CardContent>
        <Box component="form" onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Current password"
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              error={!!errors.current}
              helperText={errors.current}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowCurrent((s) => !s)}
                      edge="end"
                      aria-label="toggle current password visibility"
                    >
                      {showCurrent ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="New password"
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={!!errors.next}
              helperText={errors.next || `Minimum ${MIN_LEN} characters`}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNew((s) => !s)}
                      edge="end"
                      aria-label="toggle new password visibility"
                    >
                      {showNew ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm new password"
              type={showConfirm ? "text" : "password"}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              error={!!errors.confirm}
              helperText={errors.confirm}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirm((s) => !s)}
                      edge="end"
                      aria-label="toggle confirm password visibility"
                    >
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? "Updating…" : "Update Password"}
            </Button>

            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
          </Stack>
        </Box>
      </CardContent>

      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
        message="Password updated successfully"
      />
    </Card>
  );
};

export default PasswordChangeCard;
