import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from './CustomText';
import { Colors } from '../constants/Colors';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

const { width: screenWidth } = Dimensions.get('window');

const DrivingLicenseModal = ({
  visible,
  onClose,
  onLicenseValidated,
  partnerName,
  partnerLogo,
}) => {
  const [licenseImage, setLicenseImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleScanLicense = () => {
    if (hasPermission === null) {
      Alert.alert('طلب إذن', 'يرجى السماح بالوصول إلى الكاميرا');
      return;
    }
    if (hasPermission === false) {
      Alert.alert('إذن مرفوض', 'لا يمكن الوصول إلى الكاميرا بدون إذن');
      return;
    }
    setShowCamera(true);
  };

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
        });
        
        // Simulate license validation processing
        setLicenseImage(photo);
        setShowCamera(false);
        
        // Simulate processing time
        setTimeout(() => {
          // Here you would typically send the image to a backend for OCR/license validation
          // For now, we'll simulate successful validation
          console.log('License image captured:', photo.uri);
        }, 1000);
        
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('خطأ', 'حدث خطأ أثناء التقاط الصورة');
      }
    }
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const image = result.assets[0];
        setLicenseImage(image);
        
        // Simulate processing time
        setTimeout(() => {
          console.log('License image selected:', image.uri);
        }, 1000);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('خطأ', 'حدث خطأ أثناء اختيار الصورة');
    }
  };



  const handleClose = () => {
    setLicenseImage(null);
    setShowCamera(false);
    onClose();
  };

  const handleContinue = () => {
    if (licenseImage) {
      setLicenseImage(null);
      setShowCamera(false);
      onLicenseValidated();
    }
  };

  const toggleFlash = () => {
    setFlashMode(flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off);
  };

  const toggleCamera = () => {
    setCameraType(cameraType === CameraType.back ? CameraType.front : CameraType.back);
  };

  if (hasPermission === null) {
    return null;
  }

  if (hasPermission === false) {
    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleClose}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleClose}
        >
          <TouchableOpacity 
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                <Ionicons name="close" size={24} color={Colors.primaryDark} />
              </TouchableOpacity>
              <CustomText style={styles.modalTitle}>إذن الكاميرا مطلوب</CustomText>
            </View>
            <View style={styles.permissionContainer}>
              <Ionicons name="camera-off" size={80} color={Colors.primaryDark} />
              <CustomText style={styles.permissionText}>
                يرجى السماح بالوصول إلى الكاميرا في إعدادات التطبيق
              </CustomText>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }

  return (
    <>
      {/* Main Modal */}
      <Modal
        visible={visible && !showCamera}
        transparent={true}
        animationType="slide"
        onRequestClose={handleClose}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleClose}
        >
          <TouchableOpacity 
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                <Ionicons name="close" size={24} color={Colors.primaryDark} />
              </TouchableOpacity>
              <CustomText style={styles.modalTitle}>فحص رخصة القيادة</CustomText>

            </View>

            {/* License Scan Area */}
            <View style={styles.scanContainer}>
              <View style={styles.scanArea}>
                {/* Corner Guides */}
                <View style={[styles.cornerGuide, styles.topLeft]} />
                <View style={[styles.cornerGuide, styles.topRight]} />
                <View style={[styles.cornerGuide, styles.bottomLeft]} />
                <View style={[styles.cornerGuide, styles.bottomRight]} />
                
                {/* License Image or Placeholder */}
                {licenseImage ? (
                  <View style={styles.licenseImageContainer}>
                    <Image 
                      source={{ uri: licenseImage.uri }} 
                      style={styles.licenseImage}
                      resizeMode="cover"
                    />
                    <View style={styles.licenseOverlay}>
                      <Ionicons name="checkmark-circle" size={40} color={Colors.primary} />
                      <CustomText style={styles.licenseValidText}>تم التحقق من الرخصة</CustomText>
                    </View>
                  </View>
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Ionicons name="camera" size={60} color={Colors.primaryDark} />
                    <CustomText style={styles.placeholderText}>أمسح / أضف الصورة</CustomText>
                  </View>
                )}
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              {!licenseImage ? (
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.scanButton} onPress={handleScanLicense}>
                    <Ionicons name="camera" size={20} color={Colors.primaryDark} />
                    <CustomText style={styles.scanButtonText}>مسح الرخصة</CustomText>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.uploadButton} onPress={handlePickImage}>
                    <Ionicons name="images" size={20} color={Colors.primaryDark} />
                    <CustomText style={styles.uploadButtonText}>رفع صورة</CustomText>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                  <CustomText style={styles.continueButtonText}>متابعة الحجز</CustomText>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Camera Modal */}
      <Modal
        visible={showCamera}
        animationType="slide"
        onRequestClose={() => setShowCamera(false)}
      >
        <View style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={cameraType}
            flashMode={flashMode}
          >
            {/* Camera Overlay */}
            <View style={styles.cameraOverlay}>
              {/* Top Controls */}
              <View style={styles.cameraTopControls}>
                <TouchableOpacity 
                  style={styles.cameraControlButton}
                  onPress={() => setShowCamera(false)}
                >
                  <Ionicons name="close" size={30} color={Colors.white} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.cameraControlButton}
                  onPress={toggleFlash}
                >
                  <Ionicons 
                    name={flashMode === FlashMode.torch ? "flash" : "flash-off"} 
                    size={30} 
                    color={Colors.white} 
                  />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.cameraControlButton}
                  onPress={toggleCamera}
                >
                  <Ionicons name="camera-reverse" size={30} color={Colors.white} />
                </TouchableOpacity>
              </View>

              {/* Scan Frame */}
              <View style={styles.scanFrame}>
                <View style={[styles.cornerGuide, styles.topLeft]} />
                <View style={[styles.cornerGuide, styles.topRight]} />
                <View style={[styles.cornerGuide, styles.bottomLeft]} />
                <View style={[styles.cornerGuide, styles.bottomRight]} />
              </View>

              {/* Bottom Controls */}
              <View style={styles.cameraBottomControls}>
                <TouchableOpacity 
                  style={styles.captureButton}
                  onPress={handleTakePicture}
                >
                  <View style={styles.captureButtonInner} />
                </TouchableOpacity>
              </View>
            </View>
          </Camera>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'rgba(244,234,193, 0.95)',
    borderRadius: 30,
    padding: 20,
    width: '90%',
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'center',
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  scanContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  scanArea: {
    width: 280,
    height: 160,
    backgroundColor: Colors.white,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cornerGuide: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: Colors.primaryDark,
    borderWidth: 3,
  },
  topLeft: {
    top: -2,
    left: -2,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: -2,
    right: -2,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: Colors.primaryDark,
    marginTop: 10,
    textAlign: 'center',
  },
  licenseImageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  licenseImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  licenseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  licenseValidText: {
    fontSize: 14,
    color: Colors.white,
    marginTop: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actionButtons: {
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
  },
  scanButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  scanButtonText: {
    color: Colors.primaryDark,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  uploadButton: {
    backgroundColor: Colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadButtonText: {
    color: Colors.primaryDark,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  continueButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 6,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  continueButtonText: {
    color: Colors.primaryDark,
    fontSize: 14,
    fontWeight: 'bold',
  },
  permissionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 16,
    color: Colors.primaryDark,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 24,
  },
  // Camera Styles
  cameraContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cameraTopControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
  },
  cameraControlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 280,
    height: 180,
    marginLeft: -140,
    marginTop: -90,
  },
  cameraBottomControls: {
    alignItems: 'center',
    paddingBottom: 50,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: Colors.primary,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
  },
});

export default DrivingLicenseModal;
