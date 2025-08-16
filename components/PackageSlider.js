import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import CustomText from './CustomText';
import { Colors } from '../constants/Colors';
import BronzePackageIcon from '../assets/icons/bronze-package.svg';
import SilverPackageIcon from '../assets/icons/silver-package.svg';
import GoldPackageIcon from '../assets/icons/gold-package.svg';
import packagesData from '../constants/packageDate';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const PackageSlider = ({ visible, onClose, selectedPackage, onSubscribe }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Get the offers from the selected package
  const offers = selectedPackage ? packagesData.find(pkg => pkg.id === selectedPackage.id)?.offers || [] : [];

  const animateToCard = (index) => {
    // Smooth transition with spring animation
    Animated.spring(slideAnim, {
      toValue: index,
      useNativeDriver: true,
      tension: 120,
      friction: 7,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    }).start();
    
    setCurrentIndex(index);
  };

  // Add smooth opacity transition for cards
  const getCardOpacity = (index) => {
    if (index === currentIndex) return 1;
    return 0.8;
  };

  const getCardScale = (index) => {
    if (index === currentIndex) return 1.0;
    return 0.8;
  };

  if (!visible) return null;

  return (
    <TouchableOpacity 
      style={styles.overlay} 
      activeOpacity={1} 
      onPress={onClose}
    >
      <TouchableOpacity 
        style={styles.modalContent} 
        activeOpacity={1}
        onPress={(e) => e.stopPropagation()}
      >
        {/* Package Cards Slider */}
        <View style={styles.sliderContent}>
          <View style={styles.cardsContainer}>
            {offers.map((offer, index) => (
              <TouchableOpacity 
                key={offer.id} 
                style={[
                  styles.sliderCard,
                  index === currentIndex && styles.activeCard,
                  index < currentIndex && styles.leftCard,
                  index > currentIndex && styles.rightCard
                ]}
                onPress={() => animateToCard(index)}
                activeOpacity={0.6}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                pressRetentionOffset={{ top: 20, bottom: 20, left: 20, right: 20 }}
              >
                {/* Header with Purple Cover and Package Image */}
                <View style={styles.cardHeader}>
                  <View style={styles.purpleHeaderCover}>
                    <View style={styles.offerCardPackageIcon}>
                      {selectedPackage?.id === 3 ? (
                        <GoldPackageIcon style={styles.offerCardPackageImage} />
                      ) : selectedPackage?.id === 2 ? (
                        <SilverPackageIcon style={styles.offerCardPackageImage} />
                      ) : (
                        <BronzePackageIcon style={styles.offerCardPackageImage} />
                      )}
                    </View>
                  </View>
                </View>
                
                <View style={styles.cardBackground} />
                
                <View style={styles.cardContent}>
                  {/* Duration Section */}
                  <View style={styles.durationSection}>
                    <View style={styles.durationContainer}>
                      <CustomText style={styles.modalDuration}>
                        {offer.duration?.split(' ')[0] || '24'}
                      </CustomText>
                      <CustomText style={styles.durationSeparator}>/</CustomText>
                      <CustomText style={styles.modalDurationText}>شهر</CustomText>
                    </View>
                  </View>

                  {/* Total Price */}
                  <View style={styles.priceSection}>
                    <CustomText style={styles.modalTotalPrice}>
                      {offer.totalPrice || '9,000'}
                    </CustomText>
                    <CustomText style={styles.modalInstallmentText}>مع قسط شهري</CustomText>
                  </View>
                  
                  {/* Monthly Price */}
                  <View style={styles.monthlySection}>
                    <CustomText style={styles.modalMonthlyPrice}>
                      {offer.monthlyPrice || '375'}
                    </CustomText>
                  </View>
                  
                  {/* Logos Section */}
                  <View style={styles.logosContainer}>
                    {offer.logos.map((logo, logoIndex) => (
                      <View key={logoIndex} style={styles.logoContainer}>
                        <View style={styles.logoBackground}>
                          <Image 
                            source={logo}
                            style={styles.logoImage}
                            resizeMode="cover"
                          />
                        </View>
                      </View>
                    ))}
                  </View>

                  {/* Subscribe Button */}
                  <TouchableOpacity 
                    style={styles.subscribeButton}
                    onPress={() => onSubscribe(offer)}
                  >
                    <CustomText style={styles.subscribeButtonText}>اشتراك</CustomText>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          {offers.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.paginationDotActive
              ]}
            />
          ))}
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  packageSliderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  packageSliderContainer: {
    backgroundColor: 'transparent',
    borderRadius: 25,
    width: screenWidth * 0.9,
    maxHeight: screenHeight * 0.8,
    overflow: 'hidden',
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: Colors.primaryDark,
  },
  sliderContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sliderScrollContent: {
    alignItems: 'center',
  },
  cardsContainer: {
    position: 'relative',
    width: '100%',
    height: screenHeight * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  sliderCard: {
    width: screenWidth * 0.6,
    height: screenHeight * 0.5,
    marginHorizontal: -30,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'absolute',
    // Mobile touch optimizations
    backfaceVisibility: 'hidden',
    willChange: 'transform',
    // Smooth transitions
    transition: 'all 0.3s ease',
  },
  activeCard: {
    zIndex: 3,
    left: '50%',
    marginLeft: -screenWidth * 0.3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    transform: [{ scale: 1.0 }],
  },
  leftCard: {
    zIndex: 1,
    left: '3%',
    transform: [{ scale: 0.8 }, { translateX: -25 }],
    opacity: 0.8,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rightCard: {
    zIndex: 1,
    left: '70%',
    marginLeft: -screenWidth * 0.3,
    transform: [{ scale: 0.8 }, { translateX: 25 }],
    opacity: 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    borderRadius: 20,
    backgroundColor: '#FFF8E1',
  },
  purpleBanner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  giftBox: {
    backgroundColor: Colors.white,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  giftBoxText: {
    fontSize: 30,
    color: Colors.primary,
  },
  cardContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    paddingTop: 50,
    justifyContent: 'space-between',
  },
  durationSection: {
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
  },
  modalDuration: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#6A1B9A',
    lineHeight: 50,
  },
  durationSeparator: {
    fontSize: 18,
    color: '#6A1B9A',
    marginHorizontal: 8,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  modalDurationText: {
    fontSize: 18,
    color: '#6A1B9A',
    fontWeight: '600',
    lineHeight: 18,
  },
  priceSection: {
    marginBottom: 10,
  },
  modalTotalPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6A1B9A',
    textAlign: 'center',
    marginBottom: 2,
  },
  modalInstallmentText: {
    fontSize: 16,
    color: '#6A1B9A',
    textAlign: 'center',
    marginBottom: 5,
  },
  modalMonthlyPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6A1B9A',
    textAlign: 'center',
    marginBottom: 8,
    marginBottom: 10,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    overflow: 'hidden',
    marginHorizontal: 5,
  },
  logoBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 25,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  subscribeButton: {
    backgroundColor: '#FDD835',
    paddingVertical: 3,
    paddingHorizontal: 10,
    width: '50%',
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subscribeButtonText: {
    color: '#6A1B9A',
    fontSize: 14,
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primaryLight,
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#FDD835',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'transparent',
    borderRadius: 25,
    width: screenWidth * 0.9,
    maxHeight: screenHeight * 0.8,
    overflow: 'hidden',
  },
  packageHeaderImage: {
    position: 'absolute',
    top: -5,
    left: 0,
    right: 0,
    height: 80,
    width: '100%',
    zIndex: 2,
  },
  cardHeader: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  purpleHeaderCover: {
    width: '100%',
    height: '80%',
    backgroundColor: '#f4d376',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  offerCardPackageIcon: {
    width: 170,
    height: 170,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  offerCardPackageImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  packageIconContainer: {
    width: 230,
    height: 230,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  packageIcon: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  packageIconText: {
    fontSize: 30,
    color: Colors.primary,
  },
  packageIconImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  logosContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  offerCardContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1001,
  },
  offerCardHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  offerCardHeaderCover: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f4eac1',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    // marginBottom: 50,
  },
  offerCardContent: {
    marginTop:100,
    backgroundColor: '#FFF8E1',
    width: screenWidth * 0.8,
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  offerDurationSection: {
    marginBottom: 10,
  },
  offerDurationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  offerDuration: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#6A1B9A',
    lineHeight: 50,
  },
  offerDurationSeparator: {
    fontSize: 18,
    color: '#6A1B9A',
    marginHorizontal: 8,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  offerDurationText: {
    fontSize: 18,
    color: '#6A1B9A',
    fontWeight: '600',
    lineHeight: 18,
  },
  offerPriceSection: {
    marginBottom: 10,
  },
  offerTotalPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6A1B9A',
    textAlign: 'center',
    marginBottom: 2,
  },
  offerInstallmentText: {
    fontSize: 16,
    color: '#6A1B9A',
    textAlign: 'center',
    marginBottom: 5,
  },
  offerMonthlySection: {
    marginBottom: 10,
  },
  offerMonthlyPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6A1B9A',
    textAlign: 'center',
    marginBottom: 8,
  },
  bankSection: {
    marginBottom: 10,
  },
  bankText: {
    fontSize: 16,
    color: '#6A1B9A',
    textAlign: 'center',
    marginBottom: 5,
  },
  bankLogoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankLogo: {
    backgroundColor: Colors.white,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
  },
  bankLogoText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  bankDropdown: {
    backgroundColor: Colors.primaryLight,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  bankDropdownText: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: 'bold',
  },
  installmentSection: {
    marginBottom: 10,
  },
  installmentLabel: {
    fontSize: 16,
    color: '#6A1B9A',
    textAlign: 'center',
    marginBottom: 5,
  },
  installmentAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A1B9A',
    textAlign: 'center',
  },
  offerLogosContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  offerLogoContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    overflow: 'hidden',
    marginHorizontal: 5,
  },
  offerLogoBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 25,
  },
  offerLogoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  offerSubscribeButton: {
    backgroundColor: '#FDD835',
    paddingVertical: 3,
    paddingHorizontal: 10,
    width: '50%',
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  offerSubscribeButtonText: {
    color: '#6A1B9A',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default PackageSlider;
