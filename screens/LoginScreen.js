import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomText';
import Logo from '../assets/logo.svg';
import BgLogo from '../assets/bg-logo.svg';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    navigation.navigate('MainApp');
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
        <View style={styles.header}>
          <Logo width={435} height={205} />
        </View>

        <View style={styles.formContainer}>
          <CustomText style={styles.title}>تسجيل الدخول</CustomText>
          
            <CustomInput
              label="البريد الإلكتروني"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.input}
              containerStyle={styles.inputContainer}
            />

            <CustomInput
              label="كلمة المرور"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              containerStyle={styles.inputContainer}
            />

          <CustomButton
            title="تسجيل الدخول"
            onPress={handleLogin}
            style={styles.loginButton}
          />

          <View style={styles.linksContainer}>
            {/* <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.link}>هل نسيت كلمة المرور؟</Text>
            </TouchableOpacity> */}
            
            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
              <CustomText style={styles.link}>إنشاء حساب</CustomText>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
              <Text style={styles.link}>إنشاء حساب / إنشاء حساب عمل</Text>
            </TouchableOpacity> */}
            
            {/* <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
              <Text style={styles.link}>تسجيل</Text>
            </TouchableOpacity> */}
          </View>
        </View>
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
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 10,
  },
  formContainer: {
    flex: 1,
    paddingTop: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 38,
  },
  inputContainer: {
    width: '50%',
    marginBottom: 10,
  },
  loginButton: {
    marginTop: 10,
    width: '35%',
    height: 40,
  },
  linksContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  link: {
    color: Colors.white,
    fontSize: 14,
    marginVertical: 8,
    textAlign: 'center',
    lineHeight: 18,
  },
  input: {
      borderWidth: 1,
      borderColor: Colors.lightGray,
      borderRadius: 50,
      paddingHorizontal: 10,
      paddingVertical: 10,
      fontSize: 16,
      backgroundColor: Colors.input,
      color: Colors.textPrimary,
      textAlign: 'right',
      lineHeight: 24, 
    },

});

export default LoginScreen; 