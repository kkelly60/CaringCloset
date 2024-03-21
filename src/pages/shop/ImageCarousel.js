// ImageCarousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Image URLs
const carouselImages = [
  'https://cdn.shopify.com/s/files/1/0031/2577/2073/files/BIRTH_x_TOP_1280x480.jpg?v=1676644986',
  'https://cdn.shopify.com/s/files/1/0031/2577/2073/files/Girls_x_TOP_1280x480.jpg?v=1676644988',
  'https://cdn.shopify.com/s/files/1/0031/2577/2073/files/BABY_x_TOP_1280x480.jpg?v=1676644989',
  // Add more image URLs as needed
];

const ImageCarousel = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...carouselSettings}>
      {carouselImages.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`carousel-${index}`} style={{ width: '100%', height: 'auto' }} />
        </div>
      ))}
    </Slider>
  );
};

export default ImageCarousel;
