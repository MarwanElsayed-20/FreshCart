import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../Assets/freshcart-logo.svg";
import style from "./navbar.module.css";
import { TokenContext } from "../../Context/TokenContext";
import { Avatar } from "@mui/material";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishlistContext";

export default function NavBar() {
  let { setLogin, setUserName, login, userName } = useContext(TokenContext);
  const { cartNum } = useContext(CartContext);
  const { wishListNum } = useContext(WishListContext);

  let navigate = useNavigate();

  let logOut = () => {
    setLogin(null);
    setUserName(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("product");
    window.location.reload();
    navigate("/");
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 0,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
      color: "#eaebed",
      backgroundColor: "#dc3545",
    },
  }));

  return (
    <>
      <div className="sub-nav main-bg-color w-100 p-1">
        <div className="container d-flex justify-content-between align-items-center">
          <ul className="navbar-nav ms-0 mt-2 mt-lg-0 d-flex align-items-center justify-content-center">
            <li className="nav-item d-flex align-items-center justify-content-center">
              <a href="httbs://www.instagram.com">
                <i className="fa-brands fa-instagram fa-sm me-3"></i>
              </a>
              <a
                href="httbs://www.facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-facebook fa-sm me-3"></i>
              </a>
              <a href="httbs://www.tiktok.com" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-tiktok fa-sm me-3"></i>
              </a>
              <a
                href="httbs://www.twitter.com"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-twitter fa-sm me-3"></i>
              </a>
              <a
                href="httbs://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-linkedin fa-sm me-3"></i>
              </a>
              <a
                href="httbs://www.youtube.com"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-youtube fa-sm me-3"></i>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav d-flex align-items-center justify-content-center flex-row">
            {login ? (
              <>
                <li className="me-4">
                  <Link to="/wishlist">
                    <StyledBadge badgeContent={wishListNum} color="secondary">
                      <i className="ms-2 fa-solid fa-heart"></i>
                    </StyledBadge>
                  </Link>
                </li>
                <li className="me-4">
                  <Link to="/cart">
                    <StyledBadge badgeContent={cartNum} color="secondary">
                      <i className="fa-solid fa-cart-shopping"></i>
                    </StyledBadge>
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className={`btn dropdown-toggle ${style.signOutColor}`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className={`fa-solid fa-user ${style.signOutColor}`}></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-dark text-center rounded-0 main-bg-color border-0 py-3 px-3">
                    <li className="text-center w-25 m-auto py-3">
                      <Avatar>
                        <p className="text-capitalize m-0">
                          {userName ? userName.slice(0, 1) : ""}
                        </p>
                      </Avatar>
                    </li>
                    <li>
                      <p className="border-bottom">
                        Hello{" "}
                        <span className="text-capitalize">
                          {userName ? userName : ""}
                        </span>
                      </p>
                    </li>
                    <Link to="/allOrders" className="menu-item">
                      <li className="mb-3 p-1 cursor-pointer text-start menu-item">
                        <p className="m-0">Your Orders?</p>
                      </li>
                    </Link>
                    <Link to="/changePassword" className="menu-item">
                      <li className="mb-3 p-1 cursor-pointer text-start menu-item">
                        <p className="m-0">Change your password?</p>
                      </li>
                    </Link>
                    <Link to="/updateInformation" className="menu-item">
                      <li className="mb-3 p-1 cursor-pointer text-start menu-item">
                        <p className="m-0">Update your details?</p>
                      </li>
                    </Link>
                    <li
                      className={`mt-3 p-1 menu-item text-start cursor-pointer ${style.signOutColor}`}
                      onClick={() => {
                        logOut();
                      }}
                    >
                      <p className="m-0">
                        Sign out?
                        <i
                          className={`fa-solid fa-right-from-bracket ms-2 `}
                        ></i>
                      </p>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="me">
                <Link to="/login">
                  Login <i className="fa-regular fa-user"></i>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <LazyLoadImage src={logo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={`nav-link ${style.color}`} to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={`nav-link ${style.color}`} to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={`nav-link ${style.color}`} to="/categories">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link pe-0 ${style.color}`}
                  to="/brands"
                >
                  Brands
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
