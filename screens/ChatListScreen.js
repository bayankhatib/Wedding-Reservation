import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/Colors';
import BottomTabNavigator from '../components/BottomTabNavigator';
import CustomText from '../components/CustomText';
import { useConversations } from '../contexts/ConversationsContext';
import { PartnerDetails } from '../constants/PartnerData';

const ChatListScreen = ({ navigation }) => {
  const { getAllConversations } = useConversations();
  const conversations = getAllConversations();

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'م' : 'ص';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  const renderEmptyChatView = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Icon name="chatbubbles-outline" size={80} color={Colors.primaryDark} />
      </View>
      <CustomText style={styles.emptyTitle}>لا توجد محادثات</CustomText>
      <CustomText style={styles.emptySubtitle}>
        ابدأ محادثة مع أحد شركائنا لرؤية المحادثات هنا
      </CustomText>
    </View>
  );

  const renderChatItem = (conversation) => {
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    const lastMessageTime = lastMessage ? formatTime(lastMessage.timestamp) : '';

    return (
      <TouchableOpacity
        key={conversation.partnerId}
        style={styles.chatItem}
        onPress={() => {
          const partnerData = PartnerDetails[conversation.partnerId];
          navigation.navigate('Chat', {
            partner: {
              ...partnerData,
              logoImage: conversation.partnerLogoImage
            }
          });
        }}
      >
        <View style={styles.chatItemContent}>
          <View style={styles.chatInfo}>
          <View style={styles.partnerLogo}>
              {conversation.partnerLogoImage ? (
                <Image 
                  source={conversation.partnerLogoImage} 
                  style={styles.logoImage} 
                  resizeMode="cover" 
                />
              ) : (
                <CustomText style={styles.logoText}>
                  {typeof conversation.partnerLogo === 'string' ? conversation.partnerLogo : 'شريك'}
                </CustomText>
              )}
            </View>
            <CustomText style={styles.partnerName} numberOfLines={1}>
              {conversation.partnerName}
            </CustomText>
          </View>
          <View style={styles.chatMeta}>
            {lastMessageTime && (
              <CustomText style={[styles.timeStamp, { fontFamily: 'AdventPro' }]}>
                {lastMessageTime}
              </CustomText>
            )}
           
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const sortedConversations = Object.values(conversations).sort((a, b) => {
    if (!a.lastUpdated || !b.lastUpdated) return 0;
    return new Date(b.lastUpdated) - new Date(a.lastUpdated);
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <CustomText style={styles.headerTitle}>مراسلة</CustomText>
      </View>

      {/* Chat List */}
      <View style={styles.chatListContainer}>
        {sortedConversations.length > 0 ? (
          <FlatList 
            data={sortedConversations}
            renderItem={({ item }) => renderChatItem(item)}
            keyExtractor={(item) => item.partnerId}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.chatListContent}
          />
        ) : (
          <View style={styles.emptyViewContainer}>
            {renderEmptyChatView()}
          </View>
        )}
      </View>

      {/* Bottom Tabs */}
      <View style={styles.bottomNavContainer}>
        <BottomTabNavigator 
          state={{ index: 4 }} 
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryDark,
  },
  chatListContainer: {
    height: '80%',
    backgroundColor: '#f4eac1',
    margin: 15,
    marginBottom: 100,
    borderRadius: 40,
    padding: 20,
  },
  chatList: {
    flex: 1,
  },
  chatListContent: {
    paddingBottom: 20,
  },
  chatItem: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chatItemContent: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  chatInfo: {
    flex: 1,
    marginRight: 15,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    height: '100%',
  },
  partnerName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
  lastMessage: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'right',
  },
  chatMeta: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  timeStamp: {
    fontSize: 12,
    color: Colors.primaryDark,
    fontWeight: '500',
  },
  partnerLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  logoText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 80,
  },
  emptyIconContainer: {
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 24,
  },
  emptyViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
});

export default ChatListScreen;
