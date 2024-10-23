import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

const Slideshow = ({ images }) => {
  return (
    <Carousel
      className="custom-carousel"
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={3000}
    >
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={image.src}
            alt={image.alt || `Slide ${index + 1}`}
            height="400px"
          />
          {image.caption && <p className="legend">{image.caption}</p>}
        </div>
      ))}
    </Carousel>
  )
}

export default Slideshow
