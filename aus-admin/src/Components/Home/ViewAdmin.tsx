import { useEffect, useState } from "react";
import Layout from "./Layout";
import {
    Box,
    TextField,
    MenuItem,
    Typography,
    Card,
    CardContent,
    IconButton,
    Select,
    InputLabel,
    FormControl,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import { MdDelete } from "react-icons/md";
import { getAllAdmins, deleteAdmin } from "../../API/adminApi";
import { FaCrown } from "react-icons/fa";

interface Admin {
    _id: string;
    email: string;
    superadmin: boolean;
}

const ViewAdmin = () => {
    return <Layout pageContent={<ViewAdminContent />} />;
};

export default ViewAdmin;

const ViewAdminContent = () => {
    const [search, setSearch] = useState("");
    const [sortOption, setSortOption] = useState("az");
    const [admins, setAdmins] = useState<Admin[]>([]);

    const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);


    const fetchAdmins = async () => {
        try {
            const data = await getAllAdmins();
            if (Array.isArray(data)) {
                setAdmins(data);
            } else {
                setAdmins([]);
                console.warn('getAllAdmins did not return an array:', data);
            }
        } catch (error) {
            alert("Error fetching admins");
            setAdmins([]); // ← prevent undefined
        }
    };


    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleDeleteConfirmed = async () => {
        if (!selectedAdminId) return;
        try {
            await deleteAdmin(selectedAdminId);
            setConfirmOpen(false);
            setSelectedAdminId(null);
            fetchAdmins();
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to delete admin.");
            setConfirmOpen(false);
        }
    };


    const confirmDelete = (id: string) => {
        setSelectedAdminId(id);
        setConfirmOpen(true);
    };


    const filteredAdmins = (admins || [])
        .filter((admin) => admin.email.toLowerCase().includes(search.trim().toLowerCase()))
        .sort((a, b) => sortOption === "az" ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email));

    return (
        <Box p={3}>
            {/* Controls */}
            <Box
                display="flex"
                flexWrap="wrap"
                gap={2}
                justifyContent="space-between"
                alignItems="center"
                mb={4}
            >
                <TextField
                    label="Search by Email"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ minWidth: 220, flex: 1 }}
                />

                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                        value={sortOption}
                        label="Sort By"
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <MenuItem value="az">A-Z</MenuItem>
                        <MenuItem value="za">Z-A</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Admin Cards */}
            <Box display="flex" flexWrap="wrap" gap={3}>
                {filteredAdmins.map((admin) => (
                    <Card
                        key={admin._id}
                        sx={{
                            width: 300,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            px: 2,
                            py: 1,
                        }}
                    >
                        <CardContent sx={{ flexGrow: 1, p: 0 }}>
                            <Typography variant="body1">{admin.email}</Typography>
                        </CardContent>

                        {!admin.superadmin ? (
                            <IconButton onClick={() => confirmDelete(admin._id)}>
                                <MdDelete
                                    style={{
                                        color: "white",
                                        backgroundColor: "black",
                                        borderRadius: "50%",
                                        fontSize: '0.8em',
                                        padding: "5px",
                                    }}
                                />
                            </IconButton>

                        ) : <FaCrown
                            title="Superadmin"
                            style={{
                                color: 'gold',
                                fontSize: '1.5rem',
                            }}
                        />}

                    </Card>
                ))}

                <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this admin?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
                        <Button onClick={handleDeleteConfirmed} color="error" variant="contained">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

            </Box>
        </Box>
    );
};
