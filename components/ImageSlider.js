import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/Colors';
import CustomText from './CustomText';

const { width: screenWidth } = Dimensions.get('window');

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const slides = [
    {
      id: 1,
      images: [
        require('../assets/Untitled-2-10.png'),
        require('../assets/Untitled-2-05.png'),
        require('../assets/Untitled-2-03.png'),
      ]
    },
    {
      id: 2,
      images: [
        require('../assets/Untitled-2-09.png'),
        require('../assets/Untitled-2-01.png'),
        require('../assets/Untitled-2-07.png'),
      ]
    },
    {
      id: 3,
      images: [
        require('../assets/Untitled-2-11.png'),
        require('../assets/Untitled-2-06.png'),
        require('../assets/Untitled-2-08.png'),
      ]
    }
  ];

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const slideWidth = screenWidth - 40; // Accounting for padding
    const index = Math.round(contentOffset / slideWidth);
    setCurrentIndex(Math.max(0, Math.min(index, slides.length - 1)));
  };

  const scrollToSlide = (index) => {
    const slideWidth = screenWidth - 40;
    scrollViewRef.current?.scrollTo({
      x: index * slideWidth,
      animated: true,
    });
    setCurrentIndex(index);
  };

  const renderSlide = (slide) => (
    <View key={slide.id} style={styles.slide}>
      <View style={styles.imageContainer}>
        {/* Top image - full width */}
        <View style={styles.topImageContainer}>
          <Image source={slide.images[0]} style={styles.topImage} resizeMode="stretch" />
        </View>
        
        {/* Bottom two images side by side */}
        <View style={styles.bottomImagesContainer}>
          <View style={styles.bottomImageWrapper}>
            <Image source={slide.images[1]} style={styles.bottomImage} resizeMode="stretch" />
          </View>
          <View style={styles.bottomImageWrapper}>
            <Image source={slide.images[2]} style={styles.bottomImage} resizeMode="stretch" />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      
              <View style={styles.sliderContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={styles.scrollViewContent}
          >
            {slides.map(renderSlide)}
          </ScrollView>
        
        {/* Pagination dots */}
        <View style={styles.paginationContainer}>
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.paginationDotActive
              ]}
              onPress={() => scrollToSlide(index)}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  sliderContainer: {
    position: 'relative',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  slide: {
    width: screenWidth - 40,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
  },
  topImageContainer: {
    width: '100%',
    height: 200,
    padding: 0,
    margin: 0,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  topImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignSelf: 'stretch',
  },
  bottomImagesContainer: {
    height: 150,
    flexDirection: 'row',
    width: '97%%',
    gap: 8,
    // paddingHorizontal: 2,
  },
  bottomImageWrapper: {
    width: '50%',
    height: '100%',
    padding: 0,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.gray,
  },
  paginationDotActive: {
    backgroundColor: Colors.primaryDark,
    width: 24,
  },

});

export default ImageSlider;
