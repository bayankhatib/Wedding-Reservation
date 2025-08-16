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
import { SubscriptionData } from '../constants/FakeData';
import CustomButton from '../components/CustomButton';

const SubscriptionScreen = ({ navigation }) => {
  const handleContinue = () => {
    // Handle subscription continuation logic
    navigation.navigate('PaymentSuccess');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>التقسيط</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Subscription Plan */}
        <View style={styles.planSection}>
          <View style={styles.planHeader}>
            <View style={styles.planIcon}>
              <Text style={styles.planIconText}>🎁</Text>
            </View>
            <View style={styles.planInfo}>
              <Text style={styles.planName}>{SubscriptionData.plan}</Text>
              <Text style={styles.planDuration}>{SubscriptionData.duration}</Text>
            </View>
          </View>
        </View>

        {/* Payment Details */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>تفاصيل الدفع</Text>
          
          <View style={styles.paymentItem}>
            <Text style={styles.paymentLabel}>القسط الشهري:</Text>
            <Text style={styles.paymentValue}>{SubscriptionData.monthlyPayment}</Text>
          </View>
          
          <View style={styles.paymentItem}>
            <Text style={styles.paymentLabel}>الأشهر المتبقية:</Text>
            <Text style={styles.paymentValue}>{SubscriptionData.remainingMonths}</Text>
          </View>
          
          <View style={styles.paymentItem}>
            <Text style={styles.paymentLabel}>إجمالي المبلغ:</Text>
            <Text style={styles.paymentValue}>{SubscriptionData.totalAmount}</Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>مميزات الباقة</Text>
          
          {SubscriptionData.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentMethodsSection}>
          <Text style={styles.sectionTitle}>طرق الدفع</Text>
          
          <TouchableOpacity style={styles.paymentMethod}>
            <View style={styles.paymentMethodIcon}>
              <Text style={styles.paymentMethodIconText}>💳</Text>
            </View>
            <Text style={styles.paymentMethodText}>بطاقة ائتمان</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.paymentMethod}>
            <View style={styles.paymentMethodIcon}>
              <Text style={styles.paymentMethodIconText}>🏦</Text>
            </View>
            <Text style={styles.paymentMethodText}>تحويل بنكي</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.paymentMethod}>
            <View style={styles.paymentMethodIcon}>
              <Text style={styles.paymentMethodIconText}>📱</Text>
            </View>
            <Text style={styles.paymentMethodText}>محفظة إلكترونية</Text>
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <View style={styles.termsSection}>
          <Text style={styles.termsText}>
            بالضغط على "واصل على الشراء" فإنك توافق على شروط وأحكام الخدمة
          </Text>
        </View>

        <CustomButton
          title="واصل على الشراء"
          onPress={handleContinue}
          style={styles.continueButton}
        />
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'right',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  planSection: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  planIconText: {
    fontSize: 24,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'right',
    marginBottom: 5,
  },
  planDuration: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'right',
  },
  paymentSection: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'right',
    marginBottom: 15,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  paymentLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'right',
  },
  paymentValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'left',
  },
  featuresSection: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkmark: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 16,
    color: Colors.textPrimary,
    textAlign: 'right',
    flex: 1,
  },
  paymentMethodsSection: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  paymentMethodIconText: {
    fontSize: 18,
  },
  paymentMethodText: {
    fontSize: 16,
    color: Colors.textPrimary,
    textAlign: 'right',
  },
  termsSection: {
    marginBottom: 20,
  },
  termsText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  continueButton: {
    marginBottom: 20,
  },
});

export default SubscriptionScreen; 