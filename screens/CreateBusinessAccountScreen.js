import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const CreateBusinessAccountScreen = ({ navigation }) => {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const [services, setServices] = useState('');

  const handleCreateBusinessAccount = () => {
    // Handle business account creation logic here
    navigation.navigate('TermsOfService1');
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

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.title}>إنشاء حساب عمل</Text>
            
            <CustomInput
              label="اسم العمل"
              placeholder="أدخل اسم العمل"
              value={businessName}
              onChangeText={setBusinessName}
            />

            <CustomInput
              label="نوع العمل"
              placeholder="أدخل نوع العمل"
              value={businessType}
              onChangeText={setBusinessType}
            />

            <CustomInput
              label="البريد الإلكتروني للعمل"
              placeholder="أدخل البريد الإلكتروني للعمل"
              value={businessEmail}
              onChangeText={setBusinessEmail}
              keyboardType="email-address"
            />

            <CustomInput
              label="رقم الهاتف للعمل"
              placeholder="أدخل رقم الهاتف للعمل"
              value={businessPhone}
              onChangeText={setBusinessPhone}
              keyboardType="phone-pad"
            />

            <CustomInput
              label="العنوان"
              placeholder="أدخل عنوان العمل"
              value={address}
              onChangeText={setAddress}
            />

            <CustomInput
              label="المدينة"
              placeholder="أدخل المدينة"
              value={city}
              onChangeText={setCity}
            />

            <CustomInput
              label="البلد"
              placeholder="أدخل البلد"
              value={country}
              onChangeText={setCountry}
            />

            <CustomInput
              label="وصف العمل"
              placeholder="أدخل وصف مفصل للعمل"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />

            <CustomInput
              label="الموقع الإلكتروني"
              placeholder="أدخل الموقع الإلكتروني (اختياري)"
              value={website}
              onChangeText={setWebsite}
              keyboardType="url"
            />

            <CustomInput
              label="صفحات التواصل الاجتماعي"
              placeholder="أدخل روابط صفحات التواصل الاجتماعي (اختياري)"
              value={socialMedia}
              onChangeText={setSocialMedia}
            />

            <CustomInput
              label="الخدمات المقدمة"
              placeholder="أدخل قائمة الخدمات المقدمة"
              value={services}
              onChangeText={setServices}
              multiline
              numberOfLines={3}
            />

            <CustomButton
              title="إنشاء حساب"
              onPress={handleCreateBusinessAccount}
              style={styles.createButton}
            />
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
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 30,
    marginBottom: 20,
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
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 30,
  },
  createButton: {
    marginTop: 20,
  },
});

export default CreateBusinessAccountScreen; 