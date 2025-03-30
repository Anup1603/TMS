// import { Box, Typography } from "@mui/material";
// import { Outlet } from "react-router-dom";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import TenantBreadCrumbs from "../components/TenantBreadCrumbs";

// function Tenant() {
//   return (
//     <Box sx={{ p: 3 }}>
//       {/* Breadcrumbs */}
//       <Box sx={{ mb: 2 }}>
//         <TenantBreadCrumbs />
//       </Box>

//       {/* Header with Create Button */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 3,
//         }}
//       >
//         <Typography variant="h4">Tenants</Typography>
//       </Box>

//       {/* Nested routes will be rendered here */}
//       <Outlet />
//     </Box>
//   );
// }

// export default Tenant;
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Grid,
  Chip,
  Avatar,
  useMediaQuery,
  useTheme,
  TextField,
  LinearProgress,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import TenantBreadCrumbs from "../components/TenantBreadCrumbs";
import axios from "../axiosInstance";

function Tenant() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [tenants, setTenants] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [property, setProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [loading, setLoading] = useState(false);

  const fetchTenants = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/tenant/");
      setTenants(data);
    } catch (error) {
      console.error("Error fetching tenants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleOpenModal = (tenant) => {
    setSelectedTenant(tenant);
    if (tenant.property_id) {
      setProperty(tenant.property_id);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTenant(null);
    setProperty(null);
    setOpenModal(false);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const getRandomColor = () => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFC300"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const filteredTenants = searchTerm
    ? tenants.filter((tenant) =>
        tenant.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tenants;

  // Responsive table cell rendering
  const renderTableCell = (content, align = "left") => (
    <TableCell align={align} sx={{ py: isMobile ? 1 : 2 }}>
      {content}
    </TableCell>
  );

  return (
    <Box sx={{ p: isMobile ? 1 : 3, backgroundColor: "#f5f7fa" }}>
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
      <Box sx={{ mb: 2 }}>{/* <TenantBreadCrumbs /> */}</Box>

      {/* Header */}
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
        <Typography
          sx={{ flexGrow: 1, minWidth: "150px" }}
          variant={isMobile ? "h5" : "h4"}
        >
          Tenants
        </Typography>
        <TextField
          autoComplete="off"
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            mr: 1,
            width: { xs: "100%", sm: "auto", md: 200 },
            backgroundColor: "white",
            "& .MuiOutlinedInput-root": {
              height: 50, // Adjust this value to change the height
            },
          }}
        />
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          maxHeight: isMobile ? "calc(100vh - 200px)" : "none",
          overflow: "auto",
        }}
      >
        <Table
          stickyHeader
          aria-label="simple table"
          size={isMobile ? "small" : "medium"}
        >
          <TableHead>
            <TableRow>
              {!isMobile && renderTableCell("Name")}
              {!isMobile && renderTableCell("Email")}
              {!isMobile && renderTableCell("Phone")}
              {!isTablet && renderTableCell("Property")}
              {renderTableCell("Status")}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTenants.length > 0 ? (
              filteredTenants.map((tenant) => (
                <TableRow
                  key={tenant._id}
                  onClick={() => handleOpenModal(tenant)}
                  hover
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                >
                  {!isMobile ? (
                    <>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          py: isMobile ? 1 : 2,
                        }}
                      >
                        <Avatar
                          sx={{
                            mr: 2,
                            bgcolor: getRandomColor(),
                            width: 32,
                            height: 32,
                          }}
                        >
                          {tenant.name.charAt(0)}
                        </Avatar>
                        {tenant.name}
                      </TableCell>
                      {renderTableCell(tenant.email)}
                      {renderTableCell(tenant.phoneNo)}
                      {!isTablet &&
                        renderTableCell(
                          tenant.property_id?.propertyName || "N/A"
                        )}
                    </>
                  ) : (
                    <TableCell component="th" scope="row" sx={{ py: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          sx={{
                            mr: 2,
                            bgcolor: getRandomColor(),
                            width: 32,
                            height: 32,
                          }}
                        >
                          {tenant.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">
                            {tenant.name}
                          </Typography>
                          <Typography variant="caption" display="block">
                            {tenant.phoneNo}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                  )}
                  {renderTableCell(
                    <Chip
                      label={tenant.status || "Active"}
                      color={tenant.status === "Inactive" ? "error" : "success"}
                      size={isMobile ? "small" : "medium"}
                    />
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={isMobile ? 2 : isTablet ? 4 : 5}>
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "center", width: "100%" }}
                  >
                    No Tenant found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Tenant Details Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "95%" : isTablet ? "85%" : "70%",
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: isMobile ? 2 : 4,
            maxHeight: "90vh",
            overflowY: "auto",
            border: "none",
            outline: "none",
          }}
        >
          {selectedTenant && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <Avatar
                  sx={{
                    width: isMobile ? 60 : 80,
                    height: isMobile ? 60 : 80,
                    mr: isMobile ? 0 : 3,
                    mb: isMobile ? 2 : 0,
                    bgcolor: getRandomColor(),
                    fontSize: isMobile ? "1.5rem" : "2rem",
                  }}
                >
                  {selectedTenant.name.charAt(0)}
                </Avatar>
                <Box sx={{ textAlign: isMobile ? "center" : "left" }}>
                  <Typography variant={isMobile ? "h5" : "h4"} component="h2">
                    {selectedTenant.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Tenant ID: {selectedTenant._id.slice(-6).toUpperCase()}
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={isMobile ? 1 : 3}>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: isMobile ? 2 : 3,
                      height: "100%",
                      borderRadius: 2,
                      borderLeft: "4px solid",
                      borderColor: "primary.main",
                    }}
                  >
                    <Typography
                      variant={isMobile ? "h6" : "h5"}
                      gutterBottom
                      sx={{ mb: 2 }}
                    >
                      Personal Information
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      {[
                        { label: "Name:", value: selectedTenant.name },
                        { label: "Email:", value: selectedTenant.email },
                        {
                          label: "Phone:",
                          value: selectedTenant.phoneNo || "N/A",
                        },
                        {
                          label: "ID Type:",
                          value: selectedTenant.govermentID || "N/A",
                        },
                        {
                          label: "ID Number:",
                          value: selectedTenant.govermentIDNumber || "N/A",
                        },
                      ].map((item, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            mb: 1.5,
                            flexDirection: isMobile ? "column" : "row",
                          }}
                        >
                          <Typography
                            sx={{
                              minWidth: isMobile ? "auto" : 140,
                              fontWeight: 500,
                              mb: isMobile ? 0.5 : 0,
                            }}
                          >
                            {item.label}
                          </Typography>
                          <Typography>{item.value}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: isMobile ? 2 : 3,
                      height: "100%",
                      borderRadius: 2,
                      borderLeft: "4px solid",
                      borderColor: "secondary.main",
                    }}
                  >
                    <Typography
                      variant={isMobile ? "h6" : "h5"}
                      gutterBottom
                      sx={{ mb: 2 }}
                    >
                      Property Information
                    </Typography>
                    {property ? (
                      <Box sx={{ mb: 2 }}>
                        {[
                          { label: "Property:", value: property.propertyName },
                          {
                            label: "Flat No:",
                            value: property.flatNo || "N/A",
                          },
                          { label: "BHK:", value: property.bhk },
                          {
                            label: "Property Owner:",
                            value: property.propertyOwner,
                          },
                          { label: "Address:", value: property.address },
                        ].map((item, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              mb: 1.5,
                              flexDirection: isMobile ? "column" : "row",
                            }}
                          >
                            <Typography
                              sx={{
                                minWidth: isMobile ? "auto" : 140,
                                fontWeight: 500,
                                mb: isMobile ? 0.5 : 0,
                              }}
                            >
                              {item.label}
                            </Typography>
                            <Typography>{item.value}</Typography>
                          </Box>
                        ))}
                        <Box
                          sx={{
                            display: "flex",
                            mt: 1,
                            flexDirection: isMobile ? "column" : "row",
                            alignItems: isMobile ? "flex-start" : "center",
                          }}
                        >
                          <Typography
                            sx={{
                              minWidth: isMobile ? "auto" : 140,
                              fontWeight: 500,
                              mb: isMobile ? 0.5 : 0,
                            }}
                          >
                            Status:
                          </Typography>
                          <Chip
                            label={property.status || "Active"}
                            color={
                              property.status === "Available"
                                ? "success"
                                : "error"
                            }
                            size={isMobile ? "small" : "medium"}
                          />
                        </Box>
                      </Box>
                    ) : (
                      <Typography color="text.secondary">
                        No property assigned
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              </Grid>

              {/* Additional Information Section */}
              <Paper
                elevation={3}
                sx={{
                  p: isMobile ? 2 : 3,
                  mt: isMobile ? 2 : 3,
                  borderRadius: 2,
                  borderLeft: "4px solid",
                  borderColor: "info.main",
                }}
              >
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  gutterBottom
                  sx={{ mb: 2 }}
                >
                  Additional Information
                </Typography>
                <Grid container spacing={isMobile ? 1 : 2}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        display: "flex",
                        mb: 1.5,
                        flexDirection: isMobile ? "column" : "row",
                      }}
                    >
                      <Typography
                        sx={{
                          minWidth: isMobile ? "auto" : 170,
                          fontWeight: 500,
                          mb: isMobile ? 0.5 : 0,
                        }}
                      >
                        Lease Start:
                      </Typography>
                      <Typography>
                        {selectedTenant.leaseStartDate
                          ? new Date(
                              selectedTenant.leaseStartDate
                            ).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "N/A"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        display: "flex",
                        mb: 1.5,
                        flexDirection: isMobile ? "column" : "row",
                      }}
                    >
                      <Typography
                        sx={{
                          minWidth: isMobile ? "auto" : 170,
                          fontWeight: 500,
                          mb: isMobile ? 0.5 : 0,
                        }}
                      >
                        Lease End:
                      </Typography>
                      <Typography>{"N/A"}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        mb: 1.5,
                        flexDirection: isMobile ? "column" : "row",
                      }}
                    >
                      <Typography
                        sx={{
                          minWidth: isMobile ? "auto" : 170,
                          fontWeight: 500,
                          mb: isMobile ? 0.5 : 0,
                        }}
                      >
                        Emergency Contact:
                      </Typography>
                      <Typography>
                        {selectedTenant.emergencyContact || "N/A"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        mb: 1.5,
                        flexDirection: isMobile ? "column" : "row",
                      }}
                    >
                      <Typography
                        sx={{
                          minWidth: isMobile ? "auto" : 170,
                          fontWeight: 500,
                          mb: isMobile ? 0.5 : 0,
                        }}
                      >
                        Notes:
                      </Typography>
                      <Typography>
                        {selectedTenant.notes || "No additional notes"}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </>
          )}
        </Box>
      </Modal>

      {/* Nested routes will be rendered here */}
      {/* <Outlet /> */}
    </Box>
  );
}

export default Tenant;
