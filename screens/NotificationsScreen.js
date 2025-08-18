import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { Colors } from '../constants/Colors';
import { Notifications } from '../constants/FakeData';
import { convertArabicToEnglish } from '../utils/numberUtils';

const NotificationsScreen = ({ navigation }) => {
  const renderNotification = (notification) => (
    <TouchableOpacity 
      key={notification.id} 
      style={[
        styles.notificationItem,
        !notification.read && styles.unreadNotification
      ]}
    >
      <View style={styles.notificationIcon}>
        <Text style={styles.iconText}>{notification.icon}</Text>
      </View>
      
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{convertArabicToEnglish(notification.title)}</Text>
        <Text style={styles.notificationMessage}>{convertArabicToEnglish(notification.message)}</Text>
        <Text style={styles.notificationTime}>{convertArabicToEnglish(notification.time)}</Text>
      </View>
      
      {!notification.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>الإشعارات</Text>
        <TouchableOpacity>
          <Text style={styles.markAllRead}>تحديد الكل كمقروء</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {Notifications.map(renderNotification)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'right',
    fontFamily: 'AdventPro',
  },
  markAllRead: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
    fontFamily: 'AdventPro',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  notificationItem: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  notificationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: 'bold',
    fontFamily: 'AdventPro',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'right',
    marginBottom: 5,
    fontFamily: 'AdventPro',
  },
  notificationMessage: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'right',
    lineHeight: 20,
    marginBottom: 5,
    fontFamily: 'AdventPro',
  },
  notificationTime: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'right',
    fontFamily: 'AdventPro',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginLeft: 10,
  },
});

export default NotificationsScreen; 