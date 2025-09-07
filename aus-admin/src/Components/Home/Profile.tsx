import {
  Alert,
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { getAllAdmins, getCurrentAdmin } from "../../API/authService";
import PasswordChangeCard from "./PasswordCard";

/**
 * Domain Types
 */
export type Role = "admin" | "superadmin" | (string & {});

export type Admin = {
  id?: string;
  name?: string;
  email: string;
  role?: Role; // Some APIs may omit or null this; treat as optional defensively
  createdAt?: string;
  updatedAt?: string;
  // add any other fields you store, e.g. phone, lastLogin, etc.
  lastLogin?: string;
};

/** API response shapes we know about (union of possibilities) */
export type CurrentAdminResponse = Admin | { admin: Admin } | null | undefined;
export type AdminListResponse =
  | Admin[]
  | { admins: Admin[] }
  | null
  | undefined;

/** Type guards & helpers */
const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

const hasProp = <K extends string>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> => isRecord(obj) && key in obj;

/** Normalize role checks (handles different casings like SUPER_ADMIN) */
export const isSuperAdminRole = (role?: string): boolean => {
  if (!role) return false;
  const r = role.toLowerCase().replace(/[-_\s]/g, "");
  return r === "superadmin" || r === "superadministrator" || r === "owner";
};

/**
 * Some APIs return { admin: {...} }, some just return {...}
 */
export const extractAdmin = (payload: CurrentAdminResponse): Admin | null => {
  if (!payload) return null;
  if (hasProp(payload, "admin") && isRecord(payload.admin)) {
    return payload.admin as Admin;
  }
  if (isRecord(payload)) {
    // Best-effort cast; ensure required fields exist at call sites where used
    return payload as Admin;
  }
  return null;
};

/**
 * Sometimes list returns { admins: [...] } vs [...]
 */
export const extractAdminList = (payload: AdminListResponse): Admin[] => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload as Admin[];
  if (hasProp(payload, "admins") && Array.isArray(payload.admins)) {
    return payload.admins as Admin[];
  }
  return [];
};

/** Derive initials from name or email */
export const initialsFrom = (name?: string, email?: string): string => {
  const base = (name && name.trim()) || (email ? email.split("@")[0] : "");
  const parts = base.split(/[.\s_-]+/).filter(Boolean);
  if (parts.length === 0) return "A";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

/** Safe date string rendering */
const toLocalDate = (iso?: string): string => {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.valueOf())
    ? "—"
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(d);
};

/** UI Bits */
const FieldRow: React.FC<{ label: string; value?: string }> = ({
  label,
  value,
}) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2" fontWeight={600}>
      {value || "—"}
    </Typography>
  </Box>
);

const ProfileCard: React.FC<{ admin: Admin }> = ({ admin }) => {
  const roleLabel = isSuperAdminRole(admin.role) ? "Super Admin" : "Admin";

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Avatar sx={{ width: 56, height: 56 }} aria-label={roleLabel}>
          {initialsFrom(admin.name, admin.email)}
        </Avatar>
        <Box>
          <Typography variant="h6">
            {admin.name || (admin.email ? admin.email.split("@")[0] : "—")}
          </Typography>
          <Chip
            size="small"
            label={roleLabel}
            color={isSuperAdminRole(admin.role) ? "secondary" : "default"}
            sx={{ mt: 0.5 }}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <FieldRow label="Email" value={admin.email} />
      {/* If you want role explicitly visible below, uncomment: */}
      {/* <FieldRow label="Role" value={isSuperAdminRole(admin.role) ? "superadmin" : admin.role || "admin"} /> */}
    </Paper>
  );
};

const AdminsTable: React.FC<{ rows: ReadonlyArray<Admin> }> = ({ rows }) => {
  return (
    <TableContainer component={Paper} elevation={2}>
      <Table aria-label="admins table">
        <TableHead>
          <TableRow>
            <TableCell>Admin</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((a) => (
            <TableRow key={a.id || a.email} hover>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {initialsFrom(a.name, a.email)}
                  </Avatar>
                  <Typography variant="body2" fontWeight={600}>
                    {a.name || (a.email ? a.email.split("@")[0] : "—")}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{a.email || "—"}</Typography>
              </TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={
                    isSuperAdminRole(a.role) ? "superadmin" : a.role || "admin"
                  }
                  color={isSuperAdminRole(a.role) ? "secondary" : "default"}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {toLocalDate(a.createdAt)}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={4}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ py: 2 }}
                >
                  No admins found.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ProfilePage: React.FC = () => {
  const [me, setMe] = useState<Admin | null>(null);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const iAmSuperAdmin = useMemo(() => isSuperAdminRole(me?.role), [me?.role]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const current = (await getCurrentAdmin()) as CurrentAdminResponse;
        const meExtracted = extractAdmin(current);
        if (cancelled) return;
        if (!meExtracted || !meExtracted.email) {
          throw new Error("Unable to determine current admin.");
        }

        setMe(meExtracted);

        if (isSuperAdminRole(meExtracted.role)) {
          const list = (await getAllAdmins()) as AdminListResponse;
          if (cancelled) return;
          setAdmins(extractAdminList(list));
        } else {
          setAdmins([]);
        }
      } catch (e: unknown) {
        // Try to unwrap common API error shapes (e.g., Axios)
        let message = "Failed to load profile.";
        if (isRecord(e) && hasProp(e, "response") && isRecord(e.response)) {
          const maybeMsg = (e.response as Record<string, unknown>)?.data as
            | Record<string, unknown>
            | undefined;
          if (maybeMsg && typeof maybeMsg.message === "string") {
            message = maybeMsg.message;
          }
        } else if (e instanceof Error && e.message) {
          message = e.message;
        }
        if (!cancelled) setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h4">
          {iAmSuperAdmin ? "Super Admin Profile" : "Admin Profile"}
        </Typography>
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress aria-label="Loading profile" />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error" sx={{ mb: 3 }} role="alert">
          {error}
        </Alert>
      )}

      {!loading && !error && me && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={iAmSuperAdmin ? 4 : 6}>
            <ProfileCard admin={me} />
            <PasswordChangeCard />
          </Grid>

          {iAmSuperAdmin && (
            <Grid item xs={12} md={8}>
              <Paper elevation={0} sx={{ mb: 1 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  All Admins
                </Typography>
              </Paper>
              <AdminsTable rows={admins} />
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default ProfilePage;
