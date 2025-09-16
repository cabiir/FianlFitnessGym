import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useUser } from '../contexts/UserContext';

function LoginAdmin() {
  const { loginAdmin } = useUser(); // admin login function from your context
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    navigate('/seller'); // stay on the same page while processing

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const success = loginAdmin({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (success) {
        navigate('/seller'); // redirect to admin dashboard
      } else {
        setError('Invalid name, email, or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen mt-32 bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4 py-8">
        <div className={`max-w-4xl mx-auto w-full transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 max-w-md mx-auto animate-slide-in-right">
            {/* Header */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-block mb-6">
                <span className="text-3xl font-bold font-serif text-primaryDarkGreen">
                  Fitness<span className="text-gray-800">TM</span>
                </span>
              </Link>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
              <p className="text-gray-600">Sign in to access your admin dashboard</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent transition-all duration-300"
                  placeholder="Enter your name"
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
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 bg-primaryDarkGreen text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isLoading ? 'animate-pulse' : ''
                }`}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="text-center mt-6">
              <Link to="/" className="text-primaryDarkGreen font-semibold hover:text-primaryDarkGreen2 transition-colors duration-300">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginAdmin;
