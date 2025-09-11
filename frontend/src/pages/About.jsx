import { useState, useEffect } from 'react';
import Header from "../components/Header";

function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Team members data
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
      bio: "10+ years of experience in fitness training and nutrition planning."
    },
    {
      name: "Michael Chen",
      role: "Head Trainer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      bio: "Specialized in strength training and athletic performance."
    },
    {
      name: "Elena Rodriguez",
      role: "Nutrition Specialist",
      image: "https://images.unsplash.com/photo-1551836026-d5c8c5ab235e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      bio: "Registered dietitian with a passion for holistic wellness."
    },
    {
      name: "David Kim",
      role: "Yoga Instructor",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      bio: "Bringing mindfulness and flexibility to your fitness journey."
    }
  ];

  // Stats data
  const stats = [
    { number: "10,000+", label: "Active Members" },
    { number: "15", label: "Years Experience" },
    { number: "50+", label: "Certified Trainers" },
    { number: "24/7", label: "Support" }
  ];

  // Values data
  const values = [
    {
      title: "Community",
      description: "We believe in the power of community to motivate and inspire lasting change.",
      icon: "👥"
    },
    {
      title: "Innovation",
      description: "We continuously evolve our methods with the latest fitness research and technology.",
      icon: "💡"
    },
    {
      title: "Wellness",
      description: "True fitness encompasses mind, body, and spirit - we nurture all three.",
      icon: "🌿"
    },
    {
      title: "Results",
      description: "We're committed to helping you achieve measurable, sustainable results.",
      icon: "🎯"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className={`pt-32 pb-20 px-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Story of Passion for Fitness</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At FitnessTM, we've been transforming lives through personalized fitness solutions for over 15 years. 
              Our journey began with a simple belief: everyone deserves to feel strong, confident, and healthy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Fitness Team" 
                className="rounded-3xl shadow-2xl w-full"
              />
            </div>
            <div className="animate-slide-in-right">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">From Small Studio to Fitness Community</h2>
              <p className="text-gray-600 mb-4">
                What started as a small local gym in 2008 has grown into a comprehensive wellness platform serving 
                thousands of members worldwide. Our founder, Sarah Johnson, began with just three clients in her 
                garage, driven by a vision to make professional fitness guidance accessible to everyone.
              </p>
              <p className="text-gray-600 mb-4">
                Today, we combine cutting-edge technology with proven training methodologies to deliver personalized 
                experiences that get results. Our team of certified trainers, nutritionists, and wellness experts 
                are dedicated to helping you achieve your goals.
              </p>
              <div className="bg-primaryDarkGreen text-white p-4 rounded-2xl mt-8 transform transition-transform hover:scale-105 duration-300">
                <p className="font-semibold">"Our mission is to empower people to transform their lives through fitness, one workout at a time."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do, from designing workout plans to supporting our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-8 rounded-3xl shadow-lg transform transition-transform hover:-translate-y-2 duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20  px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our certified professionals bring years of experience and passion to help you achieve your fitness goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-3xl overflow-hidden shadow-lg transform transition-transform hover:-translate-y-2 duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-primaryDarkGreen font-semibold mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primaryDarkGreen text-white px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Impact in Numbers</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              The results speak for themselves - we're proud of what our community has achieved together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-white bg-opacity-10 rounded-3xl backdrop-blur-sm transform transition-transform hover:scale-105 duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-xl opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">Ready to Begin Your Fitness Journey?</h3>
            <button className="bg-white text-primaryDarkGreen font-semibold py-3 px-8 rounded-xl transform transition-transform hover:scale-105 duration-300">
              Join Our Community Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;