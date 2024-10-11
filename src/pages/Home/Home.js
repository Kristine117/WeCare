import HomeLabel1 from '../../components/HomeLabel/HomeLabel1';
import HomeLabel2 from '../../components/HomeLabel/HomeLabel2';


const Home = () => {
    return ( 
        <>
        <div className="backgroundHome display-none-smartphone">
            <div className='container'>
                <div className="row">
                    <div className='col-lg-7 d-none d-lg-flex flex-column justify-content-center'>
                        <div className="speech-bubble z-index-1">

                        <HomeLabel1 />
                        <div className="d-flex">
                            <div>                                    
                            <a href="/registration1" type="submit" className="btn-get-started">Get Started</a>
                            </div>
                            <div className="ml-auto">
                                <div className="dot"></div>
                                <a href="/welcome">
                                <div className="dot dot-dif-color"></div>
                                </a>
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
}
 
export default Home;