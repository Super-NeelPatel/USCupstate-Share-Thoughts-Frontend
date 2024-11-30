import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const navStyle = {
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: "0",
    zIndex: "1000",
  };

  const logoStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "white",
    textDecoration: "none",
  };

  const navLinksStyle = {
    listStyle: "none",
    display: "flex",
    gap: "15px",
    margin: "0",
    padding: "0",
  };

  const navLinkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    transition: "color 0.3s ease",
  };

  const navLinkHoverStyle = {
    color: "#1abc9c",
  };

  const navButtonStyle = {
    backgroundColor: "#1abc9c",
    border: "none",
    color: "white",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  };

  const navButtonHoverStyle = {
    backgroundColor: "#16a085",
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>
        Upstate Blog
      </Link>
      <ul style={navLinksStyle}>
        <li>
          <Link
            to="/"
            style={navLinkStyle}
            onMouseOver={(e) =>
              (e.target.style.color = navLinkHoverStyle.color)
            }
            onMouseOut={(e) => (e.target.style.color = navLinkStyle.color)}
          >
            All Posts
          </Link>
        </li>
        <li>
          <Link
            to="/create"
            style={navLinkStyle}
            onMouseOver={(e) =>
              (e.target.style.color = navLinkHoverStyle.color)
            }
            onMouseOut={(e) => (e.target.style.color = navLinkStyle.color)}
          >
            Create Post
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            style={navLinkStyle}
            onMouseOver={(e) =>
              (e.target.style.color = navLinkHoverStyle.color)
            }
            onMouseOut={(e) => (e.target.style.color = navLinkStyle.color)}
          >
            My Profile
          </Link>
        </li>
      </ul>
      <button
        style={navButtonStyle}
        onMouseOver={(e) =>
          (e.target.style.backgroundColor = navButtonHoverStyle.backgroundColor)
        }
        onMouseOut={(e) =>
          (e.target.style.backgroundColor = navButtonStyle.backgroundColor)
        }
      >
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
