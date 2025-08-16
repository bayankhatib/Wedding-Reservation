import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Colors } from '../constants/Colors';
import CustomText from './CustomText';
import SideMenu from './SideMenu';

const BottomTabNavigator = ({ state, navigation }) => {
  const [showSideMenu, setShowSideMenu] = useState(false);

  const tabs = [
    { 
      name: 'List', 
      label: 'القائمة', 
      icon: require('../assets/icons/list.png'),
      action: () => setShowSideMenu(true)
    },
    { name: 'installment', label: 'التقسيط', icon: require('../assets/icons/installment.png') },
    { name: 'Offers', label: 'العروض', icon: require('../assets/icons/offers.png') },
    { name: 'Favorites', label: 'المفضلة', icon: require('../assets/icons/favorite.png') },
    { name: 'Home', label: 'الرئيسية', icon: require('../assets/icons/main-page.png') },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isFocused = state.index === index;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => {
              if (tab.action) {
                tab.action();
              } else {
                navigation.navigate(tab.name);
              }
            }}
          >
            <View style={[styles.icon, isFocused && styles.activeIcon]}>
              <Image 
                source={tab.icon} 
                style={styles.iconImage}
                resizeMode="contain"
              />
            </View>
            <CustomText style={[styles.label, isFocused && styles.activeLabel]}>
              {tab.label}
            </CustomText>
          </TouchableOpacity>
        );
      })}
            <SideMenu
        visible={showSideMenu}
        onClose={() => setShowSideMenu(false)}
        navigation={navigation}
      />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.secondary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  icon: {
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 16,
    height: 16,
  },
  activeIcon: {
    // Active state styling can be added here if needed
  },
  label: {
    fontSize: 12,
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  activeLabel: {
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default BottomTabNavigator; 