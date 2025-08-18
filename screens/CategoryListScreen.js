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
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/Colors';
import CustomText from '../components/CustomText';
import { useFavorites } from '../contexts/FavoritesContext';
import { PartnerDetails } from '../constants/PartnerData';
import { useNavigation, useRoute } from '@react-navigation/native';
import BottomTabNavigator from '../components/BottomTabNavigator';

export default function CategoryListScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryData, categoryTitle } = route.params || {};

  const [searchText, setSearchText] = useState('');

  // Filter data based on search text
  const filteredData = categoryData?.filter(item =>
    item.title?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.location?.toLowerCase().includes(searchText.toLowerCase())
  ) || [];

  // Debug logging
  console.log('CategoryListScreen Debug:', {
    searchText,
    categoryDataLength: categoryData?.length || 0,
    filteredDataLength: filteredData.length,
    categoryTitle
  });

  const handleItemPress = (item) => {
    navigation.navigate('PartnerInfo', { partnerId: item.id });
  };

  const renderItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.itemContainer}
      onPress={() => handleItemPress(item)}
    >
      {/* Left Column - Stats */}
      <View style={styles.statsColumn}>
        <View style={styles.statItem}>
          <Icon name="heart" size={16} color={Colors.red} />
          <CustomText style={[styles.statText, { fontFamily: 'AdventPro' }]}>{item.favoriteCount}</CustomText>
        </View>
      </View>

      {/* Center Column - Business Name */}
      <View style={styles.nameColumn}>
        <CustomText style={styles.itemTitle}>{item.title}</CustomText>
      </View>

      {/* Right Column - Circular Logo */}
      <View style={styles.logoColumn}>
        <Image source={item.image} style={styles.circularLogo} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={Colors.primaryDark} />
          </TouchableOpacity>

          <CustomText style={styles.headerTitle}>{categoryTitle || 'القائمة'}</CustomText>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="ابحث في القائمة..."
              placeholderTextColor={Colors.textLight}
              value={searchText}
              onChangeText={setSearchText}
              returnKeyType="search"
              clearButtonMode="while-editing"
            />
            {searchText.length > 0 && (
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={() => setSearchText('')}
              >
                <Icon name="close-circle" size={20} color={Colors.textLight} />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.searchButton}>
              <Icon name="search" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Search Results Counter */}
          {searchText && (
            <View style={styles.searchResultsCounter}>
              <CustomText style={styles.searchResultsText}>
                تم العثور على {filteredData.length} نتيجة للبحث: "{searchText}"
              </CustomText>
            </View>
          )}
          
          {filteredData.length > 0 ? (
            <View style={styles.itemsGrid}>
              {filteredData.map(renderItem)}
            </View>
          ) : (
            <View style={styles.noResults}>
              <CustomText style={styles.noResultsText}>
                {searchText ? 'لا توجد نتائج للبحث' : 'لا توجد عناصر متاحة'}
              </CustomText>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      
      <BottomTabNavigator 
        state={{ index: 4 }} 
        navigation={navigation} 
      />
    </View>
  );
}

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
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginTop: 10,
    marginHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderWidth: 1,
    borderColor: Colors.primary,
    minHeight: 50,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    color: Colors.textDark,
    textAlign: 'right',
    fontFamily: 'AdventPro',
  },
  searchButton: {
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  itemsGrid: {
    flexDirection: 'column',
    backgroundColor: Colors.secondary,
    borderRadius: 25,
    overflow: 'scroll',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 3,
  },
  statsColumn: {
    flex: 1,
    alignItems: 'flex-start',
    marginRight: 15,
  },
  nameColumn: {
    flex: 0,
    alignItems: 'center',
    marginRight: 15,
  },
  logoColumn: {
    flex:0,
    alignItems: 'flex-end',
  },
  circularLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statText: {
    fontSize: 12,
    color: Colors.primaryDark,
    marginLeft: 4,
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  noResultsText: {
    fontSize: 18,
    color: Colors.textLight,
    textAlign: 'center',
  },
  searchResultsCounter: {
    backgroundColor: Colors.primaryLight,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  searchResultsText: {
    fontSize: 16,
    color: Colors.primaryDark,
    fontFamily: 'AdventPro',
  },
});
