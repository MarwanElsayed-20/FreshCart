import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Slider from "react-slick";
import style from "./categories-slider.module.css";
import { CategoriesContext } from "../../../Context/CategoriesContext";
import Loading from "../../Loading/Loading";

export default function CategoriesSlider() {
  let { data, isLoading } = useContext(CategoriesContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    arrows: false,
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="my-5 text-center">
          <h2 className={`${style.titleColor} py-4`}>Top categories</h2>
          <Slider {...settings}>
            {data?.data.data.map((cat) => (
              <LazyLoadImage
                src={cat.image}
                key={cat._id}
                className={`cursor-pointer ${style.catImg} px-3`}
              />
            ))}
          </Slider>
        </div>
      )}
    </>
  );
}
