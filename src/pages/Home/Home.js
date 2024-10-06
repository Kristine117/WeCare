export default function Home(){

    return (
        <>
        <div className="backgroundHome display-none-smartphone">
            <div className='container'>
                <div className="row">
                    {/* This section will only show on large screens and above */}
                    <div className='col-lg-7 d-none d-lg-flex flex-column justify-content-center'>
                        <div className="speech-bubble z-index-1">
                            <div>
                                <h1 className="text-blue font-weight-bold h1-font-size mb-3">WeCare</h1>
                            </div>
                            <div>
                                <h3 className="text-blue mb-4">for those who cared for us</h3>
                            </div>





                            <div className="d-flex">
 
                                <div>                                    
                                <a href="/registration1" type="submit" className="btn-get-started btn-custom-size">Get Started</a>
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

        
            <div className="small-d-flex small-justify-center display-none-laptop-screen backgroundHome align-items-center">
                        <div className="mt-5">
                            <img src="./wecare_logo_smartphone.png" alt="We Care" width="300px" height="auto" />
                            <h1 className='mt-5 font-blue-color text-start smart-phone-h1-weight smart-phone-h1-size'>WeCare</h1>
                        </div>
                        <p className="font-blue-color smart-phone-p-size text-start">For those who cared for us</p>
                        <div className="loader">
                          <div className="dot"></div>
                            <div className="dot"></div>
                        </div>

                        <button type="submit" className="btn btn-login smart-phone-btn-size d-flex align-items-center justify-content-center ">Get Started</button>
            </div>
            </>
    )
}