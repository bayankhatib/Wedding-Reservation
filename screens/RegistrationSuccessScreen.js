import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';
import CustomButton from '../components/CustomButton';

const RegistrationSuccessScreen = ({ navigation }) => {
  const handleContinue = () => {
    navigation.navigate('MainApp');
  };

  return (
    <LinearGradient
      colors={[Colors.primaryDark, '#8B2D8B']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.logo}>منفرحك</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.successIcon}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
          
          <Text style={styles.title}>تم استلام طلب التسجيل بنجاح</Text>
          
          <Text style={styles.message}>
            شكراً لك على التسجيل في منصة بتفرحك. تم استلام طلبك بنجاح وسيتم مراجعته من قبل فريقنا المختص.
          </Text>

          <Text style={styles.details}>
            سيتم إرسال تفاصيل التفعيل إلى بريدك الإلكتروني ورقم هاتفك المسجل خلال 24-48 ساعة عمل.
          </Text>

          <Text style={styles.contact}>
            للاستفسارات، يمكنك التواصل معنا عبر:
            {'\n'}البريد الإلكتروني: support@bitfarhak.com
            {'\n'}الهاتف: 966-11-123-4567
          </Text>

          <CustomButton
            title="العودة للصفحة الرئيسية"
            onPress={handleContinue}
            style={styles.continueButton}
          />
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
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkmark: {
    fontSize: 40,
    color: Colors.white,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  details: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  contact: {
    fontSize: 14,
    color: Colors.primary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  continueButton: {
    width: '100%',
  },
});

export default RegistrationSuccessScreen; 