import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Guest User",
    membership: "Free Plan",
    joinDate: new Date().toISOString().split("T")[0],
  });

  const [selectedPrograms, setSelectedPrograms] = useState([]);

  const updateProgramProgress = (id, newProgress) => {
    setSelectedPrograms(prev =>
      prev.map(p => (p.id === id ? { ...p, progress: newProgress } : p))
    );
  };

  return (
    <UserContext.Provider value={{ user, setUser, selectedPrograms, setSelectedPrograms, updateProgramProgress }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
