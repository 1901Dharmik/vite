import React, { createContext, useContext, useState, useCallback } from "react";

// Create the context
const NotificationContext = createContext();

// Hook to use the notification context
export const useNotification = () => {
  return useContext(NotificationContext);
};

// Provider component to wrap your application
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback(({ icon, message, customText, duration }) => {
    const id = Math.random().toString(36).substring(7); // generate a unique ID
    setNotifications((prev) => [
      ...prev,
      { id, icon, message, customText, duration },
    ]);

    // Remove notification after duration
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, duration);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="notification-container">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification">
            {notification.icon}
            <div>
              <p>{notification.message}</p>
              <span>{notification.customText}</span>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
