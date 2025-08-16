import React from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Dimensions
} from 'react-native';
import { Video } from 'expo-av';
import { Colors } from '../constants/Colors';
import CustomText from '../components/CustomText';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../contexts/FavoritesContext';

const FavoritesScreen = ({ navigation }) => {
  const { favorites, toggleFavorite } = useFavorites();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Ionicons key={i} name="star" size={16} color="#FFD700" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Ionicons key={i} name="star-half" size={16} color="#FFD700" />
        );
      } else {
        stars.push(
          <Ionicons key={i} name="star-outline" size={16} color="#FFD700" />
        );
      }
    }
    return stars;
  };

  const getCategoryText = (category) => {
    const categoryMap = {
      'clothes': 'أزياء',
      'cars': 'تأجير سيارات',
      'partyLocation': 'مكان الحفل',
      'makeup': 'مكياج',
      'other': 'خدمات أخرى'
    };
    return categoryMap[category] || category;
  };

  const renderFavoriteCard = (item) => (
    <TouchableOpacity 
      key={`${item.partnerId}_${item.id}`} 
      style={styles.favoriteCard}
      onPress={() => navigation.navigate('PartnerInfo', { partnerId: item.partnerId })}
    >
      {/* Heart Icon */}
      <TouchableOpacity 
        style={styles.heartIcon}
        onPress={(e) => {
          e.stopPropagation();
          toggleFavorite(item);
        }}
      >
        <Ionicons 
          name="heart" 
          size={20} 
          color="#FF0000" 
        />
      </TouchableOpacity>

      {/* Card Content */}
      <View style={styles.cardContent}>
        {/* Right Side - Image */}
        <View style={styles.imageContainer}>
          {item.type === 'image' ? (
            <Image source={item.image} style={styles.partnerImage} resizeMode="cover" />
          ) : (
            <View style={styles.videoContainer}>
              <Video
                source={item.image}
                style={styles.partnerImage}
                resizeMode="cover"
                shouldPlay={false}
                isMuted={true}
                useNativeControls={false}
              />
              <View style={styles.playButton}>
                <Ionicons name="play" size={16} color={Colors.white} />
              </View>
            </View>
          )}
        </View>

        {/* Left Side - Details */}
        <View style={styles.detailsContainer}>
          <CustomText style={styles.partnerName}>{item.partnerName}</CustomText>
          
          {/* Rating */}
          <View style={styles.ratingContainer}>
            <CustomText style={styles.ratingText}>
              ({item.reviewCount}){item.rating}
            </CustomText>
            <View style={styles.starsContainer}>
              {renderStars(item.rating)}
            </View>
          </View>
          
          {/* Popularity */}
          <View style={styles.popularityContainer}>
            <CustomText style={styles.popularityText}>
              الأكثر طلبا من {item.popularity} مستخدمًا
            </CustomText>
            <Ionicons name="heart" size={14} color="#FF0000" />
          </View>
          
          {/* Discount Button - Only show if there's a discount */}
          {item.discount && item.discount !== '0%' && (
            <View style={styles.discountButton}>
              <CustomText style={styles.discountButtonText}>
                خصم {item.discount} على العرض
              </CustomText>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <CustomText style={styles.headerTitle}>المفضلة</CustomText>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {favorites.length > 0 ? (
          <View style={styles.favoritesContainer}>
            {favorites.map(renderFavoriteCard)}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={64} color="#CCCCCC" />
            <CustomText style={styles.emptyStateTitle}>لا توجد مفضلات</CustomText>
            <CustomText style={styles.emptyStateDescription}>
              ابدأ بإضافة الشركاء المفضلين لديك
            </CustomText>
          </View>
        )}
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
  favoritesContainer: {
    gap: 15,
  },
  favoriteCard: {
    backgroundColor: '#f4eac1',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  heartIcon: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 10,
    padding: 5,
  },
  cardContent: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginRight: 15,
    position: 'relative',
  },
  partnerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'relative',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -8 }, { translateY: -8 }],
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  partnerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'right',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    color: Colors.primaryDark,
    fontWeight: '600',
    marginRight: 8,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  popularityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  popularityText: {
    fontSize: 12,
    color: Colors.primaryDark,
    marginRight: 6,
  },
  discountButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  discountButtonText: {
    color: Colors.primaryDark,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    marginTop: 20,
    marginBottom: 10,
  },
  emptyStateDescription: {
    fontSize: 16,
    color: Colors.primaryDark,
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default FavoritesScreen;
