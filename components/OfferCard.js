import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from './CustomText';
import { Colors } from '../constants/Colors';
import BronzePackageIcon from '../assets/icons/bronze-package.svg';
import SilverPackageIcon from '../assets/icons/silver-package.svg';
import GoldPackageIcon from '../assets/icons/gold-package.svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const OfferCard = ({ 
  visible, 
  onClose, 
  selectedPackage, 
  selectedOffer, 
  onSubscribe 
}) => {
  const [selectedBank, setSelectedBank] = useState('itehad-bank');
  const [showBankList, setShowBankList] = useState(false);

  const banks = [
    { id: 'itehad-bank', name: 'بنك الاتحاد', englishName: 'Bank Al Etihad', logo: require('../assets/icons/itehad-bank.png') },
    { id: 'kuwait-bank', name: 'بنك الكويتي الأردني', englishName: 'Kuwait Bank', logo: require('../assets/icons/kuwait-bank.png') },
    { id: 'housing-bank', name: 'بنك العربي', englishName: 'Housing Bank', logo: require('../assets/icons/housing-bank.png') },
    { id: 'capital-bank', name: 'بنك كابيتال', englishName: 'Capital Bank', logo: require('../assets/icons/capital-bank.png') },
    { id: 'cairo-bank', name: 'بنك القاهرة عمان', englishName: 'Cairo Bank', logo: require('../assets/icons/cairo-bank.png') },
  ];

  if (!visible || !selectedOffer) return null;

  return (
    <TouchableOpacity 
      style={styles.overlay} 
      activeOpacity={1} 
      onPress={onClose}
    >
      <TouchableOpacity 
        style={styles.offerCardContainer} 
        activeOpacity={1}
        onPress={(e) => e.stopPropagation()}
      >
        {/* Offer Card Header */}
        <View style={styles.offerCardHeader}>
          <View style={styles.offerCardHeaderCover}>
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

        {/* Offer Card Content */}
        <View style={styles.offerCardContent}>
          {/* Duration Section */}
          <View style={styles.offerDurationSection}>
            <View style={styles.offerDurationContainer}>
              <CustomText style={styles.offerDuration}>
                {selectedOffer.duration?.split(' ')[0] || '24'}
              </CustomText>
              <CustomText style={styles.offerDurationSeparator}>/</CustomText>
              <CustomText style={styles.offerDurationText}>شهر</CustomText>
            </View>
          </View>
          {/* Monthly Price */}
          <View style={styles.offerMonthlySection}>
          <CustomText style={styles.offerInstallmentText}>مع قسط شهري</CustomText>
            <CustomText style={styles.offerMonthlyPrice}>
              {selectedOffer.monthlyPrice || '375'}
            </CustomText>
          </View>

          {/* Bank Section */}
          <View style={styles.bankSection}>
            <CustomText style={styles.bankText}>بنوك نثق بها لتلبية احتياجاتكم من الأقساط</CustomText>
            <TouchableOpacity 
              style={styles.bankSelectionContainer}
              onPress={() => setShowBankList(!showBankList)}
            >
              <View style={styles.selectedBankDisplay}>
                <CustomText style={styles.selectedBankName}>
                  {banks.find(bank => bank.id === selectedBank)?.name}
                </CustomText>
              </View>
              <View style={styles.dropdownArrow}>
                <Ionicons name="chevron-down" size={20} color="#6A1B9A" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Installment Amount */}
          <View style={styles.installmentSection}>
            <CustomText style={styles.installmentLabel}>مبلغ القسط</CustomText>
             {/* Total Price Section */}
            <CustomText style={styles.offerTotalPrice}>
            {selectedOffer.totalPrice}
            </CustomText>
          </View>

          {/* Partner Logos */}
          <View style={styles.offerLogosContainer}>
            {selectedOffer.logos.map((logo, logoIndex) => (
              <View key={logoIndex} style={styles.offerLogoContainer}>
                <View style={styles.offerLogoBackground}>
                  <Image 
                    source={logo}
                    style={styles.offerLogoImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
            ))}
          </View>

          {/* Subscribe Button */}
          <TouchableOpacity 
            style={styles.offerSubscribeButton}
            onPress={() => onSubscribe({
              ...selectedOffer,
              selectedBank: banks.find(bank => bank.id === selectedBank)
            })}
          >
            <CustomText style={styles.offerSubscribeButtonText}>اشتراك</CustomText>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Bank List Dropdown - Moved outside the card */}
      {showBankList && (
        <View style={styles.bankListContainer}>
          {banks.map((bank) => (
            <TouchableOpacity
              key={bank.id}
              style={[
                styles.bankOptionContainer,
                selectedBank === bank.id && styles.selectedBankOption
              ]}
              onPress={() => {
                setSelectedBank(bank.id);
                setShowBankList(false);
              }}
            >
              <CustomText style={[
                styles.bankOptionText,
                selectedBank === bank.id && styles.selectedBankOptionText
              ]}>
                {bank.name}
              </CustomText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
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
  offerCardContainer: {
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
    position: 'relative', // Add positioning context for the dropdown
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
  },
  offerCardPackageIcon: {
    width: 200,
    height: 200,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  offerCardPackageImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  offerCardContent: {
    marginTop: 100,
    alignItems: 'center',
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
    fontSize: 42,
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
  bankSelectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the content
    alignSelf: 'center', // Center the container itself
    width: 'auto', // Don't take full width
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedBankDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the logo
  },
  selectedBankName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A1B9A',
    textAlign: 'center',
    marginRight: 15,
  },
  dropdownArrow: {
    paddingLeft: 0,
  },
  dropdownArrowText: {
    fontSize: 20,
    color: '#6A1B9A',
    fontWeight: 'bold',
  },
  bankListContainer: {
    position: 'absolute',
    top: 500, // Position it to start under the bank selection arrow
    left: '50%', // Center horizontally
    transform: [{ translateX: -50 }], // Center horizontally only
    backgroundColor: '#FFF8E1',
    borderRadius: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 200, // Give it a minimum width
    alignItems: 'center', // Center the bank options
    zIndex: 10000, // Much higher z-index to appear above all card content
  },
  bankOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5, // Reduced from 10 to 5
    paddingHorizontal: 15,
    zIndex: 10000,
  },
  selectedBankOption: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  selectedBankOptionText: {
    color: '#6A1B9A',
    fontWeight: 'bold',
  },
  bankOptionText: {
    fontSize: 16,
    color: '#6A1B9A',
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  bankOptionTextContainer: {
    flexDirection: 'column',
  },
  bankOptionArabicText: {
    fontSize: 14,
    color: '#6A1B9A',
    fontWeight: 'bold',
  },
  bankOptionEnglishText: {
    fontSize: 12,
    color: '#6A1B9A',
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

export default OfferCard;
