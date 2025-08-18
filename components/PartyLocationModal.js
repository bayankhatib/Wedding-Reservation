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
import { Colors }from '../constants/Colors';
import BookingProcessModal from './BookingProcessModal';

const PartyLocationModal = ({
  visible,
  onClose,
  partnerName,
  partnerLogo,
  partnerBasePrice,
  partnerId,
  partnerDiscount,
}) => {
  const [selectedHallType, setSelectedHallType] = useState(null);
  const [showBookingProcess, setShowBookingProcess] = useState(false);

  // Extract numeric price from partnerBasePrice (remove "دينار" and convert to number)
  const basePriceNumber = typeof partnerBasePrice === 'string' 
    ? parseInt(partnerBasePrice.replace(/[^\d]/g, '')) || 1000
    : partnerBasePrice || 1000;

  // Hall types with their base prices
  const hallTypes = [
    { id: 1, name: 'قاعة داخلية', type: 'inside', basePrice: basePriceNumber },
    { id: 2, name: 'قاعة خارجية', type: 'outside', basePrice: Math.round(basePriceNumber * 1.2) },
    { id: 3, name: 'قاعة الملك', type: 'king', basePrice: Math.round(basePriceNumber * 1.5) },
    { id: 4, name: 'قاعة VIP', type: 'vip', basePrice: Math.round(basePriceNumber * 1.8) },
    { id: 5, name: 'حديقة', type: 'garden', basePrice: Math.round(basePriceNumber * 0.9) },
    { id: 6, name: 'شاطئ', type: 'beach', basePrice: Math.round(basePriceNumber * 1.3) },
  ];

  const [currentPrice, setCurrentPrice] = useState(basePriceNumber || 1000);
  const [oldPrice, setOldPrice] = useState(Math.round((basePriceNumber || 1000) * 1.2));

  // Check if this partner should show both old and new prices (partner IDs 5, 6)
  const shouldShowOldPrice = [5, 6].includes(partnerId);

  // Calculate discount percentage from partner data
  const getDiscountPercentage = () => {
    if (!partnerDiscount) return 0;
    return parseInt(partnerDiscount.replace('%', '')) || 0;
  };

  useEffect(() => {
    if (selectedHallType) {
      const hall = hallTypes.find(h => h.id === selectedHallType);
      if (hall && hall.basePrice) {
        // Calculate current price based on discount
        const discountPercentage = getDiscountPercentage();
        let currentPrice;
        if (discountPercentage > 0) {
          // If there's a discount, current price is the discounted price
          currentPrice = Math.round(hall.basePrice * (1 - discountPercentage / 100));
        } else {
          // If no discount, current price is the same as original
          currentPrice = hall.basePrice;
        }
        
        setCurrentPrice(currentPrice);
        
        // Old price remains as the original hall price
        setOldPrice(Math.round(hall.basePrice * 1.2));
      }
    }
  }, [selectedHallType, basePriceNumber, partnerDiscount]);

  const handleClose = () => {
    setSelectedHallType(null);
    onClose();
  };

  const handleContinueBooking = () => {
    onClose();
    setShowBookingProcess(true);
  };

  // Handle booking process close
  const handleBookingProcessClose = () => {
    setShowBookingProcess(false);
    handleClose();
  };
  const toggleHallTypeSelection = (hallId) => {
    if (selectedHallType === hallId) {
      setSelectedHallType(null);
      // Reset to base price when deselecting
      setCurrentPrice(basePriceNumber || 1000);
      setOldPrice(Math.round((basePriceNumber || 1000) * 1.2));
    } else {
      setSelectedHallType(hallId);
    }
  };

  // Don't render if we don't have valid base price
  if (!basePriceNumber || isNaN(basePriceNumber)) {
    console.error('PartyLocationModal: Invalid base price:', partnerBasePrice);
    return null;
  }

  return (
    <>
      <Modal
        visible={visible}
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
              <CustomText style={styles.bookingModalTitle}>اختيار نوع القاعة</CustomText>
            </View>

            {/* Hall Types Selection */}
                          <View style={styles.hallTypesSection}>
                <View style={styles.hallTypesContainer}>
                  {hallTypes.map((hall) => (
                    <TouchableOpacity
                      key={hall.id}
                      style={[
                        styles.hallTypeTag,
                        selectedHallType === hall.id && styles.selectedHallTypeTag
                      ]}
                      onPress={() => toggleHallTypeSelection(hall.id)}
                    >
                      <CustomText style={[
                        styles.hallTypeText,
                        selectedHallType === hall.id && styles.selectedHallTypeText
                      ]}>
                        {hall.name}
                      </CustomText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

            {/* Pricing Section */}
            {selectedHallType && (
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
                !selectedHallType && styles.checkoutButtonDisabled
              ]}
              onPress={handleContinueBooking}
              disabled={!selectedHallType}
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
  hallTypesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primaryDark,
    marginBottom: 10,
    textAlign: 'right',
  },
  hallTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 5,
  },
  hallTypeTag: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primaryDark,
    backgroundColor: 'transparent',
    marginBottom: 8,
  },
  selectedHallTypeTag: {
    backgroundColor: Colors.primaryDark,
    borderColor: Colors.primaryDark,
  },
  hallTypeText: {
    fontSize: 12,
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  selectedHallTypeText: {
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

export default PartyLocationModal;
