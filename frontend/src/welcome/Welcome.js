import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function Welcome() {
  const features = [
    "Locate all nearby jobs by entering a job title, setting distance and a single click on the map!",
    "Don't like commuting more than 10 miles? Set your preferred scouting radius to look for closer jobs.",
    "Jobs coming from multiple different domains, all available to you on a single platform.",
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 5, textAlign: "center" }}>
        <img
          src="/images/hxh.jpg"
          alt="hxh image"
          style={{ width: "150px", height: "auto" }}
        />
        <Typography variant="h2" component="h1" gutterBottom>
          Job Hunter
        </Typography>
        <Typography variant="body1" gutterBottom>
          You can't just look for a job in this economy, you have to HUNT it
          down because that's what it means to be a HUNTER!
        </Typography>
      </Box>

      <Box
        sx={{
          my: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          Key Features
        </Typography>
        <List
          sx={{
            width: "100%",
            maxWidth: 1000,
            bgcolor: "background.paper",
            margin: "auto",
          }}
        >
          {features.map((feature, index) => (
            <ListItem key={index} sx={{ justifyContent: "center" }}>
              <ListItemText primary={feature} sx={{ textAlign: "center" }} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ my: 5 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          Meet Our Team
        </Typography>
        <Grid container spacing={2}>
          {["Jason", "Dylan", "Husain", "Ryan"].map((member) => (
            <Grid item xs={12} sm={6} md={3} key={member}>
              <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6">{member}</Typography>
                <img
                  src="/images/hxh.jpg"
                  alt="Small Image"
                  style={{ width: "100px", height: "auto" }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ my: 5, textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/map"
          sx={{
            fontSize: "1.5vw",
            padding: "1.5vw",
            minWidth: "10vw",
            height: "auto",
          }}
        >
          Start Hunting
        </Button>
      </Box>

      <Box component="footer" sx={{ my: 5, textAlign: "center" }}>
        <Typography variant="body1">
          Contact us at: support@jobhunter.com
        </Typography>
      </Box>
    </Container>
  );
}
