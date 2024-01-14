import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import "swiper/css/navigation";
import next from "../../assets/next.png";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import { Link, useNavigate } from "react-router-dom";
import skip from "../../assets/skip.png";
import bus2 from "../../assets/bus2.png";

export default function App() {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiperInstance = swiperRef.current.swiper;
      if (currentSlide === swiperInstance.slides.length) {
        // Check if the current slide is the last one
        // Navigate to the next route when on the last slide
        navigate("/allLibrary");
      } else {
        // Go to the next slide if it's not the last slide
        swiperInstance.slideNext();
        setCurrentSlide((prevSlide) => prevSlide + 1);
      }
    }
  };

  return (
    <>
      <div className="flex z-0 justify-between">
        <Link to="/allLibrary">
          <img className="h-24" src={skip} alt="" />
        </Link>
        {/* <img className="relative h-24 mt-6 mr-6" src={bus2} alt="" /> */}
      </div>
      <Link to="/allLibrary">
        <p className="absolute top-10 z-40 left-10 text-lg text-white">Skip</p>
      </Link>

      <Swiper
        ref={swiperRef}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        // navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper relative"
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.activeIndex);
        }}
      >
        <SwiperSlide>
          <Page1 />
        </SwiperSlide>
        <SwiperSlide>
          <Page2 />
        </SwiperSlide>
        <SwiperSlide>
          <Page3 />
        </SwiperSlide>
      </Swiper>

      <p
        onClick={handleNextClick}
        className="absolute bottom-10 z-40 right-8 text-lg text-white"
      >
        Next
      </p>

      <div onClick={handleNextClick} className="absolute bottom-0 z-0 right-0">
        <img className="h-24" src={next} alt="" />
      </div>
    </>
  );
}
