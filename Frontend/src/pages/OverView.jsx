import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import axios from "../axiosInstance";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Overview = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalTenants: 0,
    totalRevenue: 0,
    totalDuePayments: 0,
  });
  const [propertyDistribution, setPropertyDistribution] = useState([]);
  const [tenantGrowth, setTenantGrowth] = useState([]);
  const [rentCollection, setRentCollection] = useState([]);

  // Process property data to get state-wise distribution
  const processPropertyData = (properties) => {
    if (!properties || !Array.isArray(properties)) return [];

    const stateCounts = properties.reduce((acc, property) => {
      const state = property?.state || "Unknown";
      acc[state] = (acc[state] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(stateCounts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  // Generate mock data for charts
  const generateMockData = useMemo(() => {
    return {
      tenantGrowth: [
        { month: "Jan", 2023: 15, 2024: 22 },
        { month: "Feb", 2023: 18, 2024: 25 },
        { month: "Mar", 2023: 22, 2024: 30 },
        { month: "Apr", 2023: 25, 2024: 35 },
        { month: "May", 2023: 28, 2024: 40 },
        { month: "Jun", 2023: 32, 2024: 45 },
        { month: "Jul", 2023: 35, 2024: 48 },
        { month: "Aug", 2023: 38, 2024: 52 },
        { month: "Sep", 2023: 40, 2024: 55 },
        { month: "Oct", 2023: 42, 2024: 58 },
        { month: "Nov", 2023: 45, 2024: 62 },
        { month: "Dec", 2023: 48, 2024: 65 },
      ],
      rentCollection: [
        { month: "Jan", collected: 12000, due: 2000 },
        { month: "Feb", collected: 13500, due: 1500 },
        { month: "Mar", collected: 14200, due: 1800 },
        { month: "Apr", collected: 15000, due: 1000 },
        { month: "May", collected: 16000, due: 2000 },
        { month: "Jun", collected: 15500, due: 2500 },
        { month: "Jul", collected: 16500, due: 1500 },
        { month: "Aug", collected: 17000, due: 1000 },
        { month: "Sep", collected: 17500, due: 1500 },
        { month: "Oct", collected: 18000, due: 2000 },
        { month: "Nov", collected: 18500, due: 1500 },
        { month: "Dec", collected: 19000, due: 1000 },
      ],
    };
  }, []);

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch property and tenant counts
        const [propertiesRes, tenantsRes] = await Promise.all([
          axios.get("/api/property").catch(() => ({ data: [] })),
          axios.get("/api/tenant").catch(() => ({ data: [] })),
        ]);

        // Calculate total revenue (dummy data for now)
        const totalRevenue = propertiesRes.data.length * 1500; // Assuming ₹1500 avg rent

        // Process property distribution by state
        const processedDistribution = processPropertyData(propertiesRes.data);

        // Calculate total due payments from mock data
        const totalDuePayments = generateMockData.rentCollection.reduce(
          (sum, month) => sum + (month.due || 0),
          0
        );

        setStats({
          totalProperties: propertiesRes.data.length || 0,
          totalTenants: tenantsRes.data.length || 0,
          totalRevenue,
          totalDuePayments,
        });

        setPropertyDistribution(processedDistribution);
        setTenantGrowth(generateMockData.tenantGrowth);
        setRentCollection(generateMockData.rentCollection);
      } catch (err) {
        console.error("Error fetching overview data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [generateMockData]);

  // Color palette for charts
  const COLORS = useMemo(
    () => [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
      theme.palette.info.main,
    ],
    [theme]
  );

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Card
          sx={{
            p: 1,
            boxShadow: 3,
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="body2" color="text.primary" fontWeight={600}>
            {label}
          </Typography>
          {payload.map((item, index) => (
            <Typography
              key={index}
              variant="body2"
              color={item.color}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  bgcolor: item.color,
                  mr: 1,
                  borderRadius: "50%",
                }}
              />
              {item.name}: ₹{item.value.toLocaleString()}
            </Typography>
          ))}
        </Card>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          gap: 2,
        }}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" color="text.secondary">
          Loading dashboard data...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          p: 3,
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: isMobile ? 2 : 4,
        background: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      {/* Page Title */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Property Management Overview
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Key insights and analytics for your properties
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Top Section - Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          {
            title: "Total Properties",
            value: stats.totalProperties,
            description: "Across all locations",
            color: theme.palette.secondary.main,
          },
          {
            title: "Total Tenants",
            value: stats.totalTenants,
            description: "Current occupancy",
            color: "#836df7",
          },
          {
            title: "Total Revenue",
            value: `₹${stats.totalRevenue.toLocaleString()}`,
            description: "Annual projected revenue",
            color: "#1cff5c",
          },
        ].map((card, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              sx={{
                height: "100%",
                boxShadow: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 4,
                },
                borderLeft: `4px solid ${card.color}`,
                background: theme.palette.background.paper,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{
                    color: card.color,
                    fontWeight: 700,
                  }}
                >
                  {card.value}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 0.5 }}
                >
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Middle Section - Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Tenant Growth Line Chart */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2,
              height: "100%",
              boxShadow: 2,
              background: theme.palette.background.paper,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Tenant Growth (2023 vs 2024)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={tenantGrowth}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={theme.palette.divider}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: theme.palette.text.secondary }}
                />
                <YAxis tick={{ fill: theme.palette.text.secondary }} />
                <Tooltip
                  content={<CustomTooltip />}
                  contentStyle={{
                    background: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: theme.shape.borderRadius,
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="2023"
                  stroke={COLORS[0]}
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  dot={{ r: 3 }}
                  animationDuration={1000}
                />
                <Line
                  type="monotone"
                  dataKey="2024"
                  stroke={COLORS[1]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Property Distribution Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 2,
              height: "100%",
              boxShadow: 2,
              background: theme.palette.background.paper,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Property Distribution by State
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={propertyDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={isMobile ? 70 : 80}
                  innerRadius={isMobile ? 40 : 50}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  animationBegin={0}
                  animationDuration={800}
                  animationEasing="ease-out"
                >
                  {propertyDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={<CustomTooltip />}
                  contentStyle={{
                    background: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: theme.shape.borderRadius,
                  }}
                />
                <Legend
                  layout={isMobile ? "horizontal" : "vertical"}
                  verticalAlign={isMobile ? "bottom" : "middle"}
                  align="right"
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Bottom Section - Insights */}
      <Grid container spacing={3}>
        {/* Monthly Rent Collection Bar Chart */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              p: 2,
              height: "100%",
              boxShadow: 2,
              background: theme.palette.background.paper,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Monthly Rent Collection (₹)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={rentCollection}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={theme.palette.divider}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: theme.palette.text.secondary }}
                />
                <YAxis tick={{ fill: theme.palette.text.secondary }} />
                <Tooltip
                  content={<CustomTooltip />}
                  contentStyle={{
                    background: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: theme.shape.borderRadius,
                  }}
                />
                <Legend />
                <Bar
                  dataKey="collected"
                  name="Collected"
                  fill={"#43cea2"}
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                />
                <Bar
                  dataKey="due"
                  name="Due"
                  fill={"#764ba2"}
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Total Due Payments */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              boxShadow: 2,
              background: theme.palette.background.paper,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Outstanding Payments
            </Typography>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                p: 2,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  color: "#fc4c53",
                }}
              >
                ₹{stats.totalDuePayments.toLocaleString()}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total outstanding rent payments across all properties
              </Typography>
              <Box
                sx={{
                  mt: 3,
                  width: "80%",
                  height: 4,
                  background: `linear-gradient(90deg, ${theme.palette.error.main} 0%, ${theme.palette.warning.main} 100%)`,
                  borderRadius: 2,
                }}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;
