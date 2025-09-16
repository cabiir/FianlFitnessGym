// contexts/ProgramsContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgramsContext = createContext();

export const usePrograms = () => {
  const context = useContext(ProgramsContext);
  if (!context) {
    throw new Error('usePrograms must be used within a ProgramsProvider');
  }
  return context;
};

export const ProgramsProvider = ({ children }) => {
  const [programs, setPrograms] = useState([]);

  // Load from localStorage on initial render
  useEffect(() => {
    const savedPrograms = localStorage.getItem('fitnessPrograms');
    if (savedPrograms) {
      try {
        const parsedPrograms = JSON.parse(savedPrograms);
        // Ensure all programs have proper image URLs
        const programsWithImages = parsedPrograms.map(program => ({
          ...program,
          image: program.image || getDefaultImage(program.category)
        }));
        setPrograms(programsWithImages);
      } catch (error) {
        console.error('Error parsing programs from localStorage:', error);
        setPrograms(getDefaultPrograms());
      }
    } else {
      setPrograms(getDefaultPrograms());
    }
  }, []);

  // Save to localStorage when programs change
  useEffect(() => {
    localStorage.setItem('fitnessPrograms', JSON.stringify(programs));
  }, [programs]);

  // Function to get default image based on category
  const getDefaultImage = (category) => {
    const defaultImages = {
      beginner: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      intermediate: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      advanced: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      yoga: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    };
    return defaultImages[category] || defaultImages.yoga;
  };

  // Default programs with proper image URLs
  const getDefaultPrograms = () => [
    {
      id: 1,
      title: "Beginner's Foundation",
      category: "beginner",
      duration: "4 weeks",
      intensity: "Low",
      image: getDefaultImage("beginner"),
      description: "Build a solid fitness foundation with guided exercises perfect for starters."
    },
    {
      id: 2,
      title: "Strength Builder",
      category: "intermediate",
      duration: "6 weeks",
      intensity: "Medium",
      image: getDefaultImage("intermediate"),
      description: "Increase your power and muscle definition with our structured strength program."
    },
    {
      id: 3,
      title: "Endurance Master",
      category: "advanced",
      duration: "8 weeks",
      intensity: "High",
      image: getDefaultImage("advanced"),
      description: "Push your limits and build exceptional cardiovascular endurance."
    }
  ];

  const addProgram = (program) => {
    // Ensure program has an image
    const programWithImage = {
      ...program,
      image: program.image || getDefaultImage(program.category)
    };
    
    setPrograms(prev => [...prev, programWithImage]);
    return programWithImage;
  };

  const updateProgram = (programId, updatedData) => {
    // Ensure updated data has an image
    const updatedWithImage = {
      ...updatedData,
      image: updatedData.image || getDefaultImage(updatedData.category)
    };
    
    setPrograms(prev => prev.map(program => 
      program.id === programId ? { ...program, ...updatedWithImage } : program
    ));
  };

  const deleteProgram = (programId) => {
    setPrograms(prev => prev.filter(program => program.id !== programId));
  };

  const value = {
    programs,
    addProgram,
    updateProgram,
    deleteProgram
  };

  return (
    <ProgramsContext.Provider value={value}>
      {children}
    </ProgramsContext.Provider>
  );
};