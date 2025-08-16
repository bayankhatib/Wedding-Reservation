import React, { createContext, useContext, useState } from 'react';

const NotificationsContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};

export const NotificationsProvider = ({ children }) => {
  const [notificationsRead, setNotificationsRead] = useState(false);

  const markNotificationsAsRead = () => {
    setNotificationsRead(true);
  };

  return (
    <NotificationsContext.Provider value={{ notificationsRead, markNotificationsAsRead }}>
      {children}
    </NotificationsContext.Provider>
  );
};
