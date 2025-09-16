import { useState, useEffect } from 'react';
import Header from "../components/Header";
import Footer from '../components/Footer';

function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }, 2000);
  };

  // Contact methods data
  const contactMethods = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      ),
      title: "Email Us",
      details: "support@fitnesstm.com",
      description: "Send us an email anytime",
      buttonText: "Send Message",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
        </svg>
      ),
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm",
      buttonText: "Call Now",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      ),
      title: "Visit Us",
      details: "123 Fitness Street, Health City",
      description: "Come say hello at our office",
      buttonText: "Get Directions",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  // FAQ data
  const faqItems = [
    {
      question: "How quickly do you respond to inquiries?",
      answer: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, calling us directly is recommended."
    },
    {
      question: "Do you offer personal training consultations?",
      answer: "Yes, we offer free initial consultations to understand your fitness goals and recommend the best approach for you."
    },
    {
      question: "Can I schedule a gym tour?",
      answer: "Absolutely! We'd love to show you around our facilities. Contact us to schedule a convenient time for your tour."
    },
    {
      question: "What are your customer service hours?",
      answer: "Our customer service team is available Monday to Friday, 8am to 8pm, and Saturdays from 9am to 4pm."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className={`pt-32 pb-16 px-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our programs, facilities, or services? We're here to help you on your fitness journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-6 shadow-xl transform transition-transform hover:-translate-y-2 duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 ${method.color} rounded-2xl flex items-center justify-center mb-6`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <p className="text-lg font-semibold text-gray-800 mb-6">{method.details}</p>
                <button className="w-full py-3 bg-primaryDarkGreen text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  {method.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Send Us a Message</h2>
            <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
          </div>
          
          <div className="bg-gray-50 rounded-3xl p-8 md:p-10 shadow-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {isSubmitted ? (
              <div className="text-center py-8 animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent transition-all duration-300"
                      placeholder="Your email address"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent transition-all duration-300"
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent transition-all duration-300"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 px-6 bg-primaryDarkGreen text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isLoading ? 'animate-pulse' : ''
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-gray-50 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to common questions about our services and support.</p>
          </div>
          
          <div className="space-y-6">
            {faqItems.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-6 shadow-lg transform transition-transform hover:-translate-y-1 duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Visit Our Location</h2>
            <p className="text-gray-600">Come see our state-of-the-art facilities in person.</p>
          </div>
          
          <div className="bg-gray-200 rounded-3xl overflow-hidden shadow-xl h-96 animate-fade-in">
            {/* Placeholder for map - in a real application, you would use a map library like Google Maps */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primaryDarkGreen to-primaryDarkGreen2">
              <div className="text-center text-white p-8">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <h3 className="text-2xl font-bold mb-2">FitnessTM Headquarters</h3>
                <p className="text-lg opacity-90">123 Fitness Street, Health City, HC 12345</p>
                <button className="mt-6 bg-white text-primaryDarkGreen font-semibold py-2 px-6 rounded-xl transform transition-transform hover:scale-105 duration-300">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div>
        <Footer
        />
      </div>
    </div>
  );
}

export default Contact;