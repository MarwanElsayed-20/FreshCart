import React from "react";

export default function Loading() {
  return (
    <>
      <div className="position-absolute z-3 start-0 end-0 bottom-0 top-0 d-flex justify-content-center align-items-center bg-white overflow-hidden">
        <div className="spinner-border main-color" role="status"></div>
      </div>
    </>
  );
}
