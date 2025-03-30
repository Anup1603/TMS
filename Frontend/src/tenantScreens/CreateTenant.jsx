import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "../axiosInstance";

const CreateTenant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    govermentID: "Aadhar",
    govermentIDNumber: "",
    leaseStartDate: "",
  });

  const governmentIdTypes = [
    "Aadhar",
    "PAN card",
    "Passport",
    "Green card",
    "Property Document",
    "Driver License",
    "Voter ID",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // First create the tenant
      await axios.post(`/api/tenant/${id}/create`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      // Then update the property status to "Occupied"
      await axios.put(
        `/api/property/${id}`,
        { status: "Occupied" },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      navigate(`..`); // Redirect to property details page
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
      alert("Failed to add tenant. Check console for details.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Create New Tenant
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Tenant Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{ backgroundColor: "white" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ backgroundColor: "white" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone No"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            required
            sx={{ backgroundColor: "white" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Government ID Type"
            name="govermentID"
            value={formData.govermentID}
            onChange={handleChange}
            required
            sx={{ backgroundColor: "white" }}
          >
            {governmentIdTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Government ID Number"
            name="govermentIDNumber"
            value={formData.govermentIDNumber}
            onChange={handleChange}
            required
            sx={{ backgroundColor: "white" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Lease Start Date"
            name="leaseStartDate"
            type="date"
            value={formData.leaseStartDate}
            onChange={handleChange}
            required
            sx={{ backgroundColor: "white" }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#836df7",
            color: "#836df7",
            mr: 2,
            "&:hover": { borderColor: "#6a5bbd", color: "#6a5bbd" },
          }}
          onClick={() => navigate("..")}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#836df7",
            color: "white",
            "&:hover": { backgroundColor: "#6a5bbd" },
          }}
        >
          Create Tenant
        </Button>
      </Box>
    </Box>
  );
};

export default CreateTenant;
