import React from "react";
import Slider from "../components/Slider";
import ChoosingUs from "../components/ChoosingUs";
import Testimonial from "../components/Testimonial";
import LatestService from "../components/LatestService";

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <LatestService></LatestService>
      <ChoosingUs></ChoosingUs>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
