import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useUser } from "../contexts/UserContext";

function SignUp() {
  const { registerUser, users } = useUser();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email required";
    
    // Check if email already exists
    if (users.some(user => user.email === formData.email)) {
      newErrors.email = "Email already registered";
    }
    
    if (formData.password.length < 6) newErrors.password = "Min 6 chars";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords must match";
    if (!agreeToTerms) newErrors.agree = "Agree to terms required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    // Register the user
    const userData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password
    };

    const success = registerUser(userData);
    
    if (success) {
      setTimeout(() => {
        setIsLoading(false);
        navigate("/dashboard");
      }, 1000);
    } else {
      setErrors({ email: "Email already registered" });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen mt-32 bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4 py-8">
        <div className={`max-w-6xl mx-auto w-full transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side Illustration */}
            <div className="hidden lg:block animate-slide-in-left">
              <div className="relative">
                <img
                  src="https://framerusercontent.com/images/JBluH5Q890rjoCxmMNJDCsMog.png?scale-down-to=2048"
                  alt="Wellness Illustration"
                  className="w-full max-w-md mx-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute -bottom-6 -left-6 bg-primaryDarkGreen text-white p-6 rounded-2xl shadow-xl animate-float-gentle">
                  <div className="text-3xl font-bold">Join Now</div>
                  <div className="text-sm">Start your journey</div>
                </div>
              </div>
            </div>

            {/* Right Side Signup Form */}
            <div className="animate-slide-in-right">
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 max-w-md mx-auto">
                <div className="text-center mb-8">
                  <Link to="/" className="inline-block mb-6">
                    <span className="text-3xl font-bold font-serif text-primaryDarkGreen">
                      Fitness<span className="text-gray-800">TM</span>
                    </span>
                  </Link>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
                  <p className="text-gray-600">Join our wellness community today</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryDarkGreen"
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryDarkGreen"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryDarkGreen"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryDarkGreen"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryDarkGreen"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        className="h-4 w-4 text-primaryDarkGreen border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">I agree to the terms</span>
                    </label>
                    {errors.agree && <p className="text-red-500 text-sm mt-1">{errors.agree}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 px-6 bg-primaryDarkGreen text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${isLoading ? "animate-pulse" : ""}`}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </button>
                </form>

                <div className="text-center mt-8">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primaryDarkGreen font-semibold hover:text-primaryDarkGreen2 transition-colors duration-300">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile illustration */}
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

export default SignUp;