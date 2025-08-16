import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';
import CustomButton from '../components/CustomButton';

const AboutUsScreen = ({ navigation }) => {
  const handleJoinNow = () => {
    navigation.navigate('CreateBusinessAccount');
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
          <Text style={styles.title}>انضم إلى فريق بتفرحك</Text>
          
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.description}>
              مرحباً بك في منصة بتفرحك، المنصة الأولى في مجال تخطيط الأعراس والمناسبات. 
              نحن نقدم لك الفرصة للانضمام إلى شبكة من المحترفين المتميزين في مجال الخدمات.
            </Text>

            <Text style={styles.sectionTitle}>مزايا الانضمام:</Text>
            
            <View style={styles.benefitItem}>
              <Text style={styles.benefitTitle}>• أدوات مبتكرة</Text>
              <Text style={styles.benefitText}>
                احصل على أحدث الأدوات والتقنيات لإدارة أعمالك بكفاءة عالية
              </Text>
            </View>

            <View style={styles.benefitItem}>
              <Text style={styles.benefitTitle}>• الوصول للعملاء</Text>
              <Text style={styles.benefitText}>
                تواصل مع آلاف العملاء المحتملين في منطقتك
              </Text>
            </View>

            <View style={styles.benefitItem}>
              <Text style={styles.benefitTitle}>• شبكة علاقات</Text>
              <Text style={styles.benefitText}>
                انضم إلى مجتمع من المحترفين وابني علاقات قوية
              </Text>
            </View>

            <View style={styles.benefitItem}>
              <Text style={styles.benefitTitle}>• تبسيط الإدارة</Text>
              <Text style={styles.benefitText}>
                إدارة الحجوزات والمدفوعات بسهولة من خلال منصة واحدة
              </Text>
            </View>

            <Text style={styles.footerText}>
              ابدأ رحلتك معنا اليوم وكن جزءاً من نجاح منصة بتفرحك
            </Text>
          </ScrollView>

          <CustomButton
            title="الانضمام الآن"
            onPress={handleJoinNow}
            style={styles.joinButton}
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
    flex: 1,
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
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'right',
    lineHeight: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'right',
    marginBottom: 15,
  },
  benefitItem: {
    marginBottom: 15,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    textAlign: 'right',
    marginBottom: 5,
  },
  benefitText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'right',
    lineHeight: 20,
  },
  footerText: {
    fontSize: 16,
    color: Colors.textPrimary,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 20,
  },
  joinButton: {
    marginTop: 20,
  },
});

export default AboutUsScreen; 