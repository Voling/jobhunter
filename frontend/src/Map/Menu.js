import React from "react";
import MapContext from "./MapContext";
import { useContext } from "react";
import { fetchListings } from "./api";
import { Link } from "react-router-dom";
import { TextField, Box, Button, Slide } from "@mui/material";

function Menu() {
  const { position, setPosition, listings, setListings } =
    useContext(MapContext);
  const [input, setInput] = React.useState("");
  const [radius, setRadius] = React.useState(5);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleRadiusChange = (e) => {
    setRadius(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input && radius) {
      fetchListings({
        keyword: input,
        location: "irvine",
        radius: radius,
        lat_input: position[0],
        lng_input: position[1],
      })
        .then((data) => {
          console.log("Listings fetched successfully:", data);
          setListings(data);
        })
        .catch((error) => {
          console.error("Failed to fetch listings:", error);
        });
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 10,
          left: 50,
          zIndex: 900,
          display: "flex",
          gap: 1,
        }}
      >
        <Button
          variant="contained"
          onClick={toggleMenu}
          sx={{ width: 100, height: 60 }}
        >
          Toggle Menu
        </Button>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 100, height: 60 }}
          >
            Home
          </Button>
        </Link>
      </Box>
      <Slide direction="right" in={isMenuOpen} mountOnEnter unmountOnExit>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: "absolute",
            top: 80,
            left: 10,
            width: 275,
            padding: 2,
            backgroundColor: "white",
            border: "1px solid grey",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            zIndex: 1000,
          }}
        >
          <TextField
            label="Input a Job Name..."
            variant="outlined"
            name="na"
            value={input}
            onChange={handleInputChange}
          />
          <TextField
            label="Select a radius"
            variant="outlined"
            type="number"
            name="radius"
            value={radius}
            onChange={handleRadiusChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ margin: 1 }}
          >
            Submit
          </Button>
        </Box>
      </Slide>
    </>
  );
}

export default Menu;
