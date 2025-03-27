import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  CircularProgress,
  Chip,
  LinearProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axiosInstance";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data: properties } = await axios.get("/api/property");
        setProperties(properties);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleViewClick = (propertyId) => {
    setLoading(true);
    setTimeout(() => {
      navigate(`${propertyId}`);
      setLoading(false);
    }, 100);
  };

  const handleAddTenantClick = (propertyId) => {
    setLoading(true);
    setTimeout(() => {
      navigate(`${propertyId}/create-tenant`);
      setLoading(false);
    }, 100);
  };

  return (
    <Grid container spacing={3}>
      {loading && (
        <LinearProgress
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        />
      )}
      {properties.map((property) => (
        <Grid item xs={12} sm={6} md={4} key={property._id}>
          <Card>
            <CardMedia
              component="img"
              height="220"
              image={
                property.image ||
                "https://source.unsplash.com/random/?apartment"
              }
              alt="Property"
            />
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography gutterBottom variant="h5" component="div">
                  {property.propertyName}
                </Typography>
                {property.status === "Available" ? (
                  <Chip
                    label="Available"
                    sx={{ backgroundColor: "#00fa4b", color: "#fff" }}
                    size="small"
                  />
                ) : (
                  <Chip
                    label="Occupied"
                    sx={{ backgroundColor: "#ff3730", color: "#fff" }}
                    size="small"
                  />
                )}
              </Box>
              <Typography variant="body2" color="text.secondary">
                Flat No: {property.flatNo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {property.address}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                sx={{ color: "#836df7" }}
                size="small"
                onClick={() => handleViewClick(property._id)}
              >
                View Details
              </Button>
              {property.status === "Available" && (
                <Button
                  size="small"
                  sx={{
                    color: "#836df7",
                    "&:hover": { backgroundColor: "#836df7", color: "#fff" },
                  }}
                  onClick={() => handleAddTenantClick(property._id)}
                >
                  + Add Tenant
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PropertyList;
