import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Modal,
  Dimensions
} from 'react-native';
import { Colors } from '../constants/Colors';
import { Categories, MostRequested, SpecialPackages } from '../constants/FakeData';
import { PartyLocations } from '../constants/PartyLocationsData';
import { MakeupData } from '../constants/MakeupData';
import { ClothesData } from '../constants/ClothesData';
import { CarsData } from '../constants/CarsData';
import { Ionicons } from '@expo/vector-icons';
import BronzePackageIcon from '../assets/icons/bronze-package.svg';
import SilverPackageIcon from '../assets/icons/silver-package.svg';
import GoldPackageIcon from '../assets/icons/gold-package.svg';
import CustomText from '../components/CustomText';
import PackageSlider from '../components/PackageSlider';
import PackageWrapper from '../components/PackageWrapper';
import ImageSlider from '../components/ImageSlider';
import NotificationsModal from '../components/NotificationsModal';
import { useNotifications } from '../contexts/NotificationsContext';

const HomeScreen = ({ navigation }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPackageSlider, setShowPackageSlider] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [bellPosition, setBellPosition] = useState(null);
  const { notificationsRead, markNotificationsAsRead } = useNotifications();
  const bellRef = useRef(null);

  // Define the 3 packages
  const packages = [
    {
      id: 1,
      name: 'الباقة البرونزية',
      duration: '12 شهر',
      totalPrice: '4,500',
      monthlyPrice: '375',
      logos: [
        require('../assets/partnersLogo/bebek.jpg'),
        require('../assets/partnersLogo/bob.jpg'),
        require('../assets/partnersLogo/beanka_rosa.jpg'),
      ],
      description: 'باقة أساسية للخدمات الأساسية'
    },
    {
      id: 2,
      name: 'الباقة الفضية',
      duration: '18 شهر',
      totalPrice: '6,750',
      monthlyPrice: '375',
      logos: [
        require('../assets/partnersLogo/alnuman.jpg'),
        require('../assets/partnersLogo/jasmine_fashion.jpg'),
        require('../assets/partnersLogo/diva_cars.jpg')
      ],
      description: 'باقة متوسطة مع خدمات إضافية'
    },
    {
      id: 3,
      name: 'الباقة الذهبية',
      duration: '24 شهر',
      totalPrice: '9,000',
      monthlyPrice: '375',
      logos: [
        require('../assets/partnersLogo/white_hall.jpg'),
        require('../assets/partnersLogo/space_for_man.jpg'),
        require('../assets/partnersLogo/diva_cars.jpg'),
      ],
      description: 'باقة شاملة مع جميع الخدمات'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const cardWidth = Dimensions.get('window').width * 0.75 + 20;
    const index = Math.round(contentOffset / cardWidth);
    setCurrentIndex(Math.max(0, Math.min(index, packages.length - 1)));
  };

  const getCategoryImage = (imageName) => {
    switch (imageName) {
      case 'cars':
        return require('../assets/icons/cars.png');
      case 'makeup':
        return require('../assets/icons/makeup.png');
      case 'clothes':
        return require('../assets/icons/clothes.png');
      case 'part-location':
        return require('../assets/icons/party-location.png');
      default:
        return null;
    }
  };

  const renderCategoryItem = (category) => (
    <TouchableOpacity 
      key={category.id} 
      style={styles.categoryItem}
      onPress={() => {
        let categoryData, categoryTitle;
        
        switch (category.title) {
          case 'مكان الحفل':
            categoryData = PartyLocations;
            categoryTitle = 'أماكن الحفلات';
            break;
          case 'أزياء':
            categoryData = ClothesData;
            categoryTitle = 'أزياء';
            break;
          case 'خبراء مكياج':
            categoryData = MakeupData;
            categoryTitle = 'خبراء المكياج';
            break;
          case 'تأجير سيارات':
            categoryData = CarsData;
            categoryTitle = 'تأجير سيارات الزفاف';
            break;
          default:
            return;
        }
        
        navigation.navigate('CategoryList', { 
          categoryData, 
          categoryTitle 
        });
      }}
    >
      <View style={styles.categoryImageContainer}>
        <Image 
          source={getCategoryImage(category.image)} 
          style={styles.categoryImage}
          resizeMode="contain"
        />
      </View>
      <CustomText style={styles.categoryTitle}>{category.title}</CustomText>
    </TouchableOpacity>
  );

  const renderMostRequestedItem = (item) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.mostRequestedItem}
      onPress={() => {
        if (item.partnerId) {
          navigation.navigate('PartnerInfo', { partnerId: item.partnerId });
        }
      }}
    >
      <View style={styles.itemImageContainer}>
        <Image source={item.image} style={styles.itemImage} resizeMode="cover" />
        <View style={styles.itemOverlay}>
          <View style={styles.ratingContainer}>
            <CustomText style={styles.ratingText}>★ {item.rating}</CustomText>
          </View>
        </View>
      </View>
      <View style={styles.itemInfo}>
        <CustomText style={styles.itemTitle}>{item.title}</CustomText>
        <CustomText style={styles.itemPrice}>{item.price}</CustomText>
      </View>
    </TouchableOpacity>
  );

  const getPackageIcon = (iconPath) => {
    switch (iconPath) {
      case '/assets/icons/bronze-package.svg':
        return BronzePackageIcon;
      case '/assets/icons/silver-package.svg':
        return SilverPackageIcon;
      case '/assets/icons/gold-package.svg':
        return GoldPackageIcon;
      default:
        return BronzePackageIcon;
    }
  };

  const renderSpecialPackage  = (pkg) => {
    const IconComponent = getPackageIcon(pkg.icon);
    return (
      <TouchableOpacity 
        key={pkg.id} 
        style={styles.packageItem}
        onPress={() => {
          setSelectedPackage(pkg);
          setShowPackageSlider(true);
        }}
      >
        <View style={styles.packageIcon}>
          <IconComponent 
            width={170}
            height={170}
          />
        </View>
        <CustomText style={styles.packageName}>{pkg.name}</CustomText>
    
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <CustomText style={styles.headerTitle}>مرحباً بك في بنفرحك</CustomText>
          <TouchableOpacity 
            ref={bellRef}
            style={styles.bellIcon}
            onLayout={(event) => {
              const { x, y } = event.nativeEvent.layout;
              setBellPosition({ x, y });
            }}
            onPress={() => {
              setShowNotifications(true);
              markNotificationsAsRead();
            }}
          >
            <Ionicons name="notifications-outline" size={24} color={Colors.primaryDark} />
            {!notificationsRead && (
              <View style={styles.notificationBadge}>
                <CustomText style={styles.badgeText}>2</CustomText>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Categories */}
        <View style={styles.section}>
          <CustomText style={styles.sectionTitle}>حدد فئة</CustomText>
          <View style={styles.categoriesContainer}>
            {Categories.map(renderCategoryItem)}
          </View>
        </View>

        {/* Most Requested */}
        <View style={styles.section}>
          <CustomText style={styles.sectionTitle}>الأكثر طلباً</CustomText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mostRequestedContainer}>
            {MostRequested.map(renderMostRequestedItem)}
          </ScrollView>
        </View>

        {/* Special Packages */}
        <View style={styles.section}>
          <CustomText style={styles.sectionTitle}>حزم خاصة</CustomText>
          <View style={styles.packagesContainer}>
            {SpecialPackages.map(renderSpecialPackage)}
          </View>
        </View>

        {/* Image Slider */}
        <ImageSlider />
      </ScrollView>

      {/* Package Slider */}
      <PackageWrapper
        visible={showPackageSlider}
        onClose={() => setShowPackageSlider(false)}
        selectedPackage={selectedPackage}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
        bellPosition={bellPosition}
      />
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'right',
  },
  bellIcon: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'right',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  categoryItem: {
    alignItems: 'center',
    width: '22%',
    marginBottom: 15,
  },
  categoryImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryImage: {
    width: '80%',
    height: '80%',
    borderRadius: 15,
  },
  categoryImageText: {
    fontSize: 14,
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  categoryTitle: {
    fontSize: 14,
    color: Colors.primaryDark,
    textAlign: 'center',
    lineHeight: 18,
  },
  mostRequestedContainer: {
    flexDirection: 'row',
  },
  mostRequestedItem: {
    width: 150,
    backgroundColor: '#f4eac1',
    borderRadius: 20,
    marginRight: 20,
    marginTop: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  itemImageContainer: {
    position: 'relative',
    height: 150,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  ratingContainer: {
    position: 'absolute',
    top: 5,
    left: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  itemInfo: {
    paddingHorizontal: 15,
    paddingVertical:10
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primaryDark,
    textAlign: 'right',
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 14,
    color: Colors.primaryDark,
    textAlign: 'right',
  },
  packagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  packageItem: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  packageIcon: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  packageIconText: {
    fontSize: 24,
  },
  packageName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryDark,
    textAlign: 'center',
    marginBottom: 5,
  },
  packagePrice: {
    fontSize: 12,
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#f4eac1',
    borderRadius: 25,
    width: Dimensions.get('window').width * 0.85,
    maxHeight: Dimensions.get('window').height * 0.8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
});

export default HomeScreen; 