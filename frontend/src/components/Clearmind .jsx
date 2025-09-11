import { useState, useEffect } from 'react';

function Clearmind() {
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);


  return (
    <section className={`px-5 md:px-8 lg:px-12 py-16 md:py-20  bg-white  border-2 border-yellow rounded-xl transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex ">
          {/* Text Content */}
      <div className='flex justify-between'>
        <div className="flex-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl  text-gray-800 mb-6">
              Clearmind <span className='font-playfair italic'>your partner</span> in mental wellness.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Find and book your favorite yoga classes from anywhere with our yoga app.
            </p>
            
            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                Download on the App Store
              </button>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
                Get it on Play Store
              </button>
            </div>
          </div>
           {/* Image */}
          
            <img
              src="https://framerusercontent.com/images/uVCrc6lSnXur7MGvUoBLJHZcfl0.png?scale-down-to=1024"
              alt="Clearmind App"
              className='w-[400px] h- [40px]'
              
            />
          

      </div>

         
        </div>


   
      </div>
    </section>
  );
}

export default Clearmind;