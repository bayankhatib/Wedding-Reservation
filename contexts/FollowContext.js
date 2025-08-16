import React, { createContext, useContext, useState } from 'react';

const FollowContext = createContext();

export const useFollow = () => {
  const context = useContext(FollowContext);
  if (!context) {
    throw new Error('useFollow must be used within a FollowProvider');
  }
  return context;
};

export const FollowProvider = ({ children }) => {
  const [followedPartners, setFollowedPartners] = useState([]);

  const addFollowedPartner = (partner) => {
    setFollowedPartners(prev => {
      const exists = prev.some(p => p.id === partner.id);
      if (exists) return prev;
      return [...prev, partner];
    });
  };

  const removeFollowedPartner = (partnerId) => {
    setFollowedPartners(prev => prev.filter(p => p.id !== partnerId));
  };

  const isPartnerFollowed = (partnerId) => {
    return followedPartners.some(p => p.id === partnerId);
  };

  const toggleFollow = (partner) => {
    if (isPartnerFollowed(partner.id)) {
      removeFollowedPartner(partner.id);
    } else {
      addFollowedPartner(partner);
    }
  };

  return (
    <FollowContext.Provider value={{ 
      followedPartners, 
      addFollowedPartner, 
      removeFollowedPartner, 
      isPartnerFollowed, 
      toggleFollow 
    }}>
      {children}
    </FollowContext.Provider>
  );
};

