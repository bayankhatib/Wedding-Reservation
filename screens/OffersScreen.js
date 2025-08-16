import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Dimensions
} from 'react-native';
import { Colors } from '../constants/Colors';
import CustomText from '../components/CustomText';
import { Categories } from '../constants/FakeData';
import { Ionicons } from '@expo/vector-icons';

const OffersScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('أزياء');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  // Fake offers data based on existing partners with logo paths
  const offersData = {
    'أزياء': [
      {
        id: 1,
        partnerName: 'تاليا دريسيز',
        brandLogo: require('../assets/partnersLogo/talyas_dress.jpg'),
        discount: '30%',
        duration: 'لفترة محدودة',
        rating: 4.2,
        reviews: 68,
        partnerId: 12, // Talyas Dress partner
        category: 'أزياء'
      },
      {
        id: 2,
        partnerName: 'بيانكا روزا',
        brandLogo: require('../assets/partnersLogo/beanka_rosa.jpg'),
        discount: '10%',
        duration: 'لفترة محدودة',
        rating: 4.9,
        reviews: 98,
        partnerId: 8, // Beanka Rosa partner
        category: 'أزياء'
      },
      {
        id: 3,
        partnerName: 'دي كلاس',
        brandLogo: require('../assets/partnersLogo/di_class.jpg'),
        discount: '35%',
        duration: 'لفترة محدودة',
        rating: 4.7,
        reviews: 54,
        partnerId: 9, // Di Class partner
        category: 'أزياء'
      },
      {
        id: 4,
        partnerName: 'سبيس فور مان',
        brandLogo: require('../assets/partnersLogo/space_for_man.jpg'),
        discount: '40%',
        duration: 'لفترة محدودة',
        rating: 4.8,
        reviews: 73,
        partnerId: 10, // Space for Man partner
        category: 'أزياء'
      }
    ],
    'مكان الحفل': [
      {
        id: 5,
        partnerName: 'وايت هول',
        brandLogo: require('../assets/partnersLogo/white_hall.jpg'),
        discount: '20%',
        duration: 'لفترة محدودة',
        rating: 4.8,
        reviews: 28,
        partnerId: 5, // White Hall partner
        category: 'مكان الحفل'
      },
      {
        id: 6,
        partnerName: 'سينيشن',
        brandLogo: require('../assets/partnersLogo/sensation.jpg'),
        discount: '30%',
        duration: 'لفترة محدودة',
        rating: 4.6,
        reviews: 35,
        partnerId: 6, // Sensation partner
        category: 'مكان الحفل'
      },
    ],
    'خبراء مكياج': [
      {
        id: 9,
        partnerName: 'لجين سعد الدين',
        brandLogo: require('../assets/partnersLogo/lujain_saadaldeen.jpg'),
        discount: '35%',
        duration: 'لفترة محدودة',
        rating: 4.9,
        reviews: 45,
        partnerId: 15, // Lujain partner
        category: 'خبراء مكياج'
      }
    ],
    'تأجير سيارات': [
      {
        id: 10,
        partnerName: 'ديفا كارز',
        brandLogo: require('../assets/partnersLogo/diva_cars.jpg'),
        discount: '15%',
        duration: 'لفترة محدودة',
        rating: 4.9,
        reviews: 76,
        partnerId: 13, // Diva Cars partner
        category: 'تأجير سيارات'
      }
    ]
  };

  const currentOffers = offersData[selectedCategory] || [];

  const renderCategoryFilter = () => (
    <View style={styles.categoryFilterContainer}>
      <TouchableOpacity 
        style={styles.categoryFilter}
        onPress={() => setShowCategoryFilter(!showCategoryFilter)}
      >
        <CustomText style={styles.categoryFilterText}>{selectedCategory}</CustomText>
        <Ionicons 
          name={showCategoryFilter ? 'chevron-up' : 'chevron-down'} 
          size={16} 
          color={Colors.primaryDark} 
        />
      </TouchableOpacity>
      
      {showCategoryFilter && (
        <View style={styles.categoryDropdown}>
          {Categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryOption}
              onPress={() => {
                setSelectedCategory(category.title);
                setShowCategoryFilter(false);
              }}
            >
              <CustomText style={styles.categoryOptionText}>{category.title}</CustomText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  const renderOfferCard = (offer) => (
    <TouchableOpacity 
      key={offer.id} 
      style={styles.offerCard}
      onPress={() => navigation.navigate('PartnerInfo', { partnerId: offer.partnerId })}
    >
      <View style={styles.offerCardContent}>
        <View style={styles.offerInfo}>
          <CustomText style={styles.partnerName}>{offer.partnerName}</CustomText>
          
          <View style={styles.offerDetails}>
            <CustomText style={styles.offerText}>
              خصم {offer.discount} {offer.duration}
            </CustomText>
          </View>
          <View style={styles.offersTag}>
                <CustomText style={styles.offersTagText}>عروض</CustomText>
            </View>
          <View style={styles.ratingContainer}>
          <CustomText style={styles.ratingText}>
              {offer.rating} ({offer.reviews})
            </CustomText>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons 
                  key={star} 
                  name="star" 
                  size={12} 
                  color={star <= Math.floor(offer.rating) ? '#FFD700' : '#E0E0E0'} 
                />
              ))}
            </View>
          </View>
        </View>
        
        <View style={styles.brandLogoContainer}>
          <Image 
            source={offer.brandLogo}
            style={styles.brandLogoImage}
            resizeMode="cover"
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <CustomText style={styles.headerTitle}>العروض</CustomText>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderCategoryFilter()}
        
        <View style={styles.offersContainer}>
          {currentOffers.map(renderOfferCard)}
        </View>
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
    backgroundColor: '#f4eac1',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoryFilterContainer: {
    marginBottom: 20,
    position: 'relative',
    zIndex: 9999,
  },
  categoryFilter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 10,
  },
  categoryFilterText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
  categoryDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 9999,
    marginTop: 5,
  },
  categoryOption: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryOptionText: {
    fontSize: 16,
    color: Colors.primaryDark,
    textAlign: 'right',
  },
  offersContainer: {
    gap: 15,
  },
  offerCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.primaryDark,
    backgroundColor: '#f4eac1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  offerCardContent: {
    flexDirection: 'row',
    // padding: 15,
  },
  offerInfo: {
    flex: 1,
    marginRight: 15,
  },
  partnerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'right',
    marginBottom: 5,
    marginTop: 5,
  },
  offerDetails: {
    marginBottom: 5,
    backgroundColor: Colors.primary,
    width: '60%',
    alignSelf: 'flex-end',
    borderRadius: 10,
  },
  offerText: {
    fontSize: 12,
    color: Colors.primaryDark,
    textAlign: 'right',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 12,
    color: Colors.primaryDark,
    fontWeight: '600',
  },
  brandLogoContainer: {
    width: 80,
    height: 88,
    backgroundColor: Colors.primaryDark,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandLogoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomLeftRadius: 0,
  },
  offersTag: {
    position: 'absolute',
    top: 30,
    left: 10,
    backgroundColor: '#f4d376',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 15,
  },
  offersTagText: {
    fontSize: 12,
    color: Colors.primaryDark,
    fontWeight: '600',
  },
});

export default OffersScreen;
