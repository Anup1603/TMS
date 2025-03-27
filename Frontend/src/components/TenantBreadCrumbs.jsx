import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, useLocation, useParams } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const TenantBreadCrumbs = () => {
  const location = useLocation();
  const params = useParams();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <MuiBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        if (value === "tenant") {
          if (last) {
            return (
              <Typography key={to} color="text.primary">
                Tenants
              </Typography>
            );
          }
          return (
            <Link
              key={to}
              component={RouterLink}
              to={to}
              style={{ textDecoration: "none" }}
            >
              Tenants
            </Link>
          );
        }

        if (value === params.id) {
          if (pathnames.includes("edit")) {
            return (
              <Link
                key={to}
                component={RouterLink}
                to={to}
                style={{ textDecoration: "none" }}
              >
                Tenant Details
              </Link>
            );
          }
          return (
            <Typography key={to} color="text.primary">
              Tenant Details
            </Typography>
          );
        }

        if (value === "edit") {
          return (
            <Typography key={to} color="text.primary">
              Edit Tenant
            </Typography>
          );
        }

        return null;
      })}
    </MuiBreadcrumbs>
  );
};

export default TenantBreadCrumbs;
