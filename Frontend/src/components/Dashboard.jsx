import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
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
  LinearProgress,
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
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleButtonClick = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 300);
  };

  const isActive = (paths) => {
    return paths.some((path) => {
      // Exact match
      if (location.pathname === path) return true;

      // Wildcard match for nested routes
      if (path.endsWith("/*")) {
        const basePath = path.slice(0, -2);
        return location.pathname.startsWith(basePath);
      }

      return false;
    });
  };

  const topMenuItems = [
    {
      text: "Property",
      icon: <HomeIcon />,
      path: `/dashboard/property`,
      matchPaths: ["/dashboard/property", "/dashboard/property/*"],
    },
    {
      text: "Tenant",
      icon: <PeopleIcon />,
      path: `/dashboard/tenant`,
      matchPaths: ["/dashboard/tenant", "/dashboard/tenant/*"],
    },
    {
      text: "Billing",
      icon: <PaymentIcon />,
      path: `/dashboard/billing`,
      matchPaths: ["/dashboard/billing", "/dashboard/billing/*"],
    },
  ];

  const bottomMenuItems = [
    {
      text: "Account",
      icon: <AccountCircleIcon />,
      path: `/dashboard/account`,
      matchPaths: ["/dashboard/account"],
    },
    {
      text: "Setting",
      icon: <SettingsIcon />,
      path: `/dashboard/setting`,
      matchPaths: ["/dashboard/setting"],
    },
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
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              backgroundColor: isActive(item.matchPaths)
                ? "#836df7"
                : "inherit",
              color: isActive(item.matchPaths) ? "#fff" : "inherit",
              "&:hover": {
                backgroundColor: isActive(item.matchPaths)
                  ? "#836df7"
                  : "#f5f5f5",
              },
              minHeight: 48,
              justifyContent: isSidebarOpen ? "initial" : "center",
              px: 2.5,
            }}
            onClick={() => handleButtonClick(item.path)}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isSidebarOpen ? 3 : "auto",
                justifyContent: "center",
                color: isActive(item.matchPaths) ? "#fff" : "inherit",
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
        <List>
          {bottomMenuItems.map((item) => (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                backgroundColor: isActive(item.matchPaths)
                  ? "#836df7"
                  : "inherit",
                color: isActive(item.matchPaths) ? "#fff" : "inherit",
                "&:hover": {
                  backgroundColor: isActive(item.matchPaths)
                    ? "#836df7"
                    : "#f5f5f5",
                },
                minHeight: 48,
                justifyContent: isSidebarOpen ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => handleButtonClick(item.path)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isSidebarOpen ? 3 : "auto",
                  justifyContent: "center",
                  color: isActive(item.matchPaths) ? "#fff" : "inherit",
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
          <Link to={`/dashboard/property`}>
            <img
              src="/Logo3.webp"
              alt="TMS Portal Logo"
              style={{
                width: "50px",
                height: "auto",
                borderRadius: 50,
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
              borderRadius: 2,
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
              borderRadius: 2,
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
