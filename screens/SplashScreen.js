import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';
import Logo from '../assets/logo.svg';
import BgLogo from '../assets/bg-logo.svg';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={[Colors.primaryDark, '#6f0c77']}
      style={styles.container}
    >
      <View style={styles.backgroundLogo}>
        <BgLogo width={height * 0.9} height={height * 0.95} />
      </View>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Logo width={435} height={205} />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundLogo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  logoContainer: {
    alignItems: 'center',
    zIndex: 1,
  },
  logo: {
    width: 220,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: '500',
  },
});

export default SplashScreen; 