import React from "react";
import MapContext from "./MapContext";
import { useContext } from "react";
import { fetchListings, fetchCoordinates } from "./api";
import "./menu.css";
import { Link } from "react-router-dom";

function Menu() {
  const { position, setPosition, listings, setListings } = useContext(MapContext)
  const [input, setInput] = React.useState("");
  // const [address, setAddress] = React.useState("");
  const [radius, setRadius] = React.useState(5);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMenuResultOpen, setIsMenuResultOpen] = React.useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function submitToggleMenu() {
    setIsMenuResultOpen(!isMenuOpen);
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Input updated");
    }, 2000);
    return () => clearTimeout(timer);
  }, [input]);

  function handleInputChange(e) {
    setInput(e.target.value); //state management
  }

  // function handleAddressChange(e) {
  //   setAddress(e.target.value); // Address management
  // }

  function handleRadiusChange(e) {
    setRadius(e.target.value); // radius state management
  }

  function handleSubmit(e) {
    e.preventDefault();
    // if (address) {
    //   setAddressSet(true);
    // }
    setIsMenuOpen(false); // Close the menu container
    setIsMenuResultOpen(true) // open result
    setTimeout(() => {
      setIsMenuResultOpen(false); // close result after 4 secs
    }, 4000);


    if (input && radius) {

    // fetchCoordinates({
    //   keyword: input,
    //   radius: radius,
    //   address: address
    // }).then((data) => {
    //   console.log("Coordinates fetched successfully:", address);
    //   // setAddress(data);
    // })
    //   .catch((error) => {
    //     console.error("Failed to fetch coordinates:", error);
    //   });

  
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
  }

  return (
    <>
      <button className="toggleMenu" onClick={toggleMenu}>
        Toggle Menu
      </button>
      <Link className="home" to={"/"}>
        Home
      </Link>
      <div className={`menu-container ${isMenuOpen ? "open" : ""}`}>
        <form onSubmit={handleSubmit}>
          {/* <label>
            <span style={{ backgroundColor: "#d3d3d3" }}>
              Click map or enter address
            </span>
            <input
              type="text"
              name="address"
              value={address} // Use the address state
              onChange={handleAddressChange} // Use the handleAddressChange function
            />
          </label> */}
          <label>
            <span style={{ backgroundColor: "#d3d3d3" }}>
              Input a Job Name...
            </span>
            <input
              type="text"
              name="na"
              value={input}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <span style={{ backgroundColor: "#d3d3d3" }}>Select a radius</span>
            <input
              type="number"
              name="radius"
              value={radius}
              onChange={handleRadiusChange}
            />
          </label>
          <button type="submit" onClick={toggleMenu}>
            Submit
          </button>
        </form>
        <span
          className={`menu-container-result ${isMenuResultOpen ? "open" : ""}`}>
          Searching for {input} with a radius {radius}
        </span>
      </div>
    </>
  );
}

export default Menu;
