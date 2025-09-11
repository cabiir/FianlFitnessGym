import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    setEmail('');
  };

  const socialLinks = [
    { name: 'Facebook', icon: '🎯', url: '#' },
    { name: 'Instagram', icon: '📸', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'YouTube', icon: '📺', url: '#' }
  ];

  const quickLinks = [
    { name: 'About Us', url: '/about' },
    { name: 'Trainers', url: '/trainers' },
    { name: 'Blog', url: '/blog' },
    { name: 'Plans', url: '/plans' },
    { name: 'Contact', url: '/contact' }
  ];

  const services = [
    { name: 'Yoga Classes', url: '/services/yoga' },
    { name: 'Fitness Training', url: '/services/fitness' },
    { name: 'Wellness Workshops', url: '/services/wellness' },
    { name: 'Personal Coaching', url: '/services/coaching' }
  ];

  return (
    <footer className={`bg-gray-900 text-white transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Main Footer Content */}
      <div className="px-5 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Brand Column */}
            <div className="animate-float-up delay-100">
              <Link to="/" className="inline-block mb-6">
                <span className="text-2xl md:text-3xl font-bold font-serif italic text-secondaryBeige">
                  Fitness
                </span>
              </Link>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Transform your body and mind with our comprehensive wellness programs. Join our community and start your journey today.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-10 h-10 bg-primaryDarkGreen rounded-full flex items-center justify-center text-lg hover:bg-primaryDarkGreen2 hover:scale-110 transition-all duration-300 transform hover:-translate-y-1"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="animate-float-up delay-200">
              <h3 className="text-lg font-semibold mb-6 text-secondaryBeige">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.url}
                      className="text-gray-400 hover:text-white transition-all duration-300 transform hover:translate-x-2 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="animate-float-up delay-300">
              <h3 className="text-lg font-semibold mb-6 text-secondaryBeige">Our Services</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      to={service.url}
                      className="text-gray-400 hover:text-white transition-all duration-300 transform hover:translate-x-2 inline-block"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="animate-float-up delay-400">
              <h3 className="text-lg font-semibold mb-6 text-secondaryBeige">Stay Updated</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for the latest updates and wellness tips.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-primaryDarkGreen text-white py-3 px-6 rounded-lg font-semibold hover:bg-primaryDarkGreen2 transition-all duration-300 transform hover:scale-105"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 my-8 md:my-12"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm animate-float-up delay-500">
              © 2024 FitnessTM. All rights reserved.
            </p>
            
            <div className="flex space-x-6 animate-float-up delay-600">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-primaryDarkGreen text-white rounded-full shadow-lg hover:bg-primaryDarkGreen2 hover:scale-110 transition-all duration-300 animate-bounce"
        aria-label="Back to top"
      >
        ↑
      </button>
    </footer>
  );
}

export default Footer;