import React, { useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from './CustomText';
import { Colors } from '../constants/Colors';

const BookingProcessModal = ({
  visible,
  onClose,
  partnerName,
  partnerLogo,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showMonthView, setShowMonthView] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [rating, setRating] = useState(0);

  const months = [
    'يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  const daysOfWeek = ['س', 'ن', 'ث', 'أر', 'خ', 'ج', 'س'];

  const handleClose = () => {
    setCurrentPage(1);
    setSelectedDate(null);
    setShowMonthView(false);
    setSelectedMonth(null);
    setShowPaymentForm(false);
    setShowSuccessScreen(false);
    setShowThankYouModal(false);
    setRating(0);
    onClose();
  };

  const handleThankYouClose = () => {
    // Reset all states
    setCurrentPage(1);
    setSelectedDate(null);
    setShowMonthView(false);
    setSelectedMonth(null);
    setShowPaymentForm(false);
    setShowSuccessScreen(false);
    setShowThankYouModal(false);
    setRating(0);
    // Close the entire modal
    onClose();
  };

  const renderCalendarPage = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    return (
      <View style={styles.pageContainer}>
        <View style={styles.monthsGrid}>
          {/* Current year months (from current month onwards) */}
          {months.map((month, monthIndex) => {
            // Only show months from current month onwards
            if (monthIndex < currentMonth) return null;
            
            return (
              <TouchableOpacity
                key={`${currentYear}-${monthIndex}`}
                style={styles.monthButton}
                onPress={() => {
                  setSelectedMonth({ month: monthIndex, year: currentYear });
                  setShowMonthView(true);
                }}
              >
                <CustomText style={styles.monthText}>{month}</CustomText>
                <CustomText style={styles.yearText}>{currentYear}</CustomText>
              </TouchableOpacity>
            );
          })}
          
          {/* Next year months (first few months) */}
          {months.slice(0, 6).map((month, monthIndex) => (
            <TouchableOpacity
              key={`${currentYear + 1}-${monthIndex}`}
              style={styles.monthButton}
              onPress={() => {
                setSelectedMonth({ month: monthIndex, year: currentYear + 1 });
                setShowMonthView(true);
              }}
            >
              <CustomText style={styles.monthText}>{month}</CustomText>
              <CustomText style={styles.yearText}>{currentYear + 1}</CustomText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderMonthView = () => {
    if (!selectedMonth) return null;
    
    const { month, year } = selectedMonth;
    const selectedMonthName = months[month];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const dates = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }

    return (
      <View style={styles.pageContainer}>
        <View style={styles.monthHeader}>
          <TouchableOpacity 
            style={styles.backArrowButton} 
            onPress={() => { 
              setShowMonthView(false); 
              setSelectedMonth(null); 
            }}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.primaryDark} />
          </TouchableOpacity>
          <CustomText style={styles.monthTitle}>{selectedMonthName}</CustomText>
        </View>
        
        <View style={styles.daysOfWeekContainer}>
          {daysOfWeek.map((day, index) => (
            <CustomText key={`day-${index}`} style={styles.dayOfWeek}>{day}</CustomText>
          ))}
        </View>
        
        <View style={styles.calendarGrid}>
          {dates.map((date, index) => {
            const isCurrentMonth = date.getMonth() === month;
            const isSelected = selectedDate && 
              date.getDate() === selectedDate.getDate() && 
              date.getMonth() === selectedDate.getMonth() && 
              date.getFullYear() === selectedDate.getFullYear();
            const isToday = date.toDateString() === new Date().toDateString();
            const isPastDate = date < new Date(new Date().setHours(0, 0, 0, 0));
            
            return (
              <TouchableOpacity
                key={`date-${date.toISOString()}`}
                style={[
                  styles.calendarDay,
                  !isCurrentMonth && styles.otherMonthDay,
                  isPastDate && styles.pastDay,
                  isToday && styles.today,
                  isSelected && styles.selectedDay
                ]}
                onPress={() => {
                  if (isCurrentMonth && !isPastDate) {
                    setSelectedDate(date);
                  }
                }}
                disabled={isPastDate}
              >
                <CustomText style={[
                  styles.dayText,
                  !isCurrentMonth && styles.otherMonthDayText,
                  isPastDate && styles.pastDayText,
                  isToday && styles.todayText,
                  isSelected && styles.selectedDayText
                ]}>
                  {date.getDate()}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
        
        {selectedDate && (
          <TouchableOpacity
            style={styles.continueToPaymentButton}
            onPress={() => { 
              setShowPaymentForm(true);
              setShowMonthView(false);
              // Don't clear selectedMonth - we need it to go back
              setSelectedDate(null);
            }}
          >
            <CustomText style={styles.continueToPaymentText}>متابعة الى الدفع</CustomText>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderPaymentForm = () => (
    <View style={styles.pageContainer}>
      <View style={styles.paymentHeader}>
        <TouchableOpacity 
          style={styles.backArrowButton} 
          onPress={() => {
            setShowPaymentForm(false);
            setShowMonthView(true);
            // selectedMonth is already preserved, so we can go back to the days calendar
          }}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primaryDark} />
        </TouchableOpacity>
        <CustomText style={styles.pageTitle}>معلومات الدفع</CustomText>
      </View>
      
              <View style={styles.paymentSection}>
          <CustomText style={styles.paymentLabel}>طريقة الدفع</CustomText>
          <View style={styles.paymentMethodContainer}>
            <Ionicons name="card" size={24} color={Colors.primary} />
            <TextInput 
              style={styles.paymentMethodInput}
              placeholder="Card"
              placeholderTextColor={Colors.gray}
            />
          </View>
        </View>
      
              <View style={styles.paymentSection}>
          <CustomText style={styles.paymentLabel}>الاسم على البطاقة</CustomText>
          <TextInput 
            style={styles.paymentInput}
            placeholder="Name on card"
            placeholderTextColor={Colors.gray}
          />
        </View>
      
              <View style={styles.paymentSection}>
          <CustomText style={styles.paymentLabel}>تفاصيل البطاقة</CustomText>
                  <View style={styles.unifiedCardDetailsContainer}>
          <TextInput
            style={[styles.cardDetailInput, { flex: 3 }]}
            placeholder="0000 0000 0000 0000"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.cardDetailInput, { flex: 1 }]}
            placeholder="MM/YY"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.cardDetailInput, { flex: 1 }]}
            placeholder="CVV"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
          />
        </View>
        </View>
      
      <TouchableOpacity
        style={styles.confirmPaymentButton}
        onPress={() => { setShowSuccessScreen(true); }}
      >
        <CustomText style={styles.confirmPaymentText}>تأكيد</CustomText>
      </TouchableOpacity>
    </View>
  );

  const renderSuccessScreen = () => (
    <View style={styles.pageContainer}>
      <View style={styles.successIconContainer}>
        <View style={styles.successIconCircle}>
          <Ionicons name="checkmark" size={50} color={Colors.white} />
        </View>
      </View>
      
      <View style={styles.ratingContainer}>
        <CustomText style={styles.ratingTitle}>كيف تقيم الخدمة؟</CustomText>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((starIndex) => (
            <TouchableOpacity 
              key={starIndex} 
              style={styles.starContainer} 
              onPress={() => setRating(starIndex)}
            >
              <Ionicons 
                name={starIndex <= rating ? "star" : "star-outline"} 
                size={30} 
                color={starIndex <= rating ? "#FFD700" : "#999"} 
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.rateServiceButton} 
        onPress={() => setShowThankYouModal(true)}
      >
        <CustomText style={styles.rateServiceText}>تقييم الخدمة</CustomText>
      </TouchableOpacity>
      
      <View style={styles.successTextContainer}>
        <CustomText style={styles.successText}>نقوم بتقييم الخدمات لتحسين الجودة</CustomText>
      </View>
    </View>
  );

  const renderThankYouModal = () => (
    <View style={styles.pageContainer}>
      <View style={styles.thankYouIconContainer}>
        <View style={styles.thankYouIconCircle}>
          <Ionicons name="heart" size={50} color={Colors.white} />
        </View>
      </View>
      
      <View style={styles.thankYouTextContainer}>
        <CustomText style={styles.thankYouTitle}>شكراً لك!</CustomText>
        <CustomText style={styles.thankYouSubtitle}>تم تقييم الخدمة بنجاح</CustomText>
      </View>
      
      <TouchableOpacity style={styles.closeModalButton} onPress={handleThankYouClose}>
        <CustomText style={styles.closeModalText}>إغلاق</CustomText>
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    console.log('Render states:', { showThankYouModal, showSuccessScreen, showPaymentForm, showMonthView });
    
    if (showThankYouModal) return renderThankYouModal();
    if (showSuccessScreen) return renderSuccessScreen();
    if (showPaymentForm) return renderPaymentForm();
    if (showMonthView) return renderMonthView();
    return renderCalendarPage();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {!showMonthView && !showPaymentForm && !showSuccessScreen && !showThankYouModal && (
            <View style={styles.modalHeader}>
              <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                <Ionicons name="close" size={24} color={Colors.primaryDark} />
              </TouchableOpacity>
              <CustomText style={styles.modalTitle}>تاريخ الحدث</CustomText>
            </View>
          )}
          
          <View style={styles.modalBody}>
            {renderContent()}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#f4eac1', // Light beige background like original
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '90%',
    minHeight: 450,
  },
  modalHeader: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 5,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'center',
    alignSelf: 'center',
  },
  modalBody: {
    flex: 1,
    minHeight: 400,
  },
  pageContainer: {
    flex: 1,
    minHeight: 400,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',
    marginBottom: 0,
  },
  monthsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 5,
  },
  monthButton: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primaryDark,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  monthText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    marginBottom: 6,
    textAlign: 'center',
  },
  yearText: {
    fontSize: 12,
    color: Colors.primaryDark,
    fontWeight: '600',
  },
  monthHeader: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 30,
  },
  backArrowButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 10,
    zIndex: 1,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'center',
    alignSelf: 'center',
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  dayOfWeek: {
    width: '14.28%',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    minWidth: 40,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  calendarDay: {
    width: '10.28%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
  },
  otherMonthDay: {
    // No background color - transparent
  },
  pastDay: {
    opacity: 0.3,
  },
  today: {
    backgroundColor: Colors.primary,
  },
  selectedDay: {
    backgroundColor: '#FFD700',
    borderRadius: 25,
    width: 35,
    height: 35,
    alignSelf: 'center',
  },
  dayText: {
    fontSize: 14,
    color: Colors.primaryDark,
  },
  otherMonthDayText: {
    color: Colors.gray,
  },
  pastDayText: {
    color: Colors.gray,
  },
  todayText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  selectedDayText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  continueToPaymentButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 5,
  },
  continueToPaymentText: {
    color: Colors.primaryDark,
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentHeader: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 30,
  },
  paymentSection: {
    marginBottom: 10,
    marginTop: 0,
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    marginBottom: 5,
    alignSelf: 'flex-end',
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f8f6f0',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentMethodInput: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 5,
    marginLeft: 10,
    fontSize: 14,
    color: Colors.gray,
  },
  paymentMethodText: {
    fontSize: 14,
    color: Colors.primaryDark,
  },
  paymentInput: {
    backgroundColor: '#f8f6f0',
    padding: 15,
    borderRadius: 12,
    borderWidth: 0,
    fontSize: 14,
    color: Colors.gray,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentPlaceholder: {
    color: Colors.gray,
    fontSize: 14,
  },
  unifiedCardDetailsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f6f0',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDetailInput: {
    backgroundColor: 'transparent',
    padding: 5,
    borderWidth: 0,
    fontSize: 14,
    color: Colors.gray,
  },
  cardDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },
  confirmPaymentButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 20,
  },
  confirmPaymentText: {
    color: Colors.primaryDark,
    fontSize: 16,
    fontWeight: 'bold',
  },
  successIconContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  successIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    marginBottom: 20,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  starContainer: {
    padding: 5,
  },
  rateServiceButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 20,
  },
  rateServiceText: {
    color: Colors.primaryDark,
    fontSize: 16,
    fontWeight: 'bold',
  },
  successTextContainer: {
    alignItems: 'center',
  },
  successText: {
    fontSize: 14,
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  thankYouIconContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  thankYouIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thankYouTextContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  thankYouTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    marginBottom: 10,
  },
  thankYouSubtitle: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
  },
  closeModalButton: {
    backgroundColor: Colors.primaryDark,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
  },
  closeModalText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingProcessModal;
