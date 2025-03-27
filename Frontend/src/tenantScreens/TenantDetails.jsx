import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  CircularProgress,
  Grid,
  Breadcrumbs,
  Link,
  Button,
  Alert,
} from "@mui/material";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axiosInstance";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

const TenantDetails = () => {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const [tenant, setTenant] = useState(null);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!tenantId) {
          throw new Error("Tenant ID is missing from URL");
        }

        const { data: tenantData } = await axios.get(`/api/tenant/one/${tenantId}`);
        setTenant(tenantData);

        if (tenantData.property_id) {
          const { data: propertyData } = await axios.get(
            `/api/property/${tenantData.property_id}`
          );
          setProperty(propertyData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tenantId]);

  if (!tenantId) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          No tenant ID found in URL. Please navigate from the tenants list.
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/dashboard/tenant")}
        >
          Back to Tenants List
        </Button>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.includes("404") ? "Tenant not found" : error}
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/dashboard/tenant")}
        >
          Back to Tenants List
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link component={RouterLink} to="/dashboard">
            Dashboard
          </Link>
          <Link component={RouterLink} to="/dashboard/tenant">
            Tenants
          </Link>
          <Typography color="text.primary">
            {tenant?.name || "Loading..."}
          </Typography>
        </Breadcrumbs>
        <Box>
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{ mr: 2 }}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          {tenant && (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/dashboard/tenant/${tenantId}/edit`)}
            >
              Edit
            </Button>
          )}
        </Box>
      </Box>

      <Typography variant="h4" gutterBottom>
        Tenant Details
      </Typography>
      <Divider sx={{ my: 2 }} />

      {tenant && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
              <Typography variant="h5" gutterBottom>
                Personal Information
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography>
                  <strong>Name:</strong> {tenant.name}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {tenant.email}
                </Typography>
                <Typography>
                  <strong>Phone:</strong> {tenant.phoneNo}
                </Typography>
                <Typography>
                  <strong>ID Type:</strong> {tenant.governmentID}
                </Typography>
                <Typography>
                  <strong>ID Number:</strong> {tenant.governmentIDNumber}
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
              <Typography variant="h5" gutterBottom>
                Property Information
              </Typography>
              {property ? (
                <Box sx={{ mb: 2 }}>
                  <Typography>
                    <strong>Property:</strong> {property.propertyName}
                  </Typography>
                  <Typography>
                    <strong>Flat No:</strong> {property.flatNo}
                  </Typography>
                  <Typography>
                    <strong>Address:</strong> {property.address}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Typography sx={{ mr: 1 }}>
                      <strong>Status:</strong>
                    </Typography>
                    <Chip
                      label={property.status}
                      color={
                        property.status === "Available" ? "success" : "error"
                      }
                    />
                  </Box>
                </Box>
              ) : (
                <Typography>No property assigned</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default TenantDetails;
