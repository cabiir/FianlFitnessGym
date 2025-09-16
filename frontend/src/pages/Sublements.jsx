import React, { useEffect, useState } from "react";
import { ShoppingCart, Star } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../contexts/CartContext";
import { useSupplements } from "../contexts/SupplementsContext"; // ✅ new context

const Sublements = () => {
  const { cartItems, addToCart, cartCount } = useCart();
  const { supplements } = useSupplements(); // ✅ dynamic supplements from AddSublements
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header cartCount={cartCount} />

      {/* Hero Section */}
      <section
        className={`pt-32 px-4 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 animate-fade-in">
            Premium Supplements Store
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 animate-fade-in">
            Find the best supplements to support your fitness journey and
            wellness goals.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-10 px-4 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {supplements.length === 0 ? (
            <p className="text-gray-500 text-lg col-span-full text-center">
              No supplements available yet. Check back later.
            </p>
          ) : (
            supplements.map((supplement, idx) => (
              <div
                key={supplement.id}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-transform hover:-translate-y-2 duration-500 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={
                      supplement.image ||
                      "https://via.placeholder.com/400x250.png?text=No+Image"
                    }
                    alt={supplement.name}
                    className="w-full h-56 object-cover transform transition-transform duration-700 hover:scale-110"
                  />
                  {cartItems.find((i) => i.id === supplement.id) && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Added ✓
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {supplement.name}
                    </h3>
                    {supplement.rating && (
                      <div className="flex items-center bg-blue-100 px-2 py-1 rounded">
                        <Star
                          size={16}
                          className="text-yellow-500 fill-yellow-500 mr-1"
                        />
                        <span className="text-sm font-bold">
                          {supplement.rating}
                        </span>
                      </div>
                    )}
                  </div>

                  {supplement.description && (
                    <p className="text-gray-600 mb-4">{supplement.description}</p>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      ${parseFloat(supplement.price).toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(supplement)}
                      disabled={cartItems.find((i) => i.id === supplement.id)}
                      className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                        cartItems.find((i) => i.id === supplement.id)
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-primaryDarkGreen text-white"
                      }`}
                    >
                      <ShoppingCart size={18} />
                      {cartItems.find((i) => i.id === supplement.id)
                        ? "Added"
                        : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sublements;
