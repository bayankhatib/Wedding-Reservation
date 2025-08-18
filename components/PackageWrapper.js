import React, { useState } from 'react';
import PackageSlider from './PackageSlider';
import OfferCard from './OfferCard';
import BookingProcessModal from './BookingProcessModal';
import { addSubscribedPackage } from '../constants/SubscribedPackages';

const PackageWrapper = ({ visible, onClose, selectedPackage }) => {
  const [currentView, setCurrentView] = useState('slider'); // 'slider', 'offer', 'booking'
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleClose = () => {
    // Reset all states and close the wrapper
    setCurrentView('slider');
    setSelectedOffer(null);
    onClose();
  };

  const handleSubscribe = (offer) => {
    setSelectedOffer(offer);
    setCurrentView('offer');
    // Don't call onClose - just switch views within the wrapper
  };

  const handleOfferSubscribe = (offerWithBank) => {
    // Create complete package data with defaults for missing properties
    const packageData = {
      id: Date.now(), // Generate unique ID
      packageName: selectedPackage?.name || 'باقة تقسيط',
      duration: parseInt(offerWithBank.duration?.split(' ')[0]) || 24,
      monthlyAmount: parseInt(offerWithBank.monthlyPrice) || 375,
      remainingMonths: parseInt(offerWithBank.duration?.split(' ')[0]) || 24,
      totalAmount: parseInt(offerWithBank.totalPrice?.replace(/,/g, '')) || 9000,
      remainingAmount: parseInt(offerWithBank.totalPrice?.replace(/,/g, '')) || 9000,
      bankName: offerWithBank.selectedBank?.name || 'بنك الاتحاد',
      offerLogos: offerWithBank.logos || [require('../assets/partnersLogo/alnuman.jpg')],
      isSubscribed: true,
      subscriptionDate: new Date().toISOString(),
      originalPrice: selectedPackage?.price || '9000 دينار'
    };
    addSubscribedPackage(packageData);
    
    // Continue with the original flow - show booking modal
    setCurrentView('booking');
  };

  const handleCloseOfferCard = () => {
    // Close everything instead of going back to slider
    handleClose();
  };

  const handleCloseBookingProcess = () => {
    // Close everything instead of going back to offer card
    handleClose();
  };

  // Only close the wrapper when we're in slider view and user wants to close
  const handleSliderClose = () => {
    if (currentView === 'slider') {
      onClose();
    }
  };

  if (!visible) return null;

  // Render the appropriate view based on currentView state
  switch (currentView) {
    case 'booking':
      return (
        <BookingProcessModal
          visible={currentView === 'booking'}
          onClose={handleCloseBookingProcess}
          partnerName={selectedPackage?.name || ''}
          partnerBasePrice={selectedOffer?.totalPrice || '0'}
          partnerGallery={[]}
          partnerLogo={null}
        />
      );

    case 'offer':
      return (
        <OfferCard
          visible={currentView === 'offer'}
          onClose={handleCloseOfferCard}
          selectedPackage={selectedPackage}
          selectedOffer={selectedOffer}
          onSubscribe={handleOfferSubscribe}
        />
      );

    case 'slider':
    default:
      return (
        <PackageSlider
          visible={currentView === 'slider'}
          onClose={handleSliderClose}
          selectedPackage={selectedPackage}
          onSubscribe={handleSubscribe}
        />
      );
  }
};

export default PackageWrapper;
