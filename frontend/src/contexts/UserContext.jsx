import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // currently logged-in user
  const [users, setUsers] = useState([]); // all registered users
  const [selectedPrograms, setSelectedPrograms] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('fitnessUser');
    const savedPrograms = localStorage.getItem('selectedPrograms');
    const savedUsers = localStorage.getItem('allUsers');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedPrograms) setSelectedPrograms(JSON.parse(savedPrograms));
    if (savedUsers) setUsers(JSON.parse(savedUsers));
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (user) localStorage.setItem('fitnessUser', JSON.stringify(user));
    localStorage.setItem('selectedPrograms', JSON.stringify(selectedPrograms));
    localStorage.setItem('allUsers', JSON.stringify(users));
  }, [user, selectedPrograms, users]);

  // Register a new user
  const registerUser = ({ name, email, password }) => {
    if (users.some(u => u.email === email)) return false;

    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // NOTE: in real apps, NEVER store plain passwords!
      joinDate: new Date().toISOString().split('T')[0],
      membership: "Free Plan"
    };

    setUsers(prev => [...prev, newUser]);
    setUser(newUser); // Auto login
    return true;
  };

  // Login check
  const loginUser = ({ email, password }) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser({
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        membership: foundUser.membership,
        joinDate: foundUser.joinDate
      });
      return true;
    }
    return false;
  };

  // ✅ Clean logout (clear state + localStorage)
  const logout = () => {
    setUser(null);
    setSelectedPrograms([]);
    localStorage.removeItem('fitnessUser');
    localStorage.removeItem('selectedPrograms');
  };

  const addProgram = (program) => {
    if (!selectedPrograms.some(p => p.id === program.id)) {
      const programWithProgress = {
        ...program,
        progress: 0,
        startDate: new Date().toISOString().split('T')[0],
        workouts: "0/20 completed"
      };
      setSelectedPrograms(prev => [...prev, programWithProgress]);
      return true;
    }
    return false;
  };

  const updateProgramProgress = (programId, newProgress) => {
    setSelectedPrograms(prev =>
      prev.map(program =>
        program.id === programId
          ? {
              ...program,
              progress: newProgress,
              workouts: `${Math.floor(newProgress / 100 * 20)}/20 completed`
            }
          : program
      )
    );
  };

  const removeProgram = (programId) => {
    setSelectedPrograms(prev => prev.filter(program => program.id !== programId));
  };

  const value = {
    user,
    users,
    setUser,
    registerUser,
    loginUser,
    logout,             // ✅ only one logout now
    selectedPrograms,
    addProgram,
    updateProgramProgress,
    removeProgram
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
