import React, { createContext, useContext, useState } from 'react';

const ConversationsContext = createContext();

export const useConversations = () => {
  const context = useContext(ConversationsContext);
  if (!context) {
    throw new Error('useConversations must be used within a ConversationsProvider');
  }
  return context;
};

export const ConversationsProvider = ({ children }) => {
  const [conversations, setConversations] = useState({});

  const saveConversation = (partnerId, partnerData, messages) => {
    setConversations(prev => ({
      ...prev,
      [partnerId]: {
        partnerId,
        partnerName: partnerData.name,
        partnerLogo: partnerData.logo,
        partnerLogoImage: partnerData.logo || partnerData.logoImage,
        messages: messages,
        lastUpdated: new Date().toISOString()
      }
    }));
  };

  const getConversation = (partnerId) => {
    return conversations[partnerId] || null;
  };

  const addMessageToConversation = (partnerId, message) => {
    setConversations(prev => {
      const existingConversation = prev[partnerId];
      if (existingConversation) {
        return {
          ...prev,
          [partnerId]: {
            ...existingConversation,
            messages: [...existingConversation.messages, message],
            lastUpdated: new Date().toISOString()
          }
        };
      }
      return prev;
    });
  };

  const getAllConversations = () => {
    return conversations;
  };

  const clearConversation = (partnerId) => {
    setConversations(prev => {
      const newConversations = { ...prev };
      delete newConversations[partnerId];
      return newConversations;
    });
  };

  return (
    <ConversationsContext.Provider value={{
      conversations,
      saveConversation,
      getConversation,
      addMessageToConversation,
      getAllConversations,
      clearConversation
    }}>
      {children}
    </ConversationsContext.Provider>
  );
};
