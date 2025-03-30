import {
  Box,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Divider,
  Link,
  Paper,
  Grid,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";

function HelpAndSupport() {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "Go to the login page and click 'Forgot Password'. You'll receive an email with instructions to reset your password.",
    },
    {
      question: "Where can I update my account information?",
      answer:
        "Navigate to 'My Account' in the top right menu to update your personal details, payment methods, and preferences.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers. Some options may vary by region.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "You can manage your subscription in the 'Billing' section of your account settings.",
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        py: 4,
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 4,
          color: "primary.main",
        }}
      >
        Help & Support
      </Typography>

      <Typography
        variant="h6"
        gutterBottom
        sx={{ mt: 3, fontWeight: "medium" }}
      >
        Quick Help
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={() => navigate("/dashboard/overview")}
            sx={{ py: 2 }}
          >
            Home Page
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<EmailIcon />}
            onClick={() => window.open("mailto:support@example.com", "_blank")}
            sx={{ py: 2 }}
          >
            Email Us
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<PhoneIcon />}
            onClick={() => (window.location.href = "tel:+18005551234")}
            sx={{ py: 2 }}
          >
            Call Support
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<ChatIcon />}
            onClick={() => alert("Live chat is currently unavailable.")}
            sx={{ py: 2 }}
          >
            Live Chat
          </Button>
        </Grid>
      </Grid>

      <Typography
        variant="h6"
        gutterBottom
        sx={{ mt: 3, fontWeight: "medium" }}
      >
        Frequently Asked Questions
      </Typography>

      <Paper elevation={2} sx={{ mb: 4 }}>
        {faqs.map((faq, index) => (
          <Accordion key={index} elevation={0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: "medium" }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{faq.answer}</Typography>
            </AccordionDetails>
            {index < faqs.length - 1 && <Divider />}
          </Accordion>
        ))}
      </Paper>

      <Typography
        variant="h6"
        gutterBottom
        sx={{ mt: 3, fontWeight: "medium" }}
      >
        Contact Us
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography gutterBottom>
          Can't find what you're looking for? Send us a message and we'll get
          back to you within 24 hours.
        </Typography>

        <Box component="form" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Subject"
            variant="outlined"
            margin="normal"
          />

          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                backgroundColor: "#836df7",
                color: "white",
                "&:hover": { backgroundColor: "#6a5bbd" },
              }}
            >
              Send Message
            </Button>
          </Box>
        </Box>
      </Paper>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: "center", mt: 4 }}
      >
        Need immediate assistance? Call our 24/7 support line at{" "}
        <Link href="tel:+18005551234">1-800-555-1234</Link>
      </Typography>
    </Box>
  );
}

export default HelpAndSupport;
