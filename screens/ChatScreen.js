import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../components/CustomText';
import { Colors } from '../constants/Colors';
import BottomTabNavigator from '../components/BottomTabNavigator';
import { useConversations } from '../contexts/ConversationsContext';

const ChatScreen = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const scrollViewRef = useRef(null);
  const { getConversation, saveConversation, addMessageToConversation } = useConversations();
  
  const partner = route.params?.partner || {
    name: 'جاسمين فاشين',
    logo: 'Jasmine',
    logoImage: null
  };

  const partnerId = partner.id || 'default';

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };



  useEffect(() => {
    // Load existing conversation or start with empty chat
    const existingConversation = getConversation(partnerId);
    if (existingConversation) {
      setMessages(existingConversation.messages);
      setIsFirstMessage(existingConversation.messages.length === 0);
    } else {
      setMessages([]);
      setIsFirstMessage(true);
    }
  }, [partnerId, getConversation]);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now(),
        text: inputText,
        timestamp: new Date().toISOString(),
        isIncoming: false,
        isAutoResponse: false
      };

      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setInputText('');

      // Save conversation after user message
      saveConversation(partnerId, partner, updatedMessages);

      // Auto-response after 2 seconds
      setTimeout(() => {
        let autoResponseText;
        
        if (isFirstMessage) {
          // First message gets 'أهلا' response
          autoResponseText = 'أهلا';
          setIsFirstMessage(false);
        } else {
          // Subsequent messages get standard auto-reply
          autoResponseText = 'شكراً لك على رسالتك! سنقوم بالرد عليك في أقرب وقت ممكن.';
        }

        const autoResponse = {
          id: Date.now() + 1,
          text: autoResponseText,
          timestamp: new Date().toISOString(),
          isIncoming: true,
          isAutoResponse: true
        };
        
        const finalMessages = [...updatedMessages, autoResponse];
        setMessages(finalMessages);
        
        // Save conversation after auto-response
        saveConversation(partnerId, partner, finalMessages);
      }, 2000);
    }
  };

  const renderMessage = (message) => (
    <View key={message.id} style={[
      styles.messageContainer,
      message.isIncoming ? styles.incomingMessage : styles.outgoingMessage
    ]}>
      {message.isIncoming && (
        <View style={styles.messageHeader}>
          <View style={styles.messagePartnerInfo}>
            <CustomText style={styles.messagePartnerName}>{partner.name}</CustomText>
            <CustomText style={styles.messagePartnerTitle}>شريك</CustomText>
          </View>
          <View style={styles.messagePartnerLogo}>
            {partner.logoImage ? (
              <Image source={partner.logoImage} style={styles.messageLogoImage} resizeMode="cover" />
            ) : (
              <CustomText style={styles.messageLogoText}>{partner.logo}</CustomText>
            )}
          </View>
        </View>
      )}
      
      <View style={[
        styles.messageBubble,
        message.isIncoming ? styles.incomingBubble : styles.outgoingBubble
      ]}>
        <CustomText style={[
          styles.messageText,
          message.isIncoming ? styles.incomingText : styles.outgoingText
        ]}>
          {message.text}
        </CustomText>
      </View>
              <CustomText style={[
          styles.timestamp,
          message.isIncoming ? styles.incomingTimestamp : styles.outgoingTimestamp
        ]}>
          {formatTime(message.timestamp)}
        </CustomText>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primaryDark} />
        </TouchableOpacity>
        
        <View style={styles.partnerInfo}>
          <CustomText style={styles.partnerName}>{partner.name}</CustomText>
          <View style={styles.partnerLogo}>
            {partner.logoImage ? (
              <Image source={partner.logoImage} style={styles.messageLogoImage} resizeMode="cover" />
            ) : (
              <CustomText style={styles.messageLogoText}>{partner.logo}</CustomText>
            )}
          </View>
        </View>
      </View>
    <View  style={styles.chatContainer}>
      {/* Chat Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map(renderMessage)}
      </ScrollView>

      {/* Message Input */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="ابدأ رسالة جديدة"
            placeholderTextColor={Colors.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            textAlign="right"
          />
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <Ionicons 
              name="paper-plane" 
              size={20} 
              color={Colors.primaryDark} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      </View>
      {/* Bottom Navigation */}
      <View style={styles.bottomNavContainer}>
        <BottomTabNavigator 
          state={{ index: 0 }} 
          navigation={navigation} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdf7',
    position: 'relative',
  },
  header: {
    backgroundColor: '#f4eac1',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 15,
  },
  partnerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    gap:20,
  },
  partnerLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  partnerName: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#f4eac1',
    margin: 10,
    borderRadius: 30,
    height: '85%',
    marginBottom: 100,
  },
  chatContent: {
    paddingVertical: 20,
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
  messageContainer: {
    marginBottom: 20,
    maxWidth: '80%',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 8,
    gap: 4,
  },
  messagePartnerInfo: {
    alignItems: 'flex-start',
  },
  messagePartnerLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  messageLogoText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  messageLogoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  messagePartnerName: {
    fontSize: 12,
    color: Colors.primaryDark,
    fontWeight: '500',
    marginBottom: 2,
  },
  messagePartnerTitle: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '400',
  },
  incomingMessage: {
    alignSelf: 'flex-start',
  },
  outgoingMessage: {
    alignSelf: 'flex-end',
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 15,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  incomingBubble: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 8,
  },
  outgoingBubble: {
    backgroundColor: Colors.primaryDark,
    borderBottomRightRadius: 8,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  incomingText: {
    color: Colors.primaryDark,
  },
  outgoingText: {
    color: Colors.white,
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.7,
  },
  incomingTimestamp: {
    color: Colors.textSecondary,
    textAlign: 'left',
  },
  outgoingTimestamp: {
    color: Colors.textSecondary,
    textAlign: 'right',
  },
  inputContainer: {
    paddingVertical: 15,
    backgroundColor: 'transparent',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4d376',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
    maxHeight: 100,
    paddingVertical: 8,
    backgroundColor: '#FFF8E1',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 5,
    textAlign: 'right',
  },
  sendButton: {
    padding: 8,
    marginLeft: 8,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
});

export default ChatScreen;
