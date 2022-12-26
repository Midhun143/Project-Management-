import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import Carousel from 'react-bootstrap/Carousel';
const Home = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item style={{ height: '90vh' }}>
          <img
            className="d-block w-100"
            src="https://thumbs.dreamstime.com/b/business-people-corporate-communication-meeting-office-concept-51220918.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item style={{ height: '90vh' }}>
          <img
            className="d-block w-100"
            src="http://www.askonlinesolutions.com/wp-content/uploads/2016/06/Company.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item style={{ height: '90vh' }}>
          <img
            className="d-block w-100"
            src="https://i.pinimg.com/originals/8c/93/af/8c93af9ced70bbc7d196e7f86732bdf5.png"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;
