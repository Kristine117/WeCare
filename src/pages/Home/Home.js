import React, { useState } from 'react';
import HomeLabel1 from '../../components/HomeLabel/HomeLabel1'; // Assuming you have separate files for these components
import HomeLabel2 from '../../components/HomeLabel/HomeLabel2';
import homeModuleCss from './Home.module.css';

const Home = () => {
  const [activeLabel, setActiveLabel] = useState(0); // 0 for HomeLabel1, 1 for HomeLabel2
  const [slideDirection, setSlideDirection] = useState(''); // Track the slide direction

  const labels = [
    { component: <HomeLabel1 />, dotClass: "dot" },
    { component: <HomeLabel2 />, dotClass: "dot dot-dif-color" }
  ];

  const handleDotClick = (index) => {
    if (index !== activeLabel) {
        setSlideDirection(index > activeLabel ? homeModuleCss['slide-left'] : homeModuleCss['slide-right']); // Set the slide direction
        setActiveLabel(index);
    }
  };

  return (
    <>
      <div className="backgroundHome display-none-smartphone">
        <div className='container'>
          <div className="row">
            <div className='col-lg-7 d-none d-lg-flex flex-column justify-content-center'>
              <div className="speech-bubble z-index-1">

                {/* Wrapper for sliding effect */}
                <div className={`${homeModuleCss.slider} ${slideDirection}`}>
                  {labels[activeLabel].component}
                </div>

                <div className="d-flex">
                  <div>
                    <a href="/registration1" type="submit" className="btn-get-started">Get Started</a>
                  </div>
                  <div className="ml-auto d-flex align-items-center">
                    {/* Carousel dot indicators */}
                    {labels.map((_, index) => (
                      <div
                        key={index}
                        className={index === activeLabel ? 'dot' : 'dot dot-dif-color'}
                        onClick={() => handleDotClick(index)}
                        style={{ cursor: 'pointer', marginRight: '8px' }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* The image will also be hidden on small screens */}
            <div className="col-lg-5 d-none d-lg-block z-index-0">
              <img src="./elderlies_with_dog.png" alt="elderly animation" className="elderly-img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
