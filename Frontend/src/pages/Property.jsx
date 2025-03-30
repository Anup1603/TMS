import {
  Box,
  Typography,
  Button,
  LinearProgress,
  TextField,
} from "@mui/material";
import axios from "../axiosInstance";

import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropertyBreadcrumbs from "../components/PropertyBreadcrumbs";

const Property = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]); // Stores all properties
  const [searchTerm, setSearchTerm] = useState(""); // Search term

  const fetchProperties = async () => {
    try {
      const response = await axios.get("/api/property/");
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const handleCreateProperty = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("create");
      setLoading(false);
    }, 100);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f7fa" }}>
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
      {/* Breadcrumbs */}
      <Box sx={{ mb: 2 }}>
        <PropertyBreadcrumbs />
      </Box>

      {/* Header with Create Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1, minWidth: "150px" }}>
          Properties
        </Typography>

        <TextField
          autoComplete="off"
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange} // Trigger search on input change
          sx={{
            mr: 1,
            width: { xs: "100%", sm: "auto", md: 200 },
            backgroundColor: "white",
          }}
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#836df7",
            color: "white",
            "&:hover": { backgroundColor: "#6a5bbd" },
            width: { xs: "100%", sm: "auto" }, // Button takes full width on small screens
          }}
          onClick={handleCreateProperty}
          startIcon={<span>+</span>}
        >
          Create Property
        </Button>
      </Box>

      {/* Nested routes will be rendered here */}
      <Outlet context={{ properties, searchTerm, fetchProperties }} />
    </Box>
  );
};

export default Property;

// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Grid,
//   CircularProgress,
//   Breadcrumbs,
//   Link,
//   Chip,
//   Modal,
//   TextField,
//   MenuItem,
//   Divider,
// } from "@mui/material";
// import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "../axiosInstance";
// import HomeIcon from "@mui/icons-material/Home";

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: { xs: "90%", sm: "80%", md: "600px" },
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 2,
//   maxHeight: "90vh",
//   overflowY: "auto",
// };

// function Property({ user }) {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [createModalOpen, setCreateModalOpen] = useState(false);
//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [tenantModalOpen, setTenantModalOpen] = useState(false);
//   const navigate = useNavigate();
//   const params = useParams();

//   // Form states
//   const [propertyForm, setPropertyForm] = useState({
//     propertyName: "",
//     flatNo: "",
//     bhk: "",
//     status: "Available",
//     rentAmount: "",
//     address: "",
//     city: "",
//     state: "",
//     propertyOwner: "",
//   });

//   const [tenantForm, setTenantForm] = useState({
//     tenantName: "",
//     email: "",
//     phoneNo: "",
//     governmentIdType: "Aadhar",
//     governmentIdNumber: "",
//   });

//   const governmentIdTypes = [
//     "Aadhar",
//     "PAN",
//     "Driving License",
//     "Passport",
//     "Voter ID",
//   ];

//   // Fetch properties
//   const fetchProperties = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get("/api/property");
//       setProperties(data);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   // Handle property input change
//   const handlePropertyInputChange = (e) => {
//     const { name, value } = e.target;
//     setPropertyForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle tenant input change
//   const handleTenantInputChange = (e) => {
//     const { name, value } = e.target;
//     setTenantForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // Create new property
//   const handleCreateProperty = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/api/property", propertyForm);
//       fetchProperties();
//       setCreateModalOpen(false);
//       setPropertyForm({
//         propertyName: "",
//         flatNo: "",
//         bhk: "",
//         status: "Available",
//         rentAmount: "",
//         address: "",
//         city: "",
//         state: "",
//         propertyOwner: "",
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Add tenant to property
//   const handleAddTenant = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         `/api/property/${selectedProperty?._id}/tenant`,
//         tenantForm
//       );
//       setTenantModalOpen(false);
//       setTenantForm({
//         tenantName: "",
//         email: "",
//         phoneNo: "",
//         governmentIdType: "Aadhar",
//         governmentIdNumber: "",
//       });
//       fetchProperties(); // Refresh to show updated tenant info
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // View property details
//   const handleViewDetails = (property) => {
//     setSelectedProperty(property);
//     setViewModalOpen(true);
//   };

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* Breadcrumbs */}
//       <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
//         <Link
//           component={RouterLink}
//           to={`/${user._id}/dashboard/property`}
//           sx={{ display: "flex", alignItems: "center" }}
//           color="inherit"
//         >
//           <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
//           Dashboard
//         </Link>
//         <Typography color="text.primary">Properties</Typography>
//       </Breadcrumbs>

//       {/* Header with Create Button */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 3,
//         }}
//       >
//         <Typography variant="h4">Properties</Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => setCreateModalOpen(true)}
//           startIcon={<span>+</span>}
//         >
//           Create Property
//         </Button>
//       </Box>

//       {/* Property Cards Grid */}
//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Grid container spacing={3}>
//           {properties.map((property) => (
//             <Grid item xs={12} sm={6} md={4} key={property._id}>
//               <Card
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   height="160"
//                   image={
//                     property.image ||
//                     "https://source.unsplash.com/random/?apartment,building"
//                   }
//                   alt={property.propertyName}
//                 />
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography gutterBottom variant="h6" component="div">
//                     {property.propertyName}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     <strong>Flat No:</strong> {property.flatNo}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     <strong>Address:</strong> {property.address}
//                   </Typography>
//                   <Box sx={{ mt: 1 }}>
//                     <Chip
//                       label={property.status}
//                       size="small"
//                       color={
//                         property.status === "Available" ? "success" : "error"
//                       }
//                     />
//                     <Typography variant="body2" sx={{ mt: 1 }}>
//                       <strong>Rent:</strong> ₹{property.rentAmount}/month
//                     </Typography>
//                   </Box>
//                 </CardContent>
//                 <CardActions>
//                   <Button
//                     size="small"
//                     onClick={() => handleViewDetails(property)}
//                   >
//                     View Details
//                   </Button>
//                   <Button
//                     size="small"
//                     color="secondary"
//                     onClick={() => {
//                       setSelectedProperty(property);
//                       setTenantModalOpen(true);
//                     }}
//                   >
//                     + Add Tenant
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       {/* Empty State */}
//       {!loading && properties.length === 0 && (
//         <Box
//           sx={{
//             textAlign: "center",
//             p: 4,
//             border: "1px dashed",
//             borderColor: "divider",
//             borderRadius: 1,
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             No Properties Found
//           </Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
//             You haven't added any properties yet.
//           </Typography>
//           <Button variant="contained" onClick={() => setCreateModalOpen(true)}>
//             Create Your First Property
//           </Button>
//         </Box>
//       )}

//       {/* Create Property Modal */}
//       <Modal
//         open={createModalOpen}
//         onClose={() => setCreateModalOpen(false)}
//         aria-labelledby="create-property-modal"
//       >
//         <Box sx={modalStyle}>
//           <Typography variant="h6" mb={2}>
//             Create New Property
//           </Typography>
//           <form onSubmit={handleCreateProperty}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Property Name"
//                   name="propertyName"
//                   value={propertyForm.propertyName}
//                   onChange={handlePropertyInputChange}
//                   margin="normal"
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Flat No"
//                   name="flatNo"
//                   value={propertyForm.flatNo}
//                   onChange={handlePropertyInputChange}
//                   margin="normal"
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="BHK"
//                   name="bhk"
//                   value={propertyForm.bhk}
//                   onChange={handlePropertyInputChange}
//                   margin="normal"
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   select
//                   label="Status"
//                   name="status"
//                   value={propertyForm.status}
//                   onChange={handlePropertyInputChange}
//                   margin="normal"
//                   required
//                 >
//                   <MenuItem value="Available">Available</MenuItem>
//                   <MenuItem value="Not Available">Not Available</MenuItem>
//                 </TextField>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Rent Amount"
//                   name="rentAmount"
//                   type="number"
//                   value={propertyForm.rentAmount}
//                   onChange={handlePropertyInputChange}
//                   margin="normal"
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Address"
//                   name="address"
//                   value={propertyForm.address}
//                   onChange={handlePropertyInputChange}
//                   margin="normal"
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="City"
//                   name="city"
//                   value={propertyForm.city}
//                   onChange={handlePropertyInputChange}
//                   margin="normal"
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="State"
//                   name="state"
//                   value={propertyForm.state}
//                   onChange={handlePropertyInputChange}
//                   margin="normal"
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Property Owner"
//                   name="propertyOwner"
//                   value={propertyForm.propertyOwner}
//                   onChange={handlePropertyInputChange}
//                   margin="normal"
//                   required
//                 />
//               </Grid>
//             </Grid>
//             <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
//               <Button onClick={() => setCreateModalOpen(false)} sx={{ mr: 1 }}>
//                 Cancel
//               </Button>
//               <Button type="submit" variant="contained">
//                 Create
//               </Button>
//             </Box>
//           </form>
//         </Box>
//       </Modal>

//       {/* View Property Details Modal */}
//       <Modal
//         open={viewModalOpen}
//         onClose={() => setViewModalOpen(false)}
//         aria-labelledby="view-property-modal"
//       >
//         <Box sx={modalStyle}>
//           {selectedProperty && (
//             <>
//               <Typography variant="h6" mb={2}>
//                 {selectedProperty.propertyName}
//               </Typography>
//               <Divider sx={{ mb: 2 }} />

//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <Typography>
//                     <strong>Flat No:</strong> {selectedProperty.flatNo}
//                   </Typography>
//                   <Typography>
//                     <strong>BHK:</strong> {selectedProperty.bhk}
//                   </Typography>
//                   <Typography>
//                     <strong>Status:</strong>
//                     <Chip
//                       label={selectedProperty.status}
//                       size="small"
//                       color={
//                         selectedProperty.status === "Available"
//                           ? "success"
//                           : "error"
//                       }
//                       sx={{ ml: 1 }}
//                     />
//                   </Typography>
//                   <Typography>
//                     <strong>Rent Amount:</strong> ₹{selectedProperty.rentAmount}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Typography>
//                     <strong>Address:</strong> {selectedProperty.address}
//                   </Typography>
//                   <Typography>
//                     <strong>City:</strong> {selectedProperty.city}
//                   </Typography>
//                   <Typography>
//                     <strong>State:</strong> {selectedProperty.state}
//                   </Typography>
//                   <Typography>
//                     <strong>Owner:</strong> {selectedProperty.propertyOwner}
//                   </Typography>
//                 </Grid>
//               </Grid>

//               <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
//                 <Button onClick={() => setViewModalOpen(false)}>Close</Button>
//               </Box>
//             </>
//           )}
//         </Box>
//       </Modal>

//       {/* Add Tenant Modal */}
//       <Modal
//         open={tenantModalOpen}
//         onClose={() => setTenantModalOpen(false)}
//         aria-labelledby="add-tenant-modal"
//       >
//         <Box sx={modalStyle}>
//           <Typography variant="h6" mb={2}>
//             Add Tenant to {selectedProperty?.propertyName}
//           </Typography>
//           <form onSubmit={handleAddTenant}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Tenant Name"
//                   name="tenantName"
//                   value={tenantForm.tenantName}
//                   onChange={handleTenantInputChange}
//                   margin="normal"
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Email"
//                   name="email"
//                   type="email"
//                   value={tenantForm.email}
//                   onChange={handleTenantInputChange}
//                   margin="normal"
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Phone No"
//                   name="phoneNo"
//                   value={tenantForm.phoneNo}
//                   onChange={handleTenantInputChange}
//                   margin="normal"
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   select
//                   label="Government ID Type"
//                   name="governmentIdType"
//                   value={tenantForm.governmentIdType}
//                   onChange={handleTenantInputChange}
//                   margin="normal"
//                   required
//                 >
//                   {governmentIdTypes.map((type) => (
//                     <MenuItem key={type} value={type}>
//                       {type}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Government ID Number"
//                   name="governmentIdNumber"
//                   value={tenantForm.governmentIdNumber}
//                   onChange={handleTenantInputChange}
//                   margin="normal"
//                   required
//                 />
//               </Grid>
//             </Grid>
//             <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
//               <Button onClick={() => setTenantModalOpen(false)} sx={{ mr: 1 }}>
//                 Cancel
//               </Button>
//               <Button type="submit" variant="contained">
//                 Add Tenant
//               </Button>
//             </Box>
//           </form>
//         </Box>
//       </Modal>
//     </Box>
//   );
// }

// export default Property;
