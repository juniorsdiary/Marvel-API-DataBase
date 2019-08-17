module.exports = {
  dots: true,
  speed: 500,
  arrows: false,
  slidesToShow: 4,
  slidesToScroll: 4,
  infinite: true,
  rows: 1,
  draggable: true,
  slide: 'span',
  responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 560,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

// $break_lg: 1100px;
// $break_md: 960px;
// $break_sm: 780px;
// $break_xs: 560px;
