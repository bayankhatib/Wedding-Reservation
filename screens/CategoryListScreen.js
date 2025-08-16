import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../components/CustomText';
import { Colors } from '../constants/Colors';
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
          <Ionicons name="heart" size={16} color={Colors.red} />
          <CustomText style={styles.statText}>{item.favoriteCount}</CustomText>
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
            <Ionicons name="arrow-back" size={24} color={Colors.primaryDark} />
          </TouchableOpacity>

          <CustomText style={styles.headerTitle}>{categoryTitle || 'القائمة'}</CustomText>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="البحث..."
              placeholderTextColor={Colors.textLight}
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
  );s
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    color: Colors.textDark,
  },
  searchButton: {
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
});
