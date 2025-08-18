import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput,
  Modal,
  Image,
  Alert,
  ScrollView
} from 'react-native';
import { Colors } from '../constants/Colors';
import CustomText from '../components/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../contexts/UserContext';
import { useFollow } from '../contexts/FollowContext';
import NotificationsModal from '../components/NotificationsModal';
import { useNotifications } from '../contexts/NotificationsContext';
import BottomTabNavigator from '../components/BottomTabNavigator';

const ProfileScreen = ({ navigation }) => {
  const { userData, updateProfile } = useUser();
  const { followedPartners, removeFollowedPartner } = useFollow();
  const [showEditForm, setShowEditForm] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [bellPosition, setBellPosition] = useState(null);
  const { notificationsRead, markNotificationsAsRead } = useNotifications();
  const bellRef = useRef(null);

  // Sync local state with context data
  useEffect(() => {
    setUsername(userData.name || 'اسم المستخدم');
    setEmail(userData.email || 'user@gmail.com');
    setProfileImage(userData.profileImage || null);
  }, [userData]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    // Validate passwords
    if (newPassword && newPassword !== confirmPassword) {
      Alert.alert('خطأ', 'كلمة المرور الجديدة غير متطابقة');
      return;
    }

    // Update profile data in context
    updateProfile({
      name: username,
      email: email,
      profileImage: profileImage
    });

    // Update password if provided
    if (newPassword && currentPassword === userData.password) {
      updateProfile({ password: newPassword });
    } else if (newPassword && currentPassword !== userData.password) {
      Alert.alert('خطأ', 'كلمة المرور الحالية غير صحيحة');
      return;
    }

    Alert.alert('نجح', 'تم تحديث الملف الشخصي بنجاح');
    setShowEditForm(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const renderFollowedPartner = (partner) => (
    <View key={partner.id} style={styles.followedPartnerCard}>
      <View style={styles.partnerLogoContainer}>
        <Image source={partner.logo} style={styles.partnerLogo} resizeMode="cover" />
      </View>
      <TouchableOpacity 
        style={styles.followedButton}
        onPress={() => removeFollowedPartner(partner.id)}
      >
        <CustomText style={styles.followedButtonText}>متابع</CustomText>
        <Icon name="person" size={14} color={Colors.primaryDark} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Section with Search Bar and Notifications */}
        <View style={styles.topSection}>
        <View style={styles.profileTitle}>
            <CustomText style={styles.profileTitle}>حسابي</CustomText>
          </View>
          
          {/* Notifications */}
          <TouchableOpacity 
            ref={bellRef}
            style={styles.notificationButton}
            onLayout={(event) => {
              const { x, y } = event.nativeEvent.layout;
              setBellPosition({ x, y });
            }}
            onPress={() => {
              setShowNotifications(true);
              markNotificationsAsRead();
            }}
          >
            <Icon name="notifications-outline" size={24} color={Colors.primaryDark} />
            {!notificationsRead && (
              <View style={styles.notificationBadge}>
                <CustomText style={[styles.badgeText, { fontFamily: 'AdventPro' }]}>2</CustomText>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Profile Information Section */}
        <View style={styles.profileSection}>
          
          <View style={styles.profileContent}>
            {/* Edit Button */}
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => setShowEditForm(true)}
            >
              <CustomText style={styles.editButtonText}>تعديل</CustomText>
            </TouchableOpacity>
            
            {/* Profile Picture */}
            <View style={styles.profilePicture}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <Icon name="person" size={40} color="#CCCCCC" />
              )}
            </View>
          </View>
          {/* User Info */}
          <View style={styles.userInfo}>
            <CustomText style={styles.userName}>{username}</CustomText>
            <CustomText style={styles.userEmail}>{email}</CustomText>
          </View>
        </View>

        {/* Following Section */}
        <View style={styles.followingSection}>
          <CustomText style={styles.followingTitle}>متابعة</CustomText>
          {followedPartners.length > 0 ? (
            <View style={styles.followingGrid}>
              {followedPartners.map(renderFollowedPartner)}
            </View>
          ) : (
            <View style={styles.emptyFollowing}>
              <CustomText style={styles.emptyFollowingText}>
                لا توجد شركاء متابعين
              </CustomText>
            </View>
          )}
        </View>
      </SafeAreaView>

      {/* Edit Form Modal */}
      <Modal
        visible={showEditForm}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditForm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <CustomText style={styles.modalTitle}>تعديل الملف الشخصي</CustomText>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowEditForm(false)}
              >
                <Icon name="close" size={24} color={Colors.primaryDark} />
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              {/* Photo Upload */}
              <View style={styles.formSection}>
                <CustomText style={styles.sectionTitle}>الصورة الشخصية</CustomText>
                <TouchableOpacity style={styles.photoUploadButton} onPress={pickImage}>
                  {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.uploadedImage} />
                  ) : (
                    <View style={styles.uploadPlaceholder}>
                      <Icon name="camera" size={30} color={Colors.primary} />
                      <CustomText style={styles.uploadText}>إضافة صورة</CustomText>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              {/* Username */}
              <View style={styles.formSection}>
                <CustomText style={styles.sectionTitle}>اسم المستخدم</CustomText>
                <TextInput
                  style={styles.inputField}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="أدخل اسم المستخدم الجديد"
                  placeholderTextColor="#999"
                />
              </View>

              {/* Email */}
              <View style={styles.formSection}>
                <CustomText style={styles.sectionTitle}>البريد الإلكتروني</CustomText>
                <TextInput
                  style={styles.inputField}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="أدخل البريد الإلكتروني الجديد"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                />
              </View>

              {/* Current Password */}
              <View style={styles.formSection}>
                <CustomText style={styles.sectionTitle}>كلمة المرور الحالية</CustomText>
                <TextInput
                  style={styles.inputField}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder="أدخل كلمة المرور الحالية"
                  placeholderTextColor="#999"
                  secureTextEntry={true}
                />
              </View>

              {/* New Password */}
              <View style={styles.formSection}>
                <CustomText style={styles.sectionTitle}>كلمة المرور الجديدة</CustomText>
                <TextInput
                  style={styles.inputField}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="أدخل كلمة المرور الجديدة"
                  placeholderTextColor="#999"
                  secureTextEntry={true}
                />
              </View>

              {/* Confirm Password */}
              <View style={styles.formSection}>
                <CustomText style={styles.sectionTitle}>تأكيد كلمة المرور</CustomText>
                <TextInput
                  style={styles.inputField}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="أكد كلمة المرور الجديدة"
                  placeholderTextColor="#999"
                  secureTextEntry={true}
                />
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => setShowEditForm(false)}
                >
                  <CustomText style={styles.cancelButtonText}>إلغاء</CustomText>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.saveButton}
                  onPress={handleSave}
                >
                  <CustomText style={styles.saveButtonText}>حفظ</CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Notifications Modal */}
      <NotificationsModal
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
        bellPosition={bellPosition}
      />

      {/* Bottom Tabs */}
      <BottomTabNavigator 
        state={{ index: 4 }} 
        navigation={navigation} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  topSection: {
    backgroundColor: '#f4eac1',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    position: 'relative',
  },
  notificationButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileSection: {
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  profileContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  editButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
    marginRight: 20,
  },
  editButtonText: {
    color: Colors.primaryDark,
    fontSize: 14,
    fontWeight: '600',
  },
  profilePictureContainer: {
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#e0e0e0',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  userInfo: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.primaryDark,
    opacity: 0.8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#f4eac1',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    gap: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primaryDark,
  },
  closeButton: {
    padding: 5,
  },
  formContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  formSection: {
    marginBottom: 10,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    marginBottom: 5,
    alignSelf: 'flex-end',
  },
  inputField: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 14,
    color: Colors.primaryDark,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    width: '100%',
    textAlign: 'right',
    borderColor: Colors.primaryDark,
  },
  photoUploadButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignSelf: 'flex-end',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  uploadPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  uploadText: {
    color: Colors.primaryDark,
    fontSize: 14,
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: '40%',
  },
  cancelButtonText: {
    color: Colors.primaryDark,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: '40%',
  },
  saveButtonText: {
    color: Colors.primaryDark,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  followingSection: {
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  followingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  followingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: 15,
    width: '100%',
  },
  followedPartnerCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: 'transparent',
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  partnerLogoContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  partnerLogo: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    borderRadius: 20,
  },
  followedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4d376',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  followedButtonText: {
    color: Colors.primaryDark,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 8,
  },
  emptyFollowing: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyFollowingText: {
    color: Colors.primaryDark,
    fontSize: 16,
    opacity: 0.7,
  },
});

export default ProfileScreen; 