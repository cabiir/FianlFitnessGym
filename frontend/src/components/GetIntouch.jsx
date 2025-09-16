import { useState, useEffect } from 'react';

function GetInTouch() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent successfully!');
      setFormData({ email: '', message: '' });
    }, 2000);
  };

  return (
    <section className={`px-5 md:px-8 lg:px-12 py-16 md:py-20   transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-16">
          {/* Text Content */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 animate-float-up">
              Get in<span className='font-playfair italic'>Touch.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed animate-float-up" style={{ animationDelay: '0.2s' }}>
              I want to help you overcome all mental and physical hurdles in your everyday life. 6 Years ago, I was electrocuted with 277 volts.
            </p>
            
            {/* Story Section */}
            <div className="bg-white p-6 rounded-2xl shadow-lg animate-float-up" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl font-semibold text-primaryDarkGreen mb-4">My Journey</h3>
              <p className="text-gray-700">
                After surviving that life-changing experience, I dedicated myself to helping others overcome their own challenges through fitness and mental wellness.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-1 animate-float-up" style={{ animationDelay: '0.6s' }}>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email (required)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Message (required)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell me about your journey and how I can help..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 bg-primaryDarkGreen text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:bg-primaryDarkGreen2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSubmitting ? 'animate-pulse' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send'
                )}
              </button>
            </form>

            {/* Additional Contact Info */}

          </div>
        </div>

        {/* Success Message (hidden by default) */}
        <div className="mt-12 text-center animate-float-up" style={{ animationDelay: '1s' }}>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 inline-block">
            <p className="text-green-800 font-medium">
              Thank you for your message! I'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GetInTouch;