import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  CssBaseline,
  Box,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const topMenuItems = [
    { text: "Property", icon: <HomeIcon />, path: "/dashboard/property" },
    { text: "Tenant", icon: <PeopleIcon />, path: "/dashboard/tenant" },
    { text: "Billing", icon: <PaymentIcon />, path: "/dashboard/billing" },
  ];

  const bottomMenuItems = [
    {
      text: "Account",
      icon: <AccountCircleIcon />,
      path: "/dashboard/account",
    },
    { text: "Setting", icon: <SettingsIcon />, path: "/dashboard/setting" },
  ];

  const drawer = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <DrawerHeader>
        <IconButton onClick={handleSidebarToggle}>
          {isSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <List>
        {topMenuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              backgroundColor:
                location.pathname === item.path ? "#836df7" : "inherit",
              color: location.pathname === item.path ? "#fff" : "inherit",
              "&:hover": {
                backgroundColor:
                  location.pathname === item.path ? "#836df7" : "#f5f5f5",
              },
              minHeight: 48,
              justifyContent: isSidebarOpen ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isSidebarOpen ? 3 : "auto",
                justifyContent: "center",
                color: location.pathname === item.path ? "#fff" : "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
            {isSidebarOpen && (
              <ListItemText
                primary={item.text}
                sx={{ opacity: isSidebarOpen ? 1 : 0 }}
              />
            )}
          </ListItem>
        ))}
      </List>
      <Box sx={{ marginTop: "auto", marginBottom: "30%" }}>
        {" "}
        {/* Position bottom items 30% above the bottom */}
        <List>
          {bottomMenuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                backgroundColor:
                  location.pathname === item.path ? "#836df7" : "inherit",
                color: location.pathname === item.path ? "#fff" : "inherit",
                "&:hover": {
                  backgroundColor:
                    location.pathname === item.path ? "#836df7" : "#f5f5f5",
                },
                minHeight: 48,
                justifyContent: isSidebarOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isSidebarOpen ? 3 : "auto",
                  justifyContent: "center",
                  color: location.pathname === item.path ? "#fff" : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {isSidebarOpen && (
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: isSidebarOpen ? 1 : 0 }}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#836df7",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/dashboard/property">
            <img
              src="/Logo3.webp" // Replace with your logo image URL
              alt="TMS Portal Logo"
              style={{
                width: "50px", // Adjust size as needed
                height: "auto",
                borderRadius: 50, // Add border radius for a modern look
              }}
            />
          </Link>
          <Typography variant="h6" noWrap sx={{ ml: 2 }}>
            TMS Portal
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: isSidebarOpen ? drawerWidth : 56 },
          flexShrink: { sm: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRadius: 2, // Add border radius to sidebar
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: isSidebarOpen ? drawerWidth : 56,
              transition: "width 0.3s ease",
              borderRadius: 2, // Add border radius to sidebar
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${isSidebarOpen ? drawerWidth : 56}px)` },
          transition: "width 0.3s ease",
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
