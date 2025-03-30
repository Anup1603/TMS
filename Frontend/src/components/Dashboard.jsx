import React, { useState, useEffect, useMemo } from "react";
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
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

const drawerWidth = 230;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
      if (isMobile) setMobileOpen(false);
    }, 300);
  };

  const isActive = useMemo(() => {
    return (paths) => {
      return paths.some((path) => {
        if (location.pathname === path) return true;
        if (path.endsWith("/*")) {
          const basePath = path.slice(0, -2);
          return location.pathname.startsWith(basePath);
        }
        return false;
      });
    };
  }, [location.pathname]);

  const menuItems = useMemo(
    () => ({
      top: [
        {
          text: "Overview",
          icon: <DashboardCustomizeIcon />,
          path: "/dashboard/overview",
          matchPaths: ["/dashboard/overview", "/dashboard/overview/*"],
        },
        {
          text: "Property",
          icon: <HomeIcon />,
          path: "/dashboard/property",
          matchPaths: ["/dashboard/property", "/dashboard/property/*"],
        },
        {
          text: "Tenant",
          icon: <PeopleIcon />,
          path: "/dashboard/tenant",
          matchPaths: ["/dashboard/tenant", "/dashboard/tenant/*"],
        },
        {
          text: "Billing",
          icon: <PaymentIcon />,
          path: "/dashboard/billing",
          matchPaths: ["/dashboard/billing", "/dashboard/billing/*"],
        },
      ],
      bottom: [
        {
          text: "Helpdesk",
          icon: <ContactSupportIcon />,
          path: "/dashboard/helpandsupport",
          matchPaths: ["/dashboard/helpandsupport"],
        },
        {
          text: "Account",
          icon: <AccountCircleIcon />,
          path: "/dashboard/account",
          matchPaths: ["/dashboard/account"],
        },
      ],
    }),
    []
  );

  const drawer = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <DrawerHeader>
        {!isMobile && (
          <IconButton onClick={handleSidebarToggle}>
            {isSidebarOpen ? (
              <ChevronLeftIcon sx={{ color: "#836df7" }} />
            ) : (
              <ChevronRightIcon sx={{ color: "#836df7" }} />
            )}
          </IconButton>
        )}
      </DrawerHeader>
      <List sx={{ flexGrow: 1 }}>
        {menuItems.top.map((item) => (
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
                  : theme.palette.action.hover,
              },
              minHeight: 48,
              justifyContent: isSidebarOpen || isMobile ? "initial" : "center",
              px: 2.5,
              transition: theme.transitions.create(
                ["background-color", "color"],
                {
                  duration: theme.transitions.duration.shortest,
                }
              ),
            }}
            onClick={() => handleNavigation(item.path)}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isSidebarOpen || isMobile ? 3 : "auto",
                justifyContent: "center",
                color: isActive(item.matchPaths) ? "#fff" : "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                opacity: isSidebarOpen || isMobile ? 1 : 0,
                transition: theme.transitions.create("opacity", {
                  duration: theme.transitions.duration.shortest,
                }),
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ marginTop: "auto", mb: 6 }}>
        <Divider />
        <List>
          {menuItems.bottom.map((item) => (
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
                    : theme.palette.action.hover,
                },
                minHeight: 48,
                justifyContent:
                  isSidebarOpen || isMobile ? "initial" : "center",
                px: 2.5,
                transition: theme.transitions.create(
                  ["background-color", "color"],
                  {
                    duration: theme.transitions.duration.shortest,
                  }
                ),
              }}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isSidebarOpen || isMobile ? 3 : "auto",
                  justifyContent: "center",
                  color: isActive(item.matchPaths) ? "#fff" : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  opacity: isSidebarOpen || isMobile ? 1 : 0,
                  transition: theme.transitions.create("opacity", {
                    duration: theme.transitions.duration.shortest,
                  }),
                }}
              />
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
            backgroundColor: "#836df7",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#fff",
            },
          }}
        />
      )}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#836df7",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          {!isMobile && (
            <IconButton
              color="inherit"
              onClick={handleSidebarToggle}
              sx={{ mr: 1 }}
            >
              <MenuOpenIcon />
            </IconButton>
          )}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Link
            to="/dashboard/overview"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img
              src="/Logo3.webp"
              alt="TMS Portal Logo"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "12px",
                border: "2px solid white",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 600,
                // Always show the text in AppBar regardless of sidebar state
                opacity: 1,
                width: "auto",
                overflow: "hidden",
              }}
            >
              TMS Portal
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: isSidebarOpen ? drawerWidth : 72 },
          flexShrink: { sm: 0 },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
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
              width: isSidebarOpen ? drawerWidth : 72,
              borderRight: "none",
              backgroundColor: theme.palette.background.default,
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
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
          width: {
            xs: "100%",
            sm: `calc(100% - ${isSidebarOpen ? drawerWidth : 72}px)`,
          },
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          backgroundColor: "#f5f7fa",
          minHeight: "100vh",
        }}
      >
        <DrawerHeader />

        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
