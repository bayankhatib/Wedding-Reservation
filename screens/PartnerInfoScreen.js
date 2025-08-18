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
  Alert,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/Colors';
import CustomText from '../components/CustomText';
import { useFavorites } from '../contexts/FavoritesContext';
import { useFollow } from '../contexts/FollowContext';
import { PartnerDetails } from '../constants/PartnerData';
import { Video } from 'expo-av';
import BottomTabNavigator from '../components/BottomTabNavigator';
import ClothingBookingModal from '../components/ClothingBookingModal';
import CarRentalModal from '../components/CarRentalModal';
import PartyLocationModal from '../components/PartyLocationModal';
import MakeupBookingModal from '../components/MakeupBookingModal';

const PartnerInfoScreen = ({ navigation, route }) => {
  const { partnerId } = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [carRentalModalVisible, setCarRentalModalVisible] = useState(false);
  const [partyLocationModalVisible, setPartyLocationModalVisible] = useState(false);
  const [makeupBookingModalVisible, setMakeupBookingModalVisible] = useState(false);

  const partner = PartnerDetails[partnerId];
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isPartnerFollowed, toggleFollow } = useFollow();

  // Check if partner is in clothes category
  const isClothesPartner = [8, 9, 10, 11, 12].includes(partnerId);

  // Check if partner is in cars category
  const isCarPartner = [13, 14].includes(partnerId);

  // Check if partner is in party location category
  const isPartyLocationPartner = [1, 2, 3, 4, 5, 6, 7].includes(partnerId);

  // Check if partner is in makeup category
  const isMakeupPartner = [15, 16, 17].includes(partnerId);

  if (!partner) {
    return (
      <View style={styles.container}>
        <CustomText>Partner not found</CustomText>
      </View>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Icon key={i} name="star" size={12} color={Colors.primary} />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Icon key={i} name="star-half" size={12} color={Colors.primary} />
        );
      } else {
        stars.push(
          <Icon key={i} name="star-outline" size={12} color={Colors.primary} />
        );
      }
    }
    return stars;
  };

  const getPartnerCategory = (id) => {
    if ([8, 9, 10, 11, 12].includes(id)) return 'clothes';
    if ([13, 14].includes(id)) return 'cars';
    if ([1, 2, 3, 4, 5, 6, 7].includes(id)) return 'partyLocation';
    if ([15, 16, 17].includes(id)) return 'makeup';
    return 'other';
  };

  const handleFollowToggle = () => {
    const partnerData = {
      id: partnerId,
      name: partner.name,
      logo: partner.logo,
      category: getPartnerCategory(partnerId)
    };
    toggleFollow(partnerData);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={20} color={Colors.primaryDark} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Partner Info Section */}
          <View style={styles.partnerInfoContainer}>
            {/* Logo and Basic Info */}
            <View style={styles.logoSection}>
              <View style={styles.basicInfo}>
                <TouchableOpacity
                  style={[styles.followButton, isPartnerFollowed(partnerId) && styles.followingButton]}
                  onPress={handleFollowToggle}
                >
                  <CustomText style={[styles.followText, isPartnerFollowed(partnerId) && styles.followingText]}>
                    {isPartnerFollowed(partnerId) ? 'متابع' : 'متابعة'}
                  </CustomText>
                  <Icon
                    name={isPartnerFollowed(partnerId) ? "person" : "person-add"}
                    size={12}
                    color={isPartnerFollowed(partnerId) ? Colors.primaryDark : Colors.primaryDark}
                  />
                </TouchableOpacity>

                <View style={styles.ratingContainer}>
                  <CustomText style={[styles.ratingText, { fontFamily: 'AdventPro' }]}>
                    {partner.rating}
                  </CustomText>
                  <View style={styles.starsContainer}>
                    {renderStars(partner.rating)}
                  </View>
                </View>
              </View>
              <View style={styles.logoContainer}>
                <Image
                  source={partner.logo}
                  style={styles.logoImage}
                  resizeMode="cover"
                />
              </View>
            </View>

            {/* Partner Name */}
            <View style={styles.partnerInfo}>
            <CustomText style={styles.partnerName}>
              {partner.arabicName}
            </CustomText>

            {/* Description */}
            <CustomText style={styles.descriptionText}>
              {partner.description}
            </CustomText>
            </View>

            {/* Services */}
            <View style={styles.servicesContainer}>
              <CustomText style={styles.servicesTitle}>الخدمات المقدمة:</CustomText>
              <CustomText style={styles.servicesText}>
                {partner.services}
              </CustomText>
            </View>

                        {/* Contact Information */}
            <View style={styles.contactContainer}>
              <CustomText style={styles.contactTitle}>معلومات التواصل:</CustomText>

              <View style={styles.contactItem}>
                <CustomText style={styles.contactText}>
                  <CustomText style={{ fontFamily: 'AdventPro' }}>{partner.contactInfo.phone}</CustomText>
                </CustomText>
                <Icon name="call" size={12} color={Colors.primaryDark} />
              </View>

              <View style={styles.contactItem}>
                <CustomText style={styles.contactText}>
                  {partner.contactInfo.address}
                </CustomText>
                <Icon name="location" size={12} color={Colors.primaryDark} />
              </View>
            </View>

            {/* Gallery Section */}
            <View style={styles.galleryContainer}>
              <View style={styles.galleryHeader}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {
                      if (isClothesPartner) {
                        setBookingModalVisible(true);
                      } else if (isCarPartner) {
                        setCarRentalModalVisible(true);
                      } else if (isPartyLocationPartner) {
                        setPartyLocationModalVisible(true);
                      } else if (isMakeupPartner) {
                        setMakeupBookingModalVisible(true);
                      }
                    }}
                  >
                    <Image
                      source={require('../assets/icons/add-item.png')}
                      style={styles.addItemIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Chat', {
                    partner: {
                      ...partner,
                      logoImage: partner.logo,
                      id: partnerId
                    }
                  })}
                >
                      <Image
                        source={require('../assets/icons/chat.png')}
                        style={styles.chatIcon}
                        resizeMode="contain"
                      />
                </TouchableOpacity>
              </View>
              <View style={styles.galleryGrid}>
                {partner.gallery.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.galleryItem}
                    onPress={() => {
                      setSelectedImage(item);
                      setModalVisible(true);
                    }}
                  >
                    {item.type === 'image' ? (
                      <Image
                        source={item.source}
                        style={styles.galleryImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={styles.videoContainer}>
                        <Video
                          source={item.source}
                          style={styles.galleryVideo}
                          resizeMode="cover"
                          shouldPlay={false}
                          isMuted={true}
                          useNativeControls={false}
                        />
                        <View style={styles.playButton}>
                          <Icon name="play" size={20} color={Colors.white} />
                        </View>
                      </View>
                    )}

                    {/* Heart Icon for Favorites */}
                    <TouchableOpacity
                      style={styles.heartIcon}
                      onPress={(e) => {
                        e.stopPropagation();
                        const favoriteItem = {
                          id: `${partnerId}_${index}`,
                          partnerId: partnerId,
                          partnerName: partner.name,
                          partnerLogo: partner.logo,
                          category: getPartnerCategory(partnerId),
                          rating: partner.rating || 4.5,
                          reviewCount: partner.reviewCount || 25,
                          popularity: partner.popularity || 30,
                          discount: partner.discount || '0%',
                          image: item.source,
                          type: item.type,
                          isFavorite: true
                        };
                        toggleFavorite(favoriteItem);
                      }}
                    >
                      <Icon
                        name={isFavorite(`${partnerId}_${index}`, partnerId) ? "heart" : "heart-outline"}
                        size={15}
                        color={isFavorite(`${partnerId}_${index}`, partnerId) ? "#FF0000" : "#FFFFFF"}
                      />
                    </TouchableOpacity>

                    {/* Discount Tag */}
                    {partner.discount && (
                      <View style={styles.discountTag}>
                        <CustomText style={styles.discountTagText}>
                          خصم <CustomText style={{ fontFamily: 'AdventPro' }}>{partner.discount}</CustomText>
                        </CustomText>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Tabs */}
      <BottomTabNavigator
        state={{ index: 4 }}
        navigation={navigation}
      />

      {/* Image Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalImageContainer}>
              {selectedImage?.type === 'image' ? (
                <Image
                  source={selectedImage.source}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
              ) : (
                <Video
                  source={selectedImage?.source}
                  style={styles.modalVideo}
                  resizeMode="contain"
                  shouldPlay={true}
                  isMuted={false}
                  useNativeControls={true}
                  isLooping={true}
                />
              )}
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close" size={24} color={Colors.white} />
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Clothing Booking Modal */}
      <ClothingBookingModal
        visible={bookingModalVisible}
        onClose={() => setBookingModalVisible(false)}
        partnerName={partner.name}
        partnerGallery={partner.gallery}
        partnerBasePrice={partner.price}
        partnerLogo={partner.logo}
        partnerId={partnerId}
        partnerDiscount={partner.discount}
      />

      {/* Car Rental Modal */}
      <CarRentalModal
        visible={carRentalModalVisible}
        onClose={() => setCarRentalModalVisible(false)}
        partnerName={partner.name}
        partnerGallery={partner.gallery}
        partnerBasePrice={partner.price}
        partnerLogo={partner.logo}
        partnerId={partnerId}
        partnerDiscount={partner.discount}
      />

      {/* Party Location Modal */}
      <PartyLocationModal
        visible={partyLocationModalVisible}
        onClose={() => setPartyLocationModalVisible(false)}
        partnerName={partner.name}
        partnerLogo={partner.logo}
        partnerBasePrice={partner.price}
        partnerId={partnerId}
        partnerDiscount={partner.discount}
      />

      {/* Makeup Booking Modal */}
      <MakeupBookingModal
        visible={makeupBookingModalVisible}
        onClose={() => setMakeupBookingModalVisible(false)}
        partnerName={partner.name}
        partnerLogo={partner.logo}
        partnerBasePrice={partner.price}
        partnerId={partnerId}
        partnerDiscount={partner.discount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  partnerInfoContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    gap: 20,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 60,
    backgroundColor: Colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  basicInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  followingButton: {
    backgroundColor: Colors.secondary,
  },
  followText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primaryDark,
    marginRight: 8,
  },
  followingText: {
    color: Colors.primaryDark,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.primaryDark,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  partnerInfo: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
  },
  partnerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'right',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 14,
    color: Colors.primaryDark,
    textAlign: 'right',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.primaryDark,
    textAlign: 'center',
    marginBottom: 10,
  },
  servicesContainer: {
    width: '100%',
    marginBottom: 10,
  },
  servicesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'right',
    marginBottom: 4,
  },
  servicesText: {
    fontSize: 12,
    color: Colors.primaryDark,
    textAlign: 'right',
    lineHeight: 16,
  },
  contactContainer: {
    width: '100%',
    marginBottom: 10,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'right',
    marginBottom: 5,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    justifyContent: 'flex-end',
  },
  contactText: {
    fontSize: 12,
    color: Colors.primaryDark,
    textAlign: 'right',
    marginRight:3,
   },
  galleryContainer: {
    width: '100%',
    marginTop: 20,
  },
  galleryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'right',
    marginBottom: 15,
  },
  galleryHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 4,
    marginBottom: 15,
  },
  actionIcon: {
    paddingLeft: 8,
    width: 24,
    height: 24,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: 8,
  },
  galleryItem: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative', // Added for heart icon positioning
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  galleryVideo: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 30,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImageContainer: {
    width: '90%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  modalVideo: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 10,
    zIndex: 1,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addItemIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.primaryDark,
  },
  chatIcon: {
    width: 20,
    height: 20,
  },
  discountTag: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#f4d376',
    paddingHorizontal: 12,
    paddingVertical: 0,
    borderRadius: 5,
    shadowColor: '#000',
    width: '100%',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 2,
  },
  discountTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primaryDark,
    textAlign: 'center',
  },
});

export default PartnerInfoScreen;
