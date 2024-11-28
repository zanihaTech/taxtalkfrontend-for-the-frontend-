import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Hero.css';

const Hero = () => {
  const images = [
    'https://via.placeholder.com/800x400?text=Slide+1',
    'https://via.placeholder.com/800x400?text=Slide+2',
    'https://via.placeholder.com/800x400?text=Slide+3',
  ];

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Welcome to TaxTalk.India</h1>
        <p>Your go-to resource for the latest insights on finance, taxes, and more.</p>
        <a href="#learn-more" className="cta-button">Learn More</a>
      </div>
      <div className="hero-carousel">
        <Carousel
          autoPlay
          infiniteLoop
          interval={5000}
          showThumbs={false}
          showStatus={false}
        >
          {images.map((src, index) => (
            <div key={index}>
              <img src={src} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Hero;
