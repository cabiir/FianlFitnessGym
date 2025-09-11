import { useState, useEffect } from 'react';
import Header from "../components/Header";

function Plan() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [billingCycle, setBillingCycle] = useState('monthly');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Membership plans data
  const membershipPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: { monthly: 14, annually: 180 },
      description: 'Perfect for beginners starting their fitness journey',
      features: [
        'Access to basic workouts',
        'Nutrition guide',
        'Email support',
        'Progress tracking',
        'Weekly fitness tips'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: { monthly: 29, annually: 396 },
      description: 'Ideal for regular exercisers seeking more guidance',
      features: [
        'All Basic features',
        'Personalized workout plans',
        'Priority support',
        'Custom meal plans',
        'Advanced analytics',
        'Live chat with trainers',
        'Monthly fitness assessments'
      ],
      popular: true
    },
    {
      id: 'elite',
      name: 'Elite',
      price: { monthly: 139, annually: 828 },
      description: 'For dedicated athletes wanting the complete experience',
      features: [
        'All Pro features',
        '1-on-1 coaching sessions',
        '24/7 support line',
        'Recovery techniques',
        'Supplement guidance',
        'Exclusive workout content',
        'Bi-weekly goal reviews',
        'Custom supplement plans'
      ],
      popular: false
    }
  ];

  // Calculate savings for annual billing
  const calculateSavings = (monthlyPrice, annualPrice) => {
    const monthlyTotal = monthlyPrice * 12;
    return monthlyTotal - annualPrice;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className={`pt-32 pb-16 px-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 animate-fade-in">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Select the membership that fits your goals and budget. All plans include access to our expert trainers and supportive community.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex justify-center items-center mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <span className={`mr-4 font-medium ${billingCycle === 'monthly' ? 'text-primaryDarkGreen' : 'text-gray-500'}`}>Monthly</span>
            <button 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly')}
              className="relative w-14 h-7 flex items-center bg-gray-300 rounded-full p-1 transition-colors duration-300"
            >
              <div className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${billingCycle === 'annually' ? 'translate-x-7' : ''}`}></div>
            </button>
            <span className="ml-4 font-medium relative">
              <span className={`${billingCycle === 'annually' ? 'text-primaryDarkGreen' : 'text-gray-500'}`}>Annual</span>
              {billingCycle === 'annually' && (
                <span className="absolute -top-5 -right-5 bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                  Save 20%
                </span>
              )}
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-10 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipPlans.map((plan, index) => (
              <div 
                key={plan.id}
                className={`relative rounded-3xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2 animate-fade-in ${
                  plan.popular 
                    ? 'border-4 border-primaryDarkGreen shadow-2xl scale-105' 
                    : 'border border-gray-200 shadow-xl'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primaryDarkGreen text-white px-6 py-2 rounded-full font-bold text-sm">
                    MOST POPULAR
                  </div>
                )}
                
                <div className={`p-8 ${plan.popular ? 'bg-primaryDarkGreen text-white' : 'bg-white'}`}>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className={`mb-6 ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.annually}
                    </span>
                    <span className={`ml-1 ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                    
                    {billingCycle === 'annually' && (
                      <div className={`text-sm mt-1 ${plan.popular ? 'text-blue-100' : 'text-green-600'}`}>
                        Save ${calculateSavings(plan.price.monthly, plan.price.annually)} annually
                      </div>
                    )}
                  </div>
                  
                  <button 
                    className={`w-full py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                      plan.popular 
                        ? 'bg-white text-primaryDarkGreen hover:bg-gray-100' 
                        : 'bg-primaryDarkGreen text-white hover:bg-primaryDarkGreen2'
                    }`}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Get Started'}
                  </button>
                </div>
                
                <div className="p-8 bg-gray-50">
                  <h4 className="font-bold text-gray-800 mb-4">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                question: "Can I change my plan later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. The changes will be reflected in your next billing cycle."
              },
              {
                question: "Do you offer a free trial?",
                answer: "We offer a 14-day money-back guarantee on all plans. If you're not satisfied, we'll refund your payment."
              },
              {
                question: "How do I cancel my subscription?",
                answer: "You can cancel anytime from your account settings. There are no cancellation fees."
              },
              {
                question: "Are the workout plans personalized?",
                answer: "Yes, our Pro and Elite plans include personalized workout and nutrition plans based on your goals and preferences."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <button className="flex justify-between items-center w-full text-left font-semibold text-gray-800 hover:text-primaryDarkGreen transition-colors duration-300">
                  <span>{faq.question}</span>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div className="mt-2 text-gray-600">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primaryDarkGreen text-white">
        <div className="max-w-4xl mx-auto text-center px-4 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl opacity-90 mb-8">
            Our team is here to help you choose the right plan for your fitness journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-primaryDarkGreen font-semibold py-3 px-8 rounded-xl transform transition-transform hover:scale-105 duration-300">
              Contact Support
            </button>
            <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-xl transform transition-transform hover:scale-105 duration-300">
              Start Free Trial
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Plan;