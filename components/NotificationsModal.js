import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from './CustomText';
import { Colors } from '../constants/Colors';
import { convertArabicToEnglish } from '../utils/numberUtils';

const { width: screenWidth } = Dimensions.get('window');

const NotificationsModal = ({ visible, onClose, bellPosition }) => {
  const notifications = [
    {
      id: 'A',
      iconColor: '#FF6B35',
      title: 'تم تحديث حزمة الباقة الذهبية',
      subtitle: 'تم إضافة خدمات جديدة',
      count: convertArabicToEnglish('2'),
      action: 'عرض التفاصيل'
    },
    {
      id: 'B',
      iconColor: Colors.primaryDark,
      title: 'تم تأكيد حجز مكان الحفل',
      subtitle: 'تم تأكيد الحجز بنجاح',
      count: convertArabicToEnglish('1'),
      action: 'انتقل إلى الصفحة'
    }
  ];

  const renderNotification = (notification) => (
    <View key={notification.id} style={styles.notificationItem}>
      
      
      <View style={styles.notificationContent}>
        <CustomText style={styles.notificationTitle}>{notification.title}</CustomText>
        <CustomText style={styles.notificationSubtitle}>{notification.subtitle}</CustomText>

      </View>
      <View style={[styles.iconContainer, { backgroundColor: notification.iconColor }]}>
        <CustomText style={styles.iconText}>{notification.id}</CustomText>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
              <View style={styles.modalOverlay}>
          <View style={[
            styles.modalContent,
            {
              top: bellPosition ? bellPosition.y + 60 : 110,
              right: bellPosition ? Math.max(20, bellPosition.x - (screenWidth * 0.85) + 40) : 20,
            }
          ]}>
          {/* Header */}
          <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color={Colors.primaryDark} />
            </TouchableOpacity>
            <CustomText style={styles.modalTitle}>الإشعارات</CustomText>
          </View>

          {/* Notifications List */}
          <View style={styles.notificationsList}>
            {notifications.map(renderNotification)}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'relative',
  },
  modalContent: {
    backgroundColor: '#f4eac1',
    borderRadius: 25,
    width: screenWidth * 0.85,
    maxHeight: screenWidth * 0.8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    position: 'absolute',
    zIndex: 1000,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'right',
    fontFamily: 'AdventPro',
  },
  closeButton: {
    padding: 5,
  },
  notificationsList: {
    marginBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  iconText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'AdventPro',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryDark,
    textAlign: 'right',
    marginBottom: 5,
    lineHeight: 22,
    fontFamily: 'AdventPro',
  },
  notificationSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'right',
    marginBottom: 10,
    lineHeight: 20,
    fontFamily: 'AdventPro',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: Colors.primaryDark,
    textAlign: 'right',
    fontWeight: '500',
    fontFamily: 'AdventPro',
  },
  countBadge: {
    backgroundColor: Colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  countText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'AdventPro',
  },
  modalFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(111, 12, 119, 0.1)',
    paddingTop: 15,
  },
  viewAllButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  viewAllText: {
    fontSize: 16,
    color: Colors.primaryDark,
    textAlign: 'center',
    marginRight: 8,
    fontWeight: '500',
    fontFamily: 'AdventPro',
  },
});

export default NotificationsModal;
