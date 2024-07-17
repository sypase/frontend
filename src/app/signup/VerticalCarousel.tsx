import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const VerticalCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const carouselItems = [
    'Your Ultimate AI Companion for Paraphrasing',
    'Your Ultimate AI Companion for Humanizing',
    'Your Ultimate AI Companion for Plagiarism Checking',
  ];

  return (
    <Slider {...settings}>
      {carouselItems.map((item, index) => (
        <div key={index} className="text-4xl font-semibold text-center mb-6 text-gray-700 leading-relaxed font-italic">
          {item}
        </div>
      ))}
    </Slider>
  );
};

export default VerticalCarousel;