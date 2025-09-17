import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useUser } from '../contexts/UserContext';

function Login() {
  const { loginUser } = useUser();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
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
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const success = loginUser({ email: formData.email, password: formData.password });
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const socialLogins = [
    { name: 'Google', icon: 'G', color: 'bg-red-500 hover:bg-red-600' },
    { name: 'Facebook', icon: 'f', color: 'bg-blue-600 hover:bg-blue-700' },
    { name: 'Apple', icon: 'A', color: 'bg-black hover:bg-gray-800' }
  ];

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="min-h-screen mt-32 bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4 py-8">
        <div className={`max-w-6xl mx-auto w-full transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Illustration/Image */}
            <div className="hidden lg:block animate-slide-in-left">
              <div className="relative">
                <img
                  src="https://framerusercontent.com/images/JBluH5Q890rjoCxmMNJDCsMog.png?scale-down-to=2048"
                  alt="Wellness Illustration"
                  className="w-full max-w-md mx-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute -bottom-6 -left-6 bg-primaryDarkGreen text-white p-6 rounded-2xl shadow-xl animate-float-gentle">
                  <div className="text-3xl font-bold">2K+</div>
                  <div className="text-sm">Happy Members</div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl animate-float-gentle" style={{ animationDelay: '0.5s' }}>
                  <div className="text-primaryDarkGreen font-semibold">Join our community</div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="animate-slide-in-right">
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                  <Link to="/" className="inline-block mb-6">
                    <span className="text-3xl font-bold font-serif text-primaryDarkGreen">
                      Fitness<span className="text-gray-800">TM</span>
                    </span>
                  </Link>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                  <p className="text-gray-600">Sign in to continue your wellness journey</p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
                    {error}
                  </div>
                )}

                {/* Social Login Buttons */}
                <div className="mb-8">
                  <div className="grid grid-cols-3 gap-3">
                    {socialLogins.map((social, index) => (
                      <button
                        key={index}
                        className={`${social.color} text-white p-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105`}
                      >
                        {social.icon}
                      </button>
                    ))}
                  </div>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                    </div>
                  </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent transition-all duration-300 form-input"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent transition-all duration-300 form-input"
                      placeholder="Enter your password"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-primaryDarkGreen focus:ring-primaryDarkGreen border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="text-sm text-primaryDarkGreen hover:text-primaryDarkGreen2 transition-colors duration-300">
                      Forgot password?
                    </Link>
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
                        Signing in...
                      </span>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </form>

                {/* Sign Up Link */}
                <div className="text-center mt-8">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signIn" className="text-primaryDarkGreen font-semibold hover:text-primaryDarkGreen2 transition-colors duration-300">
                      Sign up
                    </Link>
                  </p>
                </div>
                {/* Admin Link */}
                  <div className="text-center mt-8">
                  <p className="text-gray-600">
                    Admin Sing Here?{' '}
                    <Link to="/Admin" className="text-primaryDarkGreen font-semibold hover:text-primaryDarkGreen2 transition-colors duration-300">
                      Admin
                    </Link>
                  </p>
                </div>

                {/* Additional Features */}
                <div className="mt-8 p-4 bg-gray-50 rounded-xl animate-fade-in-scale">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">New to FitnessTM?</h3>
                  <p className="text-xs text-gray-600">
                    Join our community and get access to personalized workouts, nutrition plans, and wellness tracking.
                  </p>
                  <Link to="/signIn" className="inline-block mt-3 text-xs text-primaryDarkGreen font-semibold hover:underline">
                    Learn more →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Illustration (hidden on larger screens) */}
          <div className="lg:hidden mt-12 text-center animate-scale-in">
            <img
              src="https://framerusercontent.com/images/JBluH5Q890rjoCxmMNJDCsMog.png?scale-down-to=2048"
              alt="Wellness Illustration"
              className="w-full max-w-sm mx-auto rounded-3xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;