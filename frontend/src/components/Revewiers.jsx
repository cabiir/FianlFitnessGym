import { useState, useEffect } from 'react';

function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const reviews = [
    {
      id: 1,
      name: "Clare Bamford",
      username: "@staking",
      text: "Amazing fitness program! I've seen incredible results in just 3 months. The trainers are professional and motivating.",
      date: "2 days ago",
      avatar: "https://framerusercontent.com/images/smEt8aujk0lNpCG38Kv3pAcGbTY.png"
    },
    {
      id: 2,
      name: "Alex Johnson",
      username: "@alexfit",
      text: "The yoga classes transformed my flexibility and mental clarity. Highly recommend for beginners and advanced practitioners alike.",
      date: "1 week ago",
      avatar: "https://framerusercontent.com/images/V4XRjS9m0H8S7kIZ7njL09JqU5s.png"
    },
    {
      id: 3,
      name: "Sarah Wilson",
      username: "@sarahwellness",
      text: "The personalized coaching helped me achieve my fitness goals faster than I ever thought possible. Worth every penny!",
      date: "3 days ago",
      avatar: "https://framerusercontent.com/images/UwLep5loEiSZvOhp2cfGolopR0.png"
    },
    {
      id: 4,
      name: "Mike Thompson",
      username: "@mikestrength",
      text: "Best fitness community I've ever been part of. The support system and facilities are top-notch.",
      date: "5 days ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 5,
      name: "Emma Davis",
      username: "@emmafitness",
      text: "The wellness workshops provided practical tools that I use daily. My stress levels have decreased significantly.",
      date: "1 day ago",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    }
  ];

  useEffect(() => {
    // Animation on component mount
    setIsVisible(true);

    // Auto-rotate reviews
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="px-5 md:px-8 lg:px-12 py-16 md:py-20 bg-gray-50 rounded-3xl">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Over 200+ reviews from our clients
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Here's what some of our satisfied clients have to say
          </p>
        </div>

        {/* Reviews Container */}
        <div className={`relative overflow-hidden rounded-3xl bg-white shadow-xl p-6 md:p-8 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Review Content */}
          <div key={reviews[currentIndex].id} className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={reviews[currentIndex].avatar}
                alt={reviews[currentIndex].name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-primaryDarkGreen shadow-lg"
              />
            </div>

            {/* Review Text */}
            <div className="flex-1">
              <p className="text-gray-600 text-lg md:text-xl mb-6 italic">
                "{reviews[currentIndex].text}"
              </p>
              
              {/* Reviewer Info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-lg md:text-xl text-gray-800">
                    {reviews[currentIndex].name}
                  </h4>
                  <p className="text-primaryDarkGreen text-md md:text-lg">
                    {reviews[currentIndex].username}
                  </p>
                </div>
                
                {/* Date */}
                <p className="text-gray-500 text-sm md:text-base">
                  {reviews[currentIndex].date}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevReview}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-primaryDarkGreen hover:text-white transition-all duration-300"
            aria-label="Previous review"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextReview}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-primaryDarkGreen hover:text-white transition-all duration-300"
            aria-label="Next review"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primaryDarkGreen' : 'bg-gray-300'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* All Reviews Grid (for larger screens) */}
        <div className="mt-16 hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review, index) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{review.name}</h4>
                  <p className="text-primaryDarkGreen text-sm">{review.username}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">"{review.text}"</p>
              <p className="text-gray-500 text-sm text-right">{review.date}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Reviews;