import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../axiosInstance";

const CreateProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    propertyName: "",
    flatNo: "",
    bhk: "",
    status: "Available",
    rentAmount: "",
    address: "",
    city: "",
    state: "",
    propertyOwner: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", formData); // Debugging

    try {
      await axios.post("/api/property/create", formData, {
        headers: { "Content-Type": "application/json" },
      });
      navigate(".."); // Redirect to property list
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
      alert("Failed to create property.");
    }
  };

  return (
    <Box component="form" autoComplete="off" sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Create New Property
      </Typography>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Property Name"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            required
            sx={{ backgroundColor: "white" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Flat No"
            name="flatNo"
            value={formData.flatNo}
            onChange={handleChange}
            required
            sx={{ backgroundColor: "white" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="BHK"
            name="bhk"
            value={formData.bhk}
            onChange={handleChange}
            required
            sx={{ backgroundColor: "white" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            sx={{ backgroundColor: "white" }}
          >
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Not Available">Not Available</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Rent Amount"
            name="rentAmount"
            type="number"
            value={formData.rentAmount}
            onChange={handleChange}
            required
            sx={{ backgroundColor: "white" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            sx={{ backgroundColor: "white" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            sx={{ backgroundColor: "white" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            sx={{ backgroundColor: "white" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Property Owner"
            name="propertyOwner"
            value={formData.propertyOwner}
            onChange={handleChange}
            required
            sx={{ backgroundColor: "white" }}
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
          onClick={handleSubmit}
        >
          Create Property
        </Button>
      </Box>
    </Box>
  );
};

export default CreateProperty;
