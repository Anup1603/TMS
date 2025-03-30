import {
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  CircularProgress,
  Grid,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axiosInstance";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch property details
        const propertyRes = await axios.get(`/api/property/${id}`);
        setProperty(propertyRes.data);

        // Check if property has a tenant_id before making the request
        if (propertyRes.data.status === "Occupied") {
          const tenantRes = await axios.get(`/api/tenant/${id}`);
          setTenant(tenantRes.data);
        } else {
          setTenant(null);
        }
      } catch (error) {
        console.error("Error fetching property data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCreateTenant = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(`create-tenant`);
      setLoading(false);
    }, 100);
  };

  if (!property) {
    return <Typography>Property not found</Typography>;
  }

  return (
    <Box sx={{ p: isMobile ? 0 : 3 }}>
      {loading && (
        <LinearProgress
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            backgroundColor: "#836df7",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#fff",
            },
          }}
        />
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            sx={{ mr: 2 }}
            onClick={() => console.log("Edit clicked")}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => console.log("Delete clicked")}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="div">
          {property.propertyName}
        </Typography>
        {tenant && (
          <Chip
            label="Occupied"
            color="error"
            variant="outlined"
            size="medium"
          />
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom component="div">
            Basic Information
          </Typography>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Flat No"
              value={property.flatNo || ""}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="BHK"
              value={property.bhk || ""}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 1 }}>
              <TextField
                label="Status"
                value={tenant ? "Occupied" : property.status || ""}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
                sx={{ mr: 2 }}
              />
              <Chip
                label={tenant ? "Occupied" : property.status}
                color={
                  tenant
                    ? "error"
                    : property.status === "Available"
                      ? "success"
                      : "error"
                }
                size="medium"
              />
            </Box>
            <TextField
              label="Rent Amount"
              value={`₹${property.rentAmount || ""}`}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom component="div">
            Location
          </Typography>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Address"
              value={property.address || ""}
              fullWidth
              margin="normal"
              multiline
              rows={3}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="City"
              value={property.city || ""}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="State"
              value={property.state || ""}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom component="div">
            Owner Information
          </Typography>
          <TextField
            label="Property Owner"
            value={property.propertyOwner || ""}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />
        </Grid>

        {tenant && (
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Tenant Information
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={tenant[0].name}
                    secondary={
                      <>
                        <Typography component="span" display="block">
                          Phone: {tenant[0].phoneNo}
                        </Typography>
                        <Typography component="span" display="block">
                          Email: {tenant[0].email}
                        </Typography>
                        <Typography component="span" display="block">
                          Move-in Date:{" "}
                          {new Date(
                            tenant[0].leaseStartDate
                          ).toLocaleDateString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        )}
      </Grid>

      {!tenant && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleCreateTenant()}
            sx={{
              backgroundColor: "#836df7",
              color: "white",
              minWidth: 200,
              "&:hover": { backgroundColor: "#6a5bbd" },
            }}
          >
            +Create Tenant
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PropertyDetails;
