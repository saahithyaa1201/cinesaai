import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ImgSlider = (props) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: dots => <ul>{dots}</ul>,
    customPaging: i => <button></button>
  };
  return (
    <SliderWrapper>
      <Carousel {...settings}>
        <Wrap>
          <a>
            <MediaContainer>
              <video src="/videos/slider1.mp4" autoPlay playsInline loop muted />
            </MediaContainer>
          </a>
        </Wrap>

        <Wrap>
          <a>
            <MediaContainer>
              <video src="/videos/slider2.mp4" autoPlay playsInline loop muted />
            </MediaContainer>
          </a>
        </Wrap>

        <Wrap>
          <a>
            <MediaContainer>
              <video src="/videos/slider3.mp4" autoPlay playsInline loop muted />
            </MediaContainer>
          </a>
        </Wrap>

        <Wrap>
          <a>
            <MediaContainer>
              <video src="/videos/slider4.mp4" autoPlay playsInline loop muted />
            </MediaContainer>
          </a>
        </Wrap>
        
        <Wrap>
          <a>
            <MediaContainer>
              <video src="/videos/slider5.mp4" autoPlay playsInline loop muted />
            </MediaContainer>
          </a>
        </Wrap>
      </Carousel>
    </SliderWrapper>
  );
};

// This wrapper controls the overall width of the slider
const SliderWrapper = styled.div`
  max-width: 40%;  // Adjust this percentage to control overall width
  margin: 0 auto;  // Centers the slider
`;

const MediaContainer = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  position: relative;
  
  video, img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Carousel = styled(Slider)`
  margin-top: 20px;

  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  li.slick-active button:before {
    color: white;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -40px;  // Adjusted to be closer to the slider
  }

  .slick-next {
    right: -40px;  // Adjusted to be closer to the slider
  }
`;

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  a {
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;
    background-color: #000;

    &:hover {
      padding: 0;
      border: 4px solid rgba(249, 249, 249, 0.8);
      transition-duration: 300ms;
    }
  }
`;

export default ImgSlider;