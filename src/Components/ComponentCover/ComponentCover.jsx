import React from "react";
import { Link } from "react-router-dom";

export default function ComponentCover({ text, path, secPath }) {
  return (
    <>
      <div className="background-color p-5">
        <div className="container">
          <h3 className="fw-bold">{text}</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item text-black">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item main-color" aria-current="page">
                {path}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </>
  );
}
