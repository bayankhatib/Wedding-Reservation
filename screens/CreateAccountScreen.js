import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomText';
import Logo from '../assets/logo.svg';
import BgLogo from '../assets/bg-logo.svg';
import { useUser } from '../contexts/UserContext';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');

const CreateAccountScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { registerUser } = useUser();

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

  const handleCreateAccount = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    // Save user data to context
    registerUser(name, email, password, profileImage);
    
    // Show success message
    Alert.alert(
      'نجح التسجيل',
      'تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول',
      [
        {
          text: 'حسناً',
          onPress: () => navigation.navigate('Login')
        }
      ]
    );
  };

  return (
    <LinearGradient
      colors={[Colors.primaryDark, '#6f0c77']}
      style={styles.container}
    >
      <View style={styles.backgroundLogo}>
        <BgLogo width={height * 0.9} height={height * 0.95} />
      </View>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Logo width={435} height={205} />
          </View>

          <View style={styles.card}>
            <CustomText style={styles.title}>إنشاء حساب</CustomText>
            
            <View style={styles.profileSection}>
              <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
                <CustomText style={styles.editImageText}>تحميل صورة</CustomText>
              </TouchableOpacity>
              <View style={styles.imageContainer}>
                <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                  {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.profileImage} />
                  ) : (
                    <View style={styles.imagePlaceholder}>
                      <CustomText style={styles.imageText}>👤</CustomText>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              
            </View>

            <View style={styles.inputSection}>
            <View style={styles.inputRow}>
                <CustomInput
                  placeholder={"اسم المستخدم"}
                  value={name}
                  onChangeText={setName}
                  keyboardType="default"
                  style={styles.input}
                  containerStyle={styles.inputContainer}
                />
              </View>
              <View style={styles.inputRow}>
                <CustomInput
                  placeholder={"البريد الاكتروني"}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  style={styles.input}
                  containerStyle={styles.inputContainer}
                />
              </View>
              <View style={styles.inputRow}>
                <CustomInput
                  placeholder={"كلمة المرور"}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={styles.input}
                  containerStyle={styles.inputContainer}
                />
              </View>
            </View>

            <CustomButton
              title="تسجيل"
              onPress={handleCreateAccount}
              style={styles.createButton}
            />

            <View style={styles.linksContainer}> 
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <CustomText style={styles.link}> لديك حساب؟ تسجيل الدخول</CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    zIndex: 1,
  },
  backgroundLogo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 0,
  },
  card: {
    backgroundColor: '#f4eac1',
    marginHorizontal: 45,
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    color: Colors.primaryDark,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 32,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
  },
  imageButton: {
    width: 60,
    height: 60,
    borderRadius: 40,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  imageText: {
    fontSize: 20,
    textAlign: 'center',
  },
  editImageButton: {
    backgroundColor: '#f4d376',
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 25,
  },
  editImageText: {
    color: Colors.primaryDark,
    fontSize: 14,
    textAlign: 'center',
  },
  inputSection: {
    marginBottom: 0,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    height: 40,
    width: '100%',
    justifyContent: 'flex-end',
  },
  inputContainer: {
    width: '70%',
    height: 40,
    alignSelf: 'center',
    marginRight: 25,
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primaryDark,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8, // Increased padding for better height
    fontSize: 16,
    backgroundColor: '#f4eac1',
    color: Colors.primaryDark,
    textAlign: 'right',
    lineHeight: 24, // Adjusted line height
    height: 30, // Fixed height to match container
  },
  createButton: {
    width: '40%',
    alignSelf: 'center',
    height: 30,
  },
  linksContainer: {
    alignItems: 'center',
  },
  link: {
    color: Colors.primaryDark,
    fontSize: 14, 
    marginVertical: 8,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default CreateAccountScreen; 