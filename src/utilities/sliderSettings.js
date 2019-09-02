import React from 'react';
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from 'react-icons/io';
import { arrowWithCustomWrapper } from 'Components/hocs';

const CustomNextSlider = arrowWithCustomWrapper(IoIosArrowDroprightCircle);
const CustomPrevSlider = arrowWithCustomWrapper(IoIosArrowDropleftCircle);

const settings = {
  dots: false,
  speed: 500,
  arrows: true,
  draggable: false,
  slidesToShow: 4,
  slidesToScroll: 4,
  infinite: true,
  nextArrow: <CustomNextSlider />,
  prevArrow: <CustomPrevSlider />,
  responsive: [
    {
      breakpoint: 1100,
      settings: {
        arrows: false,
        draggable: true,
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 780,
      settings: {
        arrows: false,
        draggable: true,
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 560,
      settings: {
        arrows: false,
        draggable: true,
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};
export default settings;
