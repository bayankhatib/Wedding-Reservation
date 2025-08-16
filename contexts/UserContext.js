import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    profileImage: null,
    isRegistered: false
  });

  const registerUser = (name, email, password, profileImage) => {
    setUserData({
      name: name || 'اسم المستخدم',
      email: email || 'user@gmail.com',
      password: password || '',
      profileImage: profileImage || null,
      isRegistered: true
    });
  };

  const updateProfile = (updates) => {
    setUserData(prev => ({
      ...prev,
      ...updates
    }));
  };

  const clearUserData = () => {
    setUserData({
      name: '',
      email: '',
      password: '',
      profileImage: null,
      isRegistered: false
    });
  };

  return (
    <UserContext.Provider value={{
      userData,
      registerUser,
      updateProfile,
      clearUserData
    }}>
      {children}
    </UserContext.Provider>
  );
};

