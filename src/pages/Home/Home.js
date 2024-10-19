import React, { useState } from 'react';
import HomeLabel1 from '../../components/HomeLabel/HomeLabel1'; // Assuming you have separate files for these components
import HomeLabel2 from '../../components/HomeLabel/HomeLabel2';
import homeModuleCss from './Home.module.css';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import AppNavbar from '../../components/AppNavbar/AppNavbar';

const Home = () => {
  const [activeLabel, setActiveLabel] = useState(0); // Not needed anymore for manual dot control

  const labels = [
    { component: <HomeLabel1 />, dotClass: "dot" },
    { component: <HomeLabel2 />, dotClass: "dot dot-dif-color" }
  ];

  return (
    <React.Fragment>
      <AppNavbar/>
    <div className={homeModuleCss.backgroundHome}>
      <Container>
        <Row>
          <Col lg={7} className=" d-lg-flex flex-column justify-content-center">
            <div className={`${homeModuleCss.speechBubble} z-index-1`}>

              {/* Bootstrap Carousel for sliding effect */}
              <Carousel activeIndex={activeLabel} onSelect={(index) => setActiveLabel(index)} indicators={false}>
                {labels.map((label, index) => (
                  <Carousel.Item key={index}>
                    {label.component}
                  </Carousel.Item>
                ))}
              </Carousel>

              <div className="d-flex">
                <div>
                  <a href="/registration1" className="btn-get-started buttonSeniorSize">
                    Get Started
                  </a>
                </div>
                <div className="ml-auto d-flex align-items-center">
                  {/* Carousel dot indicators */}
                  {labels.map((_, index) => (
                    <div
                      key={index}
                      className={index === activeLabel ? 'dot' : 'dot dot-dif-color'}
                      onClick={() => setActiveLabel(index)}
                      style={{ cursor: 'pointer', marginRight: '8px' }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </Col>

          {/* The image will also be hidden on small screens */}
          <Col lg={5} className="d-none d-lg-block z-index-0">
            <img src="./elderlies_with_dog.png" alt="elderly animation" className="elderly-img" />
          </Col>
        </Row>
      </Container>
    </div>
  </React.Fragment>
  );
};

export default Home;