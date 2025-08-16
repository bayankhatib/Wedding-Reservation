import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Modal,
  Image,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from './CustomText';
import { Colors } from '../constants/Colors';
import BookingProcessModal from './BookingProcessModal';

const ClothingBookingModal = ({ visible, onClose, partnerGallery, partnerBasePrice, partnerLogo, partnerName, partnerId, partnerDiscount }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBookingProcess, setShowBookingProcess] = useState(false);

  // Reset selections when modal closes
  const handleClose = () => {
    setSelectedSize('');
    setSelectedImage(null);
    onClose();
  };

  // Handle continue booking
  const handleContinueBooking = () => {
    onClose();
    setShowBookingProcess(true);
  };
  
  const handleBookingProcessClose = () => {
    setShowBookingProcess(false);
    handleClose();
  };
  
  // Filter only images from partner gallery
  const partnerImages = partnerGallery?.filter(item => item.type === 'image') || [];

  // Check if this partner should show both old and new prices (partner IDs 12, 8, 9, 10)
  const shouldShowOldPrice = [12, 8, 9, 10].includes(partnerId);

  // Calculate discount percentage from partner data
  const getDiscountPercentage = () => {
    if (!partnerDiscount) return 0;
    return parseInt(partnerDiscount.replace('%', '')) || 0;
  };

  // Generate price variations for each image
  const generateImagePrices = () => {
    if (partnerImages.length === 0) return [];
    
    const discountPercentage = getDiscountPercentage();
    
    return partnerImages.map((image, index) => {
      const basePrice = parseInt(partnerBasePrice) || 200;
      // Use index to create unique price variations for each image
      const priceVariation = 50 + (index * 10); // Each image gets a different price
      const originalPrice = basePrice + priceVariation;
      
      // Calculate current price based on discount
      let currentPrice;
      if (discountPercentage > 0) {
        // If there's a discount, current price is the discounted price
        currentPrice = Math.round(originalPrice * (1 - discountPercentage / 100));
      } else {
        // If no discount, current price is the same as original
        currentPrice = originalPrice;
      }
      
      // Old price remains as the original price
      const oldPrice = originalPrice + 80 + (index * 5);
      
      return {
        ...image,
        index,
        currentPrice: `${currentPrice} دينار`,
        oldPrice: `${oldPrice} دينار`
      };
    });
  };

  // Generate prices once when component mounts or when partner changes
  const [imagePrices, setImagePrices] = useState([]);

  // Use useEffect to generate prices when modal opens or partner changes
  useEffect(() => {
    if (visible && partnerGallery) {
      setImagePrices(generateImagePrices());
    }
  }, [visible, partnerGallery, partnerBasePrice, partnerDiscount]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
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
            <View style={styles.bookingModalHeader}>
            <TouchableOpacity 
                style={styles.closeBookingButton}
                onPress={handleClose}
              >
                <Ionicons name="close" size={24} color={Colors.primaryDark} />
              </TouchableOpacity>
              <CustomText style={styles.bookingModalTitle}>الأزياء</CustomText>

            </View>

            {/* Gallery Images */}
            <View style={styles.gallerySection}>
              <CustomText style={styles.selectionLabel}>اختر من المعرض</CustomText>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.imageOptions}>
                  {imagePrices.map((imageItem) => (
                    <TouchableOpacity 
                      key={imageItem.index}
                      style={[
                        styles.imageOption, 
                        selectedImage?.index === imageItem.index && styles.selectedImageOption
                      ]}
                      onPress={() => {
                        if (selectedImage?.index === imageItem.index) {
                          setSelectedImage(null);
                        } else {
                          setSelectedImage(imageItem);
                        }
                      }}
                    >
                      <Image source={imageItem.source} style={styles.galleryImage} />
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Size Selection */}
            {selectedImage && (
              <View style={styles.sizeSelection}>
                <CustomText style={styles.selectionLabel}>اختر المقاس</CustomText>
                <View style={styles.sizeOptions}>
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <TouchableOpacity 
                      key={size}
                      style={[
                        styles.sizeOption, 
                        selectedSize === size && styles.selectedSizeOption
                      ]}
                      onPress={() => setSelectedSize(size)}
                    >
                      <CustomText style={[
                        styles.sizeOptionText,
                        selectedSize === size && styles.selectedSizeOptionText
                      ]}>{size}</CustomText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Pricing */}
            {selectedImage && (
              <View style={styles.pricingSection}>
                <View style={styles.priceRow}>
                  {shouldShowOldPrice ? (
                    <>
                      <CustomText style={styles.oldPrice}>{selectedImage.oldPrice}</CustomText>
                      <CustomText style={styles.currentPrice}>{selectedImage.currentPrice}</CustomText>
                    </>
                  ) : (
                    <CustomText style={styles.currentPrice}>{selectedImage.currentPrice}</CustomText>
                  )}
                </View>
              </View>
            )}

            {/* Checkout Button */}
            <TouchableOpacity 
              style={[
                styles.checkoutButton,
                (!selectedImage || !selectedSize) && styles.checkoutButtonDisabled
              ]}
              disabled={!selectedImage || !selectedSize}
              onPress={handleContinueBooking}
            >
              <CustomText style={styles.checkoutButtonText}>إتمام الإجراءات</CustomText>
            </TouchableOpacity>

            {/* Seller Info */}
            <View style={styles.sellerInfo}>
              <CustomText style={styles.sellerText}>يتم البيع بواسطة</CustomText>
              <View style={styles.sellerIcon}>
                <Image source={partnerLogo} style={styles.sellerLogo} />
              </View>
              <TouchableOpacity onPress={handleClose}>
                <Ionicons name="chevron-back" size={16} color={Colors.primaryDark} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Booking Process Modal - Rendered outside main modal */}
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
  selectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primaryDark,
    textAlign: 'right',
    marginBottom: 10,
  },
  gallerySection: {
    marginBottom: 20,
  },
  imageOptions: {
    flexDirection: 'row',
    gap: 15,
    paddingHorizontal: 5,
  },
  imageOption: {
    alignItems: 'center',
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.primaryDark,
    backgroundColor: 'transparent',
  },
  selectedImageOption: {
    backgroundColor: Colors.primaryDark,
    borderColor: Colors.primaryDark,
  },
  galleryImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  sizeSelection: {
    marginBottom: 20,
  },
  sizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sizeOption: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primaryDark,
    backgroundColor: 'transparent',
    minWidth: 40,
    alignItems: 'center',
  },
  selectedSizeOption: {
    backgroundColor: Colors.primaryDark,
  },
  sizeOptionText: {
    fontSize: 14,
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  selectedSizeOptionText: {
    color: '#F5F5DC',
  },
  pricingSection: {
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    paddingVertical: 8,
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
  sellerLogo: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default ClothingBookingModal;
