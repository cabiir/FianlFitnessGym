import { useEffect, useRef } from 'react';
import Header from "../components/Header";
import { Link } from 'react-router-dom';
import Reviews from '../components/Revewiers';
import Clearmind from '../components/Clearmind ';
import Bills from '../components/Bills';
import GetInTouch from '../components/GetIntouch';
import Footer from '../components/Footer';

function Home() {
  const statsRef = useRef(null);
  const servicesRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    // Observe all sections
    if (statsRef.current) observer.observe(statsRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (teamRef.current) observer.observe(teamRef.current);

    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
      if (servicesRef.current) observer.unobserve(servicesRef.current);
      if (teamRef.current) observer.unobserve(teamRef.current);
    };
  }, []);

  return (
    <>
    
<div className="pt-16 md:pt-20"> 
    <Header />
</div>

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-10 px-5 md:px-8 lg:px-12 mt-8">
        <div className="w-full lg:w-[500px] text-xl lg:text-2xl mt-5 lg:mt-10">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light">
            Transform
            <span className="font-playfair italic"> Your Body </span>
            and Mind
          </h1>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus, illo!
          </p>
          <br />
          <div className="flex flex-col sm:flex-row gap-5 mt-4">
          <Link to="/signIn">
            <button className="bg-primaryDarkGreen text-secondaryBeige px-8 py-3 rounded-full text-lg font-medium hover:bg-primaryDarkGreen2 transition-colors duration-300 transform hover:scale-105">
              Get Started
            </button>
          </Link>
          <Link to="/trainers">
            <button className="bg-secondaryBeige text-primaryDarkGreen px-8 py-3 border-2 bodder-black rounded-full text-lg font-medium hover:bg-white transition-colors duration-300 transform hover:scale-105">
              Our Trainers
            </button>
          </Link>

          </div>
        </div>

        <div className="w-full lg:w-auto mt-8 lg:mt-0">
          <img
            className="rounded-2xl w-full lg:w-[700px] animate-float"
            src="https://framerusercontent.com/images/JBluH5Q890rjoCxmMNJDCsMog.png?scale-down-to=2048"
            alt="Transform your body and mind"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div 
        ref={statsRef}
        className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-16 py-12 md:py-16 px-5 md:px-10 lg:px-14 mt-20 bg-primaryDarkGreen opacity-0 transition-opacity duration-700"
      >
        <div className="text-center text-secondaryBeige">
          <h3 className="text-3xl md:text-4xl font-bold animate-count-up">3.2k</h3>
          <p className="text-base md:text-lg mt-2">Workchampions</p>
        </div>
        <p className="text-4xl md:text-6xl text-secondaryBeige hidden md:block">|</p>
        <div className="text-center text-secondaryBeige">
          <h3 className="text-3xl md:text-4xl font-bold animate-count-up">1.8%</h3>
          <p className="text-base md:text-lg mt-2">Runner up champions</p>
        </div>
        <p className="text-4xl md:text-6xl text-secondaryBeige hidden md:block">|</p>
        <div className="text-center text-secondaryBeige">
          <h3 className="text-3xl md:text-4xl font-bold animate-count-up">4.5M</h3>
          <p className="text-base md:text-lg mt-2">Soil games participation</p>
        </div>
        <p className="text-lg md:text-xl text-secondaryBeige text-center md:text-left mt-6 md:mt-0">
          Once we receive your consult request we match you up with a new or. This is to ensure that your unique goals, needs, and personalities align.
        </p>
      </div>



      {/* Our Services Section */}
      <div 
        ref={servicesRef}
        className="px-3 md:px-5 py-10 max-w-6xl mx-auto opacity-0 transition-opacity duration-700"
      >
        <div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Our Services</h2>
            <p className="text-lg md:text-xl text-center text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto">
              Whether you're a beginner or an advanced practitioner, our offerings are designed to inspire and support you on your wellness journey.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Yoga Classes Card */}
          <div className="p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="mb-6 bg-[#F1F8F5] w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto md:mx-0">
              <img 
                src="https://framerusercontent.com/images/Sw2pkAEHWwqq1VbpcagxRk1J6w4.svg" 
                alt="Yoga Icon" 
                className="h-6 w-6 md:h-8 md:w-8"
              />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center md:text-left">Yoga Classes</h3>
            <p className="text-gray-600 mb-6 text-center md:text-left">
              Classes for all levels, from beginners to advanced. Enjoy various styles like Huma, Vinyssa, and Yin Yoga.
            </p>
            <a href="/yoga" className="text-primaryDarkGreen font-semibold hover:underline inline-flex items-center justify-center md:justify-start">
              View more 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          
          {/* Fitness Training Card */}
          <div className="p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="mb-6 bg-[#F1F8F5] w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto md:mx-0">
              <img 
                src="https://framerusercontent.com/images/Iwkws16NNtMPXkIvpkzdodWGvwY.svg" 
                alt="Fitness Icon" 
                className="h-6 w-6 md:h-8 md:w-8"
              />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center md:text-left">Fitness Training</h3>
            <p className="text-gray-600 mb-6 text-center md:text-left">
              Our expert training offer customized workload and ongoing support for weight loss, muscle building, and improved health.
            </p>
            <a href="/trainers" className="text-primaryDarkGreen font-semibold hover:underline inline-flex items-center justify-center md:justify-start">
              View more 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        
      </div>



      {/* Team Section */}
      <div 
        ref={teamRef}
        className="px-5 py-10 md:py-16 max-w-6xl mx-auto opacity-0 transition-opacity duration-700"
      >
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primaryDarkGreen text-xl md:text-2xl">Our team</p>
          <h2 className="text-4xl md:text-6xl font-playfair mb-6">Meet Our Team</h2>
        </div>

        <div className="bg-primaryDarkGreen w-full rounded-3xl px-6 md:px-10 pt-8 pb-10 md:pt-10 md:pb-12 transition-all duration-500 hover:shadow-xl">
          <p className="text-xl md:text-2xl text-white">Join the team</p>
          <h3 className="mt-4 md:mt-5 text-2xl md:text-3xl lg:text-4xl text-white">Personalized Coaching</h3>
          <p className="mt-4 md:mt-5 text-lg md:text-xl text-white">
            One-on-one sessions with our fitness and yoga experts. Get personalized guidance and encouragement to reach your specific goals.
          </p>
          <br />
          <Link to="/trainers">
            <button className="bg-secondaryBeige text-primaryDarkGreen px-6 md:px-8 py-3 rounded-full text-lg font-medium hover:bg-white transition-colors duration-300 transform hover:scale-105">
              Our trainers
            </button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {/* Clare Barrford */}
          <div className="text-center transition-transform duration-500 hover:scale-105">
            <img 
              src="https://framerusercontent.com/images/smEt8aujk0lNpCG38Kv3pAcGbTY.png" 
              alt="Clare Barrford" 
              className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-2xl mb-6"
            />
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-semibold">Clare Barrford</h4>
              <a href="#" className="text-primaryDarkGreen font-semibold hover:underline inline-flex items-center">
                More →
              </a>
            </div>
          </div>

          {/* Alicia Regis */}
          <div className="text-center transition-transform duration-500 hover:scale-105">
            <img 
              src="https://framerusercontent.com/images/V4XRjS9m0H8S7kIZ7njL09JqU5s.png" 
              alt="Alicia Regis" 
              className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-2xl mb-6"
            />
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-semibold">Alicia Regis</h4>
              <a href="#" className="text-primaryDarkGreen font-semibold hover:underline inline-flex items-center">
                More →
              </a>
            </div>
          </div>

          {/* Keith Finley */}
          <div className="text-center transition-transform duration-500 hover:scale-105">
            <img 
              src="https://framerusercontent.com/images/UwLep5loEiSZvOhp2cfGolopR0.png" 
              alt="Keith Finley" 
              className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-2xl mb-6"
            />
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-semibold">Keith Finley</h4>
              <a href="#" className="text-primaryDarkGreen font-semibold hover:underline inline-flex items-center">
                More →
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 mb-10">
          <Link to="/trainers"><button className="bg-primaryDarkGreen text-secondaryBeige px-8 py-3 rounded-full text-lg font-medium hover:bg-primaryDarkGreen2 transition-colors duration-300 transform hover:scale-105">
            Our trainers
          </button></Link>
        </div>
        <Reviews />
        <div className='mt-10'>
            <Clearmind />
        </div>

        <div className='mt-10'>
            <Bills />
        </div>
        <div className='mt-10'>
            <GetInTouch />
        </div>

      </div>
              <Footer />
    </>
  )
}

export default Home;