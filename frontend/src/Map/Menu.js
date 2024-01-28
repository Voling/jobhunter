import React from "react";
import MapContext from "./MapContext";
import { useContext } from "react";
import { fetchListings } from "./api";
import "./menu.css";
import { Link } from "react-router-dom";

function Menu() {
  const { position, setPosition, listings, setListings } =
    useContext(MapContext);
  const [input, setInput] = React.useState("");
  const [radius, setRadius] = React.useState(5);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMenuResultVisible, setIsMenuResultVisible] = React.useState();

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function submitToggleMenu() {
    setIsMenuOpen(!isMenuOpen);
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

  function handleRadiusChange(e) {
    setRadius(e.target.value); // radius state management
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchListings({
      keyword: input,
      radius: radius,
      positionX: position[0],
      positionY: position[1],
    })
      .then((data) => {
        console.log("Listings fetched successfully:", data);
        setListings(data);
      })
      .catch((error) => {
        console.error("Failed to fetch listings:", error);
      });
  }

  return (
    <>
      <button className="toggleMenu" onClick={submitToggleMenu}>
        Toggle Menu
      </button>
      <Link className="home" to={"/"}>
        Home
      </Link>
      <div className={`menu-container ${isMenuOpen ? "open" : ""}`}>
        <form onSubmit={handleSubmit}>
          <label>
            <span style={{ backgroundColor: "#d3d3d3" }}>
              Input a job name...
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
        <div
          className={`menu-container-result ${isMenuOpen ? "open" : ""}`}
        ></div>
      </div>
    </>
  );
}

export default Menu;
