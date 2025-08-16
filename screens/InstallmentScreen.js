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
import BronzePackageIcon from '../assets/icons/bronze-package.svg';
import SilverPackageIcon from '../assets/icons/silver-package.svg';
import GoldPackageIcon from '../assets/icons/gold-package.svg';
import PackageWrapper from '../components/PackageWrapper';
import { SpecialPackages } from '../constants/FakeData';

const InstallmentScreen = ({ navigation }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showPackageSlider, setShowPackageSlider] = useState(false);

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

  const renderSpecialPackage = (pkg) => {
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
            width={250}
            height={250}
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
          <CustomText style={styles.headerTitle}>حزم التقسيط</CustomText>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <CustomText style={styles.sectionTitle}>اختر الباقة المناسبة لك</CustomText>
          <View style={styles.packagesContainer}>
          {SpecialPackages.slice().reverse().map(renderSpecialPackage)}
          </View>
        </View>
      </ScrollView>

      {/* Package Slider */}
      <PackageWrapper
        visible={showPackageSlider}
        onClose={() => setShowPackageSlider(false)}
        selectedPackage={selectedPackage}
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'right',
    marginBottom: 20,
  },
  packagesContainer: {
    alignItems: 'center',
    gap: 20,
  },
  packageItem: {
    width: '85%',
    backgroundColor: '#f4eac1',
    borderRadius: 20,
    paddingBottom: 15,
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
  packageIcon: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  packageName: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primaryDark,
    textAlign: 'center',
  },
});

export default InstallmentScreen;
