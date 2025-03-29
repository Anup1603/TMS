import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Chip,
  LinearProgress,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";

const PropertyList = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 600px)");

  // Get properties and search term from context
  const { properties, searchTerm } = useOutletContext();

  // Filter properties based on search term
  const filteredProperties = searchTerm
    ? properties.filter((property) =>
        property.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : properties; // Show all properties if no search term

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
    <Grid container spacing={isMobile ? 2 : isTablet ? 3 : 4}>
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

      {filteredProperties.length > 0 ? (
        filteredProperties.map((property) => (
          <Grid item xs={12} sm={6} md={isTablet ? 6 : 4} key={property._id}>
            <Card>
              <CardMedia
                component="img"
                height={isMobile ? "180" : "220"}
                image={
                  property.image ||
                  "https://source.unsplash.com/random/?apartment"
                }
                alt="Property"
                sx={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              />
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {property.propertyName}
                  </Typography>
                  <Chip
                    label={property.status}
                    sx={{
                      backgroundColor:
                        property.status === "Available" ? "#00fa4b" : "#ff3730",
                      color: "#fff",
                    }}
                    size="small"
                  />
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
                  size={isMobile ? "small" : "medium"}
                  onClick={() => handleViewClick(property._id)}
                >
                  View Details
                </Button>
                {property.status === "Available" && (
                  <Button
                    size={isMobile ? "small" : "medium"}
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
        ))
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
          No properties found.
        </Typography>
      )}
    </Grid>
  );
};

export default PropertyList;
