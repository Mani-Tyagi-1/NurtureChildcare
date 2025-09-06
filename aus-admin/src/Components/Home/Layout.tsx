// src/components/Layout.tsx
import React, { useState } from 'react';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { registerAdmin } from '../../API/authService'; // adjust path if needed
import { useUser } from '../../Context/UserContext';


interface LayoutProps {
    pageContent: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ pageContent }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

     const { admin, loading, logout } = useUser();
     if (loading) return null; // or loading spinner

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleProfile = () => {
        navigate('/profile');
        handleMenuClose();
    };

    const handleCreateAdmin = () => {
        handleMenuClose();
        setOpen(true);
    };

    const handleViewAdmins = () => {
        navigate('/all-admins');
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
            setEmail('');
            setPassword('');
        } catch (err: any) {
            const msg = err.response?.data?.message || "Failed to create admin.";
            alert(msg);
        }
    };


    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Aus Admin - {admin?.superadmin === true ? 'Superadmin' : 'Admin'}
                    </Typography>

                    <IconButton onClick={handleMenuOpen} size="large" sx={{ p: 0 }}>
                        <FaUserCircle />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <MenuItem onClick={handleProfile}>Profile</MenuItem>
                        {admin?.superadmin === true &&<>
                            <MenuItem onClick={handleCreateAdmin}>Create New Admin</MenuItem>
                            <MenuItem onClick={handleViewAdmins}>View All Admins</MenuItem>
                        </>}
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Container maxWidth={false} disableGutters sx={{ mt: 0, px: 0 }}>
                {pageContent}
            </Container>

            {/* Add Create Admin Modal */}
            <Dialog open={open} onClose={() => { setOpen(false); setEmail(''); setPassword('') }} fullWidth maxWidth="sm">
                <DialogTitle>Create New Admin</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                    <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false); setEmail(''); setPassword('') }}>Cancel</Button>
                    <Button variant="contained" onClick={handleAddAdmin}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Layout;
