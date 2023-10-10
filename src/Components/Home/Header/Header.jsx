import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import header from "../../../Assets/header.jpg";
import style from "./header.module.css";
import MainBtn from "../../MainBtn/MainBtn";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className={`position-relative `}>
        <div className="container">
          <div className="row my-4 s justify-content-center align-items-center">
            <div className="col-md-6">
              <div className={`intro w-100`}>
                <p className={`${style.mainColor}`}>Best shop ever</p>
                <h1 className="fw-bold">New collection 2023</h1>
                <p className="text-muted">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                  laboriosam error, voluptatum repellat in ducimus?
                </p>
                <Link to="/products">
                  <MainBtn text={"Shop now"} />
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <LazyLoadImage src={header} className="w-100 img-fluid" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
