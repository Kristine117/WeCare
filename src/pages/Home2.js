export default function Home2(){
    return(
        <>
    <div className="backgroundHome d-none d-lg-block">
        <div className='container'>
            <div className="row">
                <div className='col-7 d-flex flex-column justify-content-center'>
                    <div className="speech-bubble">
                        <div>
                            <h3 className="text-blue mb-4">Secure your family with</h3>
                        </div>
                        <div>
                            <h1 className="text-blue font-weight-bold h1-font-size mb-3">WeCare</h1>
                        </div>



                        <div className="d-flex">
 
                        <div>                                    
                            <a href="/registration1" type="submit" className="btn-get-started btn-custom-size">Get Started</a>
                        </div>

                        <div className="ml-auto">
                            
                            <a href="/">
                                <div className="dot dot-dif-color"></div>
                            </a>
                            <div className="dot"></div>
                        </div>

                        </div>

                    </div>
                </div>
                <div className="col-5">
                    <img src="./elderlies_with_dog.png" alt="elderly animation" className="elderly-img" />
                </div>
            </div>
        </div>
    </div>


    <div className="small-d-flex small-justify-center display-none-laptop-screen backgroundHome align-items-center">
            <div className="mt-5">
                    <img src="./wecare_logo_smartphone.png" alt="We Care" width="300px" height="auto" />
                    <p className="mt-5 font-blue-color smart-phone-p-size text-start">Secure your
                family with</p>
                
                <h1 className=' font-blue-color  smart-phone-h1-weight smart-phone-h1-size text-start'>WeCare</h1>
                </div>
                <div class="loader">
                    <div class="dot"></div>
                    <div class="dot"></div>
            </div>

                <button type="submit" className="btn btn-login smart-phone-btn-size d-flex align-items-center justify-content-center">Get Started</button>
    </div>
    </>

    )
}