import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, useLocation, useParams } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const PropertyBreadcrumbs = () => {
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

        if (value === "property") {
          if (last) {
            return (
              <Typography key={to} color="text.primary">
                Properties
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
              Properties
            </Link>
          );
        }

        if (value === "create") {
          return (
            <Link
              key={to}
              component={RouterLink}
              to={to}
              style={{ textDecoration: "none" }}
            >
              Create Property
            </Link>
          );
        }

        if (value === params.id) {
          return (
            <Link
              key={to}
              component={RouterLink}
              to={to}
              style={{ textDecoration: "none" }}
            >
              Property Details
            </Link>
          );
        }

        if (value === "create-tenant") {
          return (
            <Link
              key={to}
              component={RouterLink}
              to={to}
              style={{ textDecoration: "none" }}
            >
              Create Tenant
            </Link>
          );
        }

        return null;
      })}
    </MuiBreadcrumbs>
  );
};

export default PropertyBreadcrumbs;
