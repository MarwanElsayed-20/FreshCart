import React from "react";
import Header from "./Header/Header";
import CategoriesSlider from "./CategoriesSlider/CategoriesSlider";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      <div>
        <Header />
        <CategoriesSlider />
        <FeaturedProducts />
      </div>
    </>
  );
}
