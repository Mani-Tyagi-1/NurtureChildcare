// src/components/Layout.tsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";
import { registerAdmin } from "../../API/authService"; // adjust path if needed
import { useUser } from "../../Context/UserContext";

interface LayoutProps {
  pageContent: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ pageContent }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { admin, loading, logout } = useUser();
  if (loading) return null;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

  const handleProfile = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const handleCreateAdmin = () => {
    handleMenuClose();
    setOpen(true);
  };

  const handleViewAdmins = () => {
    navigate("/all-admins");
    handleMenuClose();
  };

  const handleAddAdmin = async () => {
    try {
      if (!email || !password) {
        alert("Email and Password are required.");
        return;
      }
      await registerAdmin(email, password);
      alert("Admin created successfully!");
      setOpen(false);
      setEmail("");
      setPassword("");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to create admin.";
      alert(msg);
    }
  };

  const navLinks = [
    { label: "Home", path: "/home" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "Gallery", path: "/gallery" },
    { label: "Newsletter", path: "/newsletter" },
    { label: "Blogs", path: "/blogs" },
    { label: "Founder", path: "/founder" },
  ];

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left Section: Hamburger (mobile) + Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Hamburger for mobile */}
            <IconButton
              color="inherit"
              edge="start"
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            {/* Title always on left */}
            <Typography variant="h6" sx={{ fontWeight: "bold" }}> Aus Admin - {admin?.superadmin === true ? "Superadmin" : "Admin"} </Typography>
          </Box>

          {/* Centered Links for Desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {navLinks.map((link) => (
              <Typography
                key={link.path}
                component={Link}
                to={link.path}
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Box>

          {/* Right Section with User Icon */}
          <IconButton onClick={handleMenuOpen} size="large" sx={{ p: 0 }}>
            <FaUserCircle />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            {admin?.superadmin === true && (
              <>
                <MenuItem onClick={handleCreateAdmin}>
                  Create New Admin
                </MenuItem>
                <MenuItem onClick={handleViewAdmins}>View All Admins</MenuItem>
              </>
            )}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
        >
          {/* Drawer Header with Admin Info */}
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Aus Admin
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {admin?.superadmin === true ? "Superadmin" : "Admin"}
            </Typography>
          </Box>
          <Divider />

          {/* Nav Links */}
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.path} disablePadding>
                <ListItemButton component={Link} to={link.path}>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Container maxWidth={false} disableGutters sx={{ mt: 0, px: 0 }}>
        {pageContent}
      </Container>

      {/* Create Admin Modal */}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setEmail("");
          setPassword("");
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create New Admin</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setEmail("");
              setPassword("");
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddAdmin}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Layout;
