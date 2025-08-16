import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import CustomText from './CustomText';
import { Colors } from '../constants/Colors';

const { width: screenWidth } = Dimensions.get('window');

const SideMenu = ({ visible, onClose, navigation }) => {
  const menuItems = [
    { id: 1, title: 'الصفحة الرئيسية', icon: require('../assets/icons/main-page.png'), action: () => navigation.navigate('Home') },
    { id: 2, title: 'المفضلة', icon: require('../assets/icons/favorite.png'), action: () => navigation.navigate('Favorites') },
    { id: 3, title: 'العروض', icon: require('../assets/icons/offers.png'), action: () => navigation.navigate('Offers') },
    { id: 4, title: 'التقسيط', icon: require('../assets/icons/installment.png'), action: () => navigation.navigate('installment') },
    { id: 5, title: 'حسابي', icon: require('../assets/icons/account.png'), action: () => navigation.navigate('Profile') },
    { id: 7, title: 'شروط الخدمة', icon: require('../assets/icons/service-terms.png'), action: () => navigation.navigate('ServiceTermsScreen') },
    { id: 8, title: 'الإبلاغ', icon: require('../assets/icons/report.png'), action: () => navigation.navigate('ReportScreen') },
    { id: 9, title: 'حزم التقسيط الفعالة', icon: require('../assets/icons/active-offers.png'), action: () => navigation.navigate('InstallmentPackages') },
    { id: 10, title: 'مراسلة', icon: require('../assets/icons/chat.png'), action: () => navigation.navigate('ChatList') },
  ];

  const handleMenuItemPress = (item) => {
    item.action();
    onClose();
  };

    return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Side Menu */}
        <View style={styles.sideMenu}>

                    {/* Menu Items */}
          <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleMenuItemPress(item)}
                activeOpacity={0.7}
              >
                <CustomText style={styles.menuItemText}>{item.title}</CustomText>
                  <Image 
                    source={item.icon} 
                    style={styles.imageStyle}
                    resizeMode="contain"
                  />

              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Decorative Stars */}
          {/* <View style={styles.star1} />
          <View style={styles.star2} />
          <View style={styles.star3} /> */}
        </View>
        
        {/* Transparent overlay for closing menu when touching right side */}
        <TouchableOpacity 
          style={styles.rightOverlay} 
          activeOpacity={1} 
          onPress={onClose}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    borderTopRightRadius: 20,
    position: 'relative',
  },
  rightOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: screenWidth * 0.8, // Start from the right edge of the side menu
  },
  sideMenu: {
    width: screenWidth * 0.8,
    backgroundColor: '#F5F5DC',
    borderTopRightRadius: 20,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: -2,
    //   height: 0,
    // },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
    position: 'relative',
    marginTop: 120,
    marginBottom: 68, // Space for bottom tab navigator
  },
  menuContainer: {
    flex: 1,
    paddingTop: 30,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 10,
    marginVertical: 2,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  menuItemText: {
    fontSize: 16,
    color: Colors.primaryDark,
    fontWeight: '500',
    marginRight: 10,
  },
  // Decorative Stars
  star1: {
    position: 'absolute',
    top: '20%',
    left: '15%',
    width: 20,
    height: 20,
    backgroundColor: 'rgba(93,63,106,0.1)',
    borderRadius: 10,
    transform: [{ rotate: '45deg' }],
  },
  star2: {
    position: 'absolute',
    top: '60%',
    left: '25%',
    width: 15,
    height: 15,
    backgroundColor: 'rgba(93,63,106,0.08)',
    borderRadius: 7.5,
    transform: [{ rotate: '45deg' }],
  },
  star3: {
    position: 'absolute',
    bottom: '25%',
    left: '20%',
    width: 18,
    height: 18,
    backgroundColor: 'rgba(93,63,106,0.12)',
    borderRadius: 9,
    transform: [{ rotate: '45deg' }],
  },
  imageStyle: {
    width: 16,
    height: 16,
  }
});

export default SideMenu; 