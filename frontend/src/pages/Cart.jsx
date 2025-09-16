import React from "react";
import {  Link2, Trash2 } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart, cartCount } = useCart();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartCount} />

      <section className="pt-32 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center py-20">Your cart is empty 😢</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center bg-white rounded-xl shadow p-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg mr-4" />

                  <div className="flex-1">
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button onClick={() => decreaseQty(item.id)} className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQty(item.id)} className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition">+</button>
                    </div>
                  </div>

                  <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full ml-2">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-xl shadow space-y-4">
              <h2 className="text-2xl font-bold">Summary</h2>
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>${(totalPrice + 5).toFixed(2)}</span>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </section>
        <div className="mb-6 text-center items-center justify-center">
  <Link to="/">
    <button className="  px-6 py-3 bg-primaryDarkGreen text-white font-semibold rounded-xl shadow hover:bg-primaryDarkGreen2 transition transform hover:-translate-y-1">
      ← Go Back
    </button>
  </Link>
</div>
      <Footer />
    </div>
  );
};

export default Cart;
