// Header.js
import React from "react";
import { Link } from "react-router-dom";
import banner from "../Assets/Images/banner.jpg";

const Header = ({ cartQuantity }) => {
  return (
    <>
      <div className="container-fluid position-fixed">
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">Navbar</span>
            <form className="d-flex" role="search">
              <div className="">
                <button type="button" className="btn btn-primary position-relative me-4">
                  Add to Cart
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartQuantity}
                    <span className="visually-hidden">Add to Cart</span>
                  </span>
                </button>
                <button type="button" className="btn btn-primary position-relative me-4">
                  Favourite
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    99+
                    <span className="visually-hidden">Favourite</span>
                  </span>
                </button>
                <Link to="/" className="btn btn-primary">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </nav>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <img src={banner} alt="banner" width="100%" height="50%" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
