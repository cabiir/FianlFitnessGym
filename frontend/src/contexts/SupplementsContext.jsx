import React, { createContext, useContext, useState, useEffect } from "react";

const SupplementsContext = createContext();

export const SupplementsProvider = ({ children }) => {
  const defaultSupplements = [
    {
      id: 1,
      name: "Whey Protein Isolate",
      price: 34.99,
      category: "Protein",
      rating: 4.8,
      description: "Supports muscle recovery and growth",
      image:
        "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Creatine Monohydrate",
      price: 24.99,
      category: "Strength",
      rating: 4.7,
      description: "Improves strength and performance",
      image:
        "https://images.unsplash.com/photo-1591262184852-abc345175f3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
  ];

  const [supplements, setSupplements] = useState(defaultSupplements);

  // ✅ Load from localStorage if available
  useEffect(() => {
    const savedSupplements = localStorage.getItem("supplements");
    if (savedSupplements) {
      setSupplements(JSON.parse(savedSupplements));
    }
  }, []);

  // ✅ Save to localStorage whenever supplements change
  useEffect(() => {
    localStorage.setItem("supplements", JSON.stringify(supplements));
  }, [supplements]);

  return (
    <SupplementsContext.Provider value={{ supplements, setSupplements }}>
      {children}
    </SupplementsContext.Provider>
  );
};

export const useSupplements = () => useContext(SupplementsContext);
