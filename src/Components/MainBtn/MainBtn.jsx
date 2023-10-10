import React from "react";
import style from "./main-btn.module.css";

export default function MainBtn({ text, width, type, fun, id }) {
  return (
    <>
      <button
        type={type}
        className={`btn ${style.mainBtn} ${width} d-flex justify-content-center align-items-center`}
        onClick={() => {
          if (fun && id) {
            fun(id);
          } else {
            if (fun) {
              fun();
            }
          }
        }}
      >
        {text}
      </button>
    </>
  );
}
