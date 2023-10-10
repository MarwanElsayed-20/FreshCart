import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../../Assets/freshcart-logo.svg";
import MainBtn from "../MainBtn/MainBtn";

export default function Footer() {
  return (
    <>
      <footer className="background-color py-5">
        <div className="container">
          <h4>
            Get the <LazyLoadImage src={logo} alt="" /> app
          </h4>
          <p className="text-capitalize">
            we will send you a link, open it on your phone to download the app
          </p>
          <div className="row">
            <div className="col-md-10 my-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email.."
              />
            </div>
            <div className="col-md-2 my-3">
              {/* <button className="btn main-bg-color text-capitalize text-white w-100">
                
              </button> */}
              <MainBtn text={"share app link"}></MainBtn>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
