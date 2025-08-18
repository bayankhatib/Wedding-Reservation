import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import { Colors } from '../constants/Colors';
import BookingProcessModal from './BookingProcessModal';

const MakeupBookingModal = ({
  visible,
  onClose,
  partnerName,
  partnerLogo,
  partnerBasePrice,
  partnerId,
  partnerDiscount,
}) => {
  const [selectedMakeupType, setSelectedMakeupType] = useState(null);
  const [showBookingProcess, setShowBookingProcess] = useState(false);

  // Extract numeric price from partnerBasePrice (remove "دينار" and convert to number)
  const basePriceNumber = typeof partnerBasePrice === 'string' 
    ? parseInt(partnerBasePrice.replace(/[^\d]/g, '')) || 1000
    : partnerBasePrice || 1000;
    
  console.log('MakeupBookingModal - partnerBasePrice:', partnerBasePrice);
  console.log('MakeupBookingModal - basePriceNumber:', basePriceNumber);
  console.log('MakeupBookingModal - partnerId:', partnerId);
  console.log('MakeupBookingModal - partnerDiscount:', partnerDiscount);

  // Makeup types with their base prices
  const makeupTypes = [
    { id: 1, name: 'مكياج عروس', type: 'bride', basePrice: basePriceNumber },
    { id: 2, name: 'مكياج حنة', type: 'family', basePrice: Math.round(basePriceNumber * 0.8) },
    { id: 3, name: 'مكياج حفلة', type: 'party', basePrice: Math.round(basePriceNumber * 0.7) },
    { id: 4, name: 'مكياج يومي', type: 'daily', basePrice: Math.round(basePriceNumber * 0.5) },
    { id: 5, name: 'مكياج مسائي', type: 'evening', basePrice: Math.round(basePriceNumber * 0.9) },
    { id: 6, name: 'مكياج تخرج', type: 'vip', basePrice: Math.round(basePriceNumber * 1.3) },
  ];

  const [currentPrice, setCurrentPrice] = useState(basePriceNumber || 1000);
  const [oldPrice, setOldPrice] = useState(Math.round((basePriceNumber || 1000) * 1.2));

  // Check if this partner should show both old and new prices (partner ID 15)
  const shouldShowOldPrice = partnerId === 15;

  // Calculate discount percentage from partner data
  const getDiscountPercentage = () => {
    if (!partnerDiscount) return 0;
    return parseInt(partnerDiscount.replace('%', '')) || 0;
  };

  useEffect(() => {
    if (selectedMakeupType) {
      const makeup = makeupTypes.find(m => m.id === selectedMakeupType);
      if (makeup && makeup.basePrice) {
        // Calculate current price based on discount
        const discountPercentage = getDiscountPercentage();
        let currentPrice;
        if (discountPercentage > 0) {
          // If there's a discount, current price is the discounted price
          currentPrice = Math.round(makeup.basePrice * (1 - discountPercentage / 100));
        } else {
          // If no discount, current price is the same as original
          currentPrice = makeup.basePrice;
        }
        
        setCurrentPrice(currentPrice);
        
        // Old price remains as the original makeup price
        setOldPrice(Math.round(makeup.basePrice * 1.2));
      }
    }
  }, [selectedMakeupType, basePriceNumber, partnerDiscount]);

  const handleClose = () => {
    setSelectedMakeupType(null);
    onClose();
  };

  const handleBookingProcessClose = () => {
    setShowBookingProcess(false);
    handleClose();
  };

  const handleContinueBooking = () => {
    onClose(); // Close the main modal first
    setShowBookingProcess(true);
  };

  const toggleMakeupTypeSelection = (makeupId) => {
    if (selectedMakeupType === makeupId) {
      setSelectedMakeupType(null);
      // Reset to base price when deselecting
      setCurrentPrice(basePriceNumber || 1000);
      setOldPrice(Math.round((basePriceNumber || 1000) * 1.2));
    } else {
      setSelectedMakeupType(makeupId);
    }
  };

  // Don't render if we don't have valid base price
  if (!basePriceNumber || isNaN(basePriceNumber)) {
    console.error('MakeupBookingModal: Invalid base price:', partnerBasePrice);
    return null;
  }

  return (
    <>
      <Modal
        visible={visible && !showBookingProcess}
        transparent={true}
        animationType="slide"
        onRequestClose={handleClose}
      >
        <TouchableOpacity 
          style={styles.bookingModalOverlay}
          activeOpacity={1}
          onPress={handleClose}
        >
          <TouchableOpacity 
            style={styles.bookingModalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <View style={styles.bookingModalHeader}>
            <TouchableOpacity style={styles.closeBookingButton} onPress={handleClose}>
                <Icon name="close" size={24} color={Colors.primaryDark} />
              </TouchableOpacity>
              <CustomText style={styles.bookingModalTitle}>اختيار نوع المكياج</CustomText>
            </View>

            {/* Makeup Types Selection */}
            <View style={styles.makeupTypesSection}>
              <View style={styles.makeupTypesContainer}>
                {makeupTypes.map((makeup) => (
                  <TouchableOpacity
                    key={makeup.id}
                    style={[
                      styles.makeupTypeTag,
                      selectedMakeupType === makeup.id && styles.selectedMakeupTypeTag
                    ]}
                    onPress={() => toggleMakeupTypeSelection(makeup.id)}
                  >
                    <CustomText style={[
                      styles.makeupTypeText,
                      selectedMakeupType === makeup.id && styles.selectedMakeupTypeText
                    ]}>
                      {makeup.name}
                    </CustomText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Pricing Section */}
            {selectedMakeupType && (
              <View style={styles.pricingSection}>
                <View style={styles.priceRow}>
                  {shouldShowOldPrice ? (
                    <>
                      <CustomText style={styles.oldPrice}>
                        <CustomText style={{ fontFamily: 'AdventPro' }}>{isNaN(oldPrice) ? Math.round(basePriceNumber * 1.2) : oldPrice}</CustomText> دينار
                      </CustomText>
                      <CustomText style={styles.currentPrice}>
                        <CustomText style={{ fontFamily: 'AdventPro' }}>{isNaN(currentPrice) ? basePriceNumber : currentPrice}</CustomText> دينار
                      </CustomText>
                    </>
                  ) : (
                    <CustomText style={styles.currentPrice}>
                      <CustomText style={{ fontFamily: 'AdventPro' }}>{isNaN(currentPrice) ? basePriceNumber : currentPrice}</CustomText> دينار
                    </CustomText>
                  )}
                </View>
              </View>
            )}

            {/* Checkout Button */}
            <TouchableOpacity
              style={[
                styles.checkoutButton,
                !selectedMakeupType && styles.checkoutButtonDisabled
              ]}
              onPress={handleContinueBooking}
              disabled={!selectedMakeupType}
            >
              <CustomText style={styles.checkoutButtonText}>
                إتمام الإجراءات
              </CustomText>
            </TouchableOpacity>

            {/* Seller Info */}
            <View style={styles.sellerInfo}>
              <CustomText style={styles.sellerText}>يتم البيع بواسطة</CustomText>
              <View style={styles.sellerIcon}>
                <Image source={partnerLogo} style={styles.partnerLogoImage} />
              </View>
              <TouchableOpacity onPress={handleClose}>
                <Icon name="chevron-back" size={16} color={Colors.primaryDark} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <BookingProcessModal
        visible={showBookingProcess}
        onClose={handleBookingProcessClose}
        partnerName={partnerName}
        partnerLogo={partnerLogo}
        key="booking-process-modal"
      />
    </>
  );
};

const styles = StyleSheet.create({
  bookingModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingModalContent: {
    backgroundColor: 'rgba(244,234,193, 0.9)',
    borderRadius: 30,
    padding: 20,
    width: '85%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bookingModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bookingModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'center',
    flex: 1,
  },
  closeBookingButton: {
    padding: 5,
  },
  makeupTypesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primaryDark,
    marginBottom: 10,
    textAlign: 'right',
  },
  makeupTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 5,
  },
  makeupTypeTag: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primaryDark,
    backgroundColor: 'transparent',
    marginBottom: 8,
  },
  selectedMakeupTypeTag: {
    backgroundColor: Colors.primaryDark,
    borderColor: Colors.primaryDark,
  },
  makeupTypeText: {
    fontSize: 12,
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  selectedMakeupTypeText: {
    color: '#F5F5DC',
  },
  pricingSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  pricingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    marginBottom: 15,
    textAlign: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  oldPrice: {
    fontSize: 16,
    color: Colors.primaryDark,
    textDecorationLine: 'line-through',
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryDark,
  },
  checkoutButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 6,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    width:'60%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  checkoutButtonDisabled: {
    backgroundColor: '#D3D3D3',
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primaryDark,
  },
  sellerInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  sellerText: {
    fontSize: 12,
    color: Colors.primaryDark,
  },
  sellerIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  partnerLogoImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  sellerName: {
    fontSize: 14,
    color: Colors.primaryDark,
    fontWeight: '500',
  },
});

export default MakeupBookingModal;
