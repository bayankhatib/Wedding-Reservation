import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/Colors';
import CustomText from '../components/CustomText';
import BottomTabNavigator from '../components/BottomTabNavigator';
import { getSubscribedPackages } from '../constants/SubscribedPackages';
import { convertArabicToEnglish, containsArabicNumbers } from '../utils/numberUtils';

const InstallmentPackagesScreen = ({ navigation, route }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [subscribedPackages, setSubscribedPackages] = useState([]);
  
  // Custom component for numbers with AdventPro font
  const NumberText = ({ children, style, ...props }) => {
    const hasNumbers = children && containsArabicNumbers(children.toString());
    const processedText = hasNumbers ? convertArabicToEnglish(children) : children;
    const fontFamily = hasNumbers ? 'AdventPro' : 'VIPRawyThin';
    
    // Debug logging
    console.log('NumberText Debug:', {
      original: children,
      hasNumbers,
      processedText,
      fontFamily
    });
    
    return (
      <CustomText style={[{ fontFamily }, style]} {...props}>
        {processedText}
      </CustomText>
    );
  };
  
  // Get all subscribed packages from global constant
  const loadSubscribedPackages = () => {
    const packages = getSubscribedPackages();
    console.log('Loading subscribed packages:', packages);
    setSubscribedPackages(packages);
  };

  // Refresh when screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadSubscribedPackages();
    });

    return unsubscribe;
  }, [navigation]);

  // Load packages on component mount
  useEffect(() => {
    loadSubscribedPackages();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <CustomText style={styles.headerTitle}>حزم التقسيط الفعالة</CustomText>
        </View>
      </View>

      {/* Package Cards Container */}
      <ScrollView contentContainerStyle={styles.packageCardsContainer}>
        {subscribedPackages.length > 0 ? (
          subscribedPackages.map((packageData, index) => (
            <View key={index} style={styles.mainCard}>
              {/* Installment Duration */}
              <View style={styles.infoSection}>
                <View style={styles.durationContainer}>
                  <NumberText style={styles.largeNumber}>{packageData.duration}</NumberText>
                  <CustomText style={styles.smallText}>/</CustomText>
                  <CustomText style={styles.descriptionText}>شهر</CustomText>
                </View>
                <CustomText style={styles.installmentText}>مع قسط شهري</CustomText>
              </View>

              {/* Monthly Installment Amount */}
              <View style={styles.infoSection}>
                <NumberText style={styles.largeNumber}>{packageData.monthlyAmount}</NumberText>
                <CustomText style={styles.bankName}>
                  {packageData.bankName || 'بنك'}
                </CustomText>
              </View>

              {/* Remaining Months */}
              <View style={styles.infoSection}>
                <CustomText style={styles.descriptionText}>الأشهر المتبقية</CustomText>
                <NumberText style={styles.largeNumber}>{packageData.remainingMonths}</NumberText>
              </View>

              {/* Remaining Installment Amount */}
              <View style={styles.infoSection}>
                <CustomText style={styles.descriptionText}>المبلغ المتبقي من القسط</CustomText>
                <NumberText style={styles.largeNumber}>{packageData.remainingAmount.toLocaleString()}</NumberText>
              </View>

              {/* Partner Info */}
              <View style={styles.partnerSection}>
                <View style={styles.offerLogosContainer}>
                  {packageData.offerLogos && packageData.offerLogos.length > 0 ? (
                    packageData.offerLogos.map((logo, logoIndex) => (
                      <View key={logoIndex} style={styles.offerLogoContainer}>
                        <View style={styles.offerLogoBackground}>
                          <Image 
                            source={logo}
                            style={styles.offerLogoImage}
                            resizeMode="cover"
                          />
                        </View>
                      </View>
                    ))
                  ) : (
                    // Fallback logo if no logos are provided
                    <View style={styles.offerLogoContainer}>
                      <View style={styles.offerLogoBackground}>
                        <Image 
                          source={require('../assets/partnersLogo/alnuman.jpg')}
                          style={styles.offerLogoImage}
                          resizeMode="cover"
                        />
                      </View>
                    </View>
                  )}
                </View>
                <View style={styles.subscribedButton}>
                  <CustomText style={styles.subscribedButtonText}>
                    {packageData.isSubscribed ? 'مشترك' : 'اشتراك'}
                  </CustomText>
                </View>
              </View>
            </View>
          ))
        ) : (
          // Show empty state when no packages are subscribed
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyStateCard}>
              <CustomText style={styles.emptyStateTitle}>لا توجد حزم مشتركة</CustomText>
              <CustomText style={styles.emptyStateDescription}>
                اشترك في حزمة الآن للبدء في استخدام خدماتنا
              </CustomText>
              <TouchableOpacity 
                style={styles.subscribeNowButton}
                onPress={() => navigation.navigate('Home')}
              >
                <CustomText style={styles.subscribeNowButtonText}>اشترك الآن</CustomText>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNavContainer}>
        <BottomTabNavigator 
          state={{ index: -1 }} // Set to installment tab (index 1)
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#f4eac1',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  refreshButton: {
    padding: 8,
  },
  packageCardsContainer: {
    padding: 20,
    paddingBottom: 70, // Add space above bottom navigation
  },
  mainCard: {
    backgroundColor: '#FFF8E1',
    marginBottom: 20, // Add space between cards
    borderRadius: 45,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  infoSection: {
    alignItems: 'center',
    marginBottom: 10,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  largeNumber: {
    fontSize: 50,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    lineHeight: 50,
    marginBottom: 5,
    fontFamily: 'AdventPro', // Default font for numbers
  },
  smallText: {
    fontSize: 20,
    color: Colors.primaryDark,
    marginHorizontal: 4,
    fontWeight: 'bold',
    lineHeight: 18,
    alignSelf: 'center',
  },
  descriptionText: {
    fontSize: 18,
    color: Colors.primaryDark,
    fontWeight: '600',
    lineHeight: 18,
    marginBottom: 10,
  },

  installmentText: {
    fontSize: 20,
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  bankName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryDark,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  partnerSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  offerLogosContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  offerLogoContainer: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  offerLogoBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  offerLogoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  subscribedButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 25,
    paddingVertical: 0,
    borderRadius: 20,
    paddingBottom: 1,
  },
  subscribedButtonText: {
    color: Colors.primaryDark,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f4eac1',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    marginBottom: 10,
  },
  emptyStateDescription: {
    fontSize: 18,
    color: Colors.primaryDark,
    textAlign: 'center',
    marginBottom: 20,
  },
  subscribeNowButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 20,
  },
  subscribeNowButtonText: {
    color: Colors.primaryDark,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InstallmentPackagesScreen;
