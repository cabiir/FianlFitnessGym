import { useState, useEffect, useRef } from 'react';

function Bills() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const planRefs = useRef([]);
  const [animatedPlans, setAnimatedPlans] = useState([]);

  useEffect(() => {
    setIsVisible(true);

    // Intersection Observer for plan cards
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = planRefs.current.indexOf(entry.target);
            if (index !== -1 && !animatedPlans.includes(index)) {
              setAnimatedPlans(prev => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    planRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      planRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [animatedPlans]);

  const plans = [
    {
      name: 'Starter Plan',
      price: '$14',
      period: 'per user, per month',
      buttonText: 'Contact us',
      features: [
        '9 yoga classes per month',
        '2 fitness training sessions per month',
        'Access to online resources',
        'Monthly wellness newsletter'
      ],
      popular: false
    },
    {
      name: 'Basic Plan',
      price: '$29',
      period: 'per user, per month',
      buttonText: 'Contact us',
      features: [
        'Unlimited yoga classes',
        '4 fitness training sessions per month',
        '1 personalised coaching session per month',
        'Access to online resources',
        'Monthly wellness newsletter'
      ],
      popular: true
    },
    {
      name: 'Premium Plan',
      price: '$139',
      period: 'per user, per month',
      buttonText: 'Contact us',
      features: [
        '4 personalised coaching sessions per month',
        'Customized fitness and yoga plans',
        'Access to online resources',
        'Monthly wellness newsletter'
      ],
      popular: false
    }
  ];

  return (
    <section className={`px-5 md:px-8 lg:px-12 py-16 md:py-20 border-2 border-gray-50 rounded-3xl bg-gra-50 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl  text-gray-800 mb-4">
            Community <span className="text-primaryDarkGreen font-playfair italic">steed</span> classes
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            If you're looking to supplement your current fitness routine with small group trainings or just want to join a few classes a month then take a look at our class pass options below.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-900 my-12"></div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              ref={(el) => (planRefs.current[index] = el)}
              className={`relative bg-white rounded-2xl p-8 shadow-lg transition-all duration-500 transform hover:scale-105 ${
                animatedPlans.includes(index) ? 'opacity-100 animate-float-up' : 'opacity-0'
              } ${
                plan.popular 
                  ? 'border-2 border-primaryDarkGreen shadow-xl' 
                  : 'border border-gray-200'
              } ${
                hoveredPlan === index ? 'translate-y-2' : ''
              }`}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primaryDarkGreen text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl lg:text-5xl font-bold text-primaryDarkGreen">{plan.price}</span>
                </div>
                <p className="text-gray-600 text-sm">{plan.period}</p>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li 
                    key={featureIndex}
                    className="flex items-start transition-all duration-300 hover:translate-x-1"
                  >
                    <svg 
                      className="w-5 h-5 text-primaryDarkGreen mt-0.5 mr-3 flex-shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Contact Button */}
              <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                plan.popular
                  ? 'bg-primaryDarkGreen text-white hover:bg-primaryDarkGreen2'
                  : 'bg-gray-100 text-primaryDarkGreen hover:bg-primaryDarkGreen hover:text-white'
              }`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-gray-600 mb-6">
            All plans include access to our community events and support groups.
          </p>
          <button className="bg-primaryDarkGreen text-white px-8 py-3 rounded-full font-semibold hover:bg-primaryDarkGreen2 transition-all duration-300 transform hover:scale-105">
            View Detailed Comparison
          </button>
        </div>
      </div>
    </section>
  );
}

export default Bills;