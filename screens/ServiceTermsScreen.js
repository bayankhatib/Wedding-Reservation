import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/Colors';
import CustomText from '../components/CustomText';
import Logo from '../assets/logo.svg';
import BottomTabNavigator from '../components/BottomTabNavigator';

const ServiceTermsScreen = ({ navigation }) => {
  const [showMore, setShowMore] = useState(false);

  const serviceTerms = [
    {
      title: "التسجيل",
      description: "يلتزم مزود الخدمة بتقديم معلومات صحيحة ومحدثة ويحق للمنصة قبول أو رفض التسجيل دون إبداء الأسباب"
    },
    {
      title: "عرض الخدمات",
      description: "مزود الخدمة مسؤول عن دقة وصف الخدمة، جودة الصور تحديد الأسعار والمواعيد بوضوح"
    },
    {
      title: "المصمم الإبداعي",
      description: "يشترط وجود مصمم ضمن الفريق لضمان جودة المحتوى البصري ويجوز للمنصة طلب نماذج من الأعمال"
    },
    {
      title: "الحجز والدفع",
      description: "تتم الحجوزات من خلال المنصة مع خصم عمولة متفق عليها يتم تحويل المبالغ حسب سياسة الدفع المعتمدة"
    },
    {
      title: "الالتزام بالخدمة",
      description: "يلتزم مزود الخدمة بتقديم الخدمة المتفق عليها في الوقت المحدد وبالجودة المطلوبة"
    },
    {
      title: "الإلغاء والاسترداد",
      description: "يحق للعميل إلغاء الحجز قبل 24 ساعة من موعد الخدمة مع استرداد كامل المبلغ المدفوع"
    },
    {
      title: "الاستخدام المسموح",
      description: "يجب استخدام المنصة لأغراض مشروعة فقط وعدم إساءة استخدام الخدمات المقدمة"
    },
    {
      title: "الملكية الفكرية",
      description: "جميع المحتويات والتصاميم محفوظة الحقوق ولا يجوز نسخها أو استخدامها دون إذن مسبق"
    },
    {
      title: "التعديلات",
      description: "يحق للمنصة تعديل هذه الشروط في أي وقت مع إشعار المستخدمين بالتغييرات"
    },
    {
      title: "حل النزاعات",
      description: "في حالة وجود نزاع، يتم حله بالطرق الودية أولاً أو اللجوء للقضاء المختص"
    }
  ];

  const handleAgree = () => {
    // Handle agreement to terms
    console.log('User agreed to terms');
    navigation.goBack();
  };

  const displayedTerms = showMore ? serviceTerms : serviceTerms.slice(0, 4);

  const renderDescription = (description) => {
    if (description.includes('24')) {
      const parts = description.split('24');
      return (
        <>
          {parts[0]}
          <CustomText style={{ fontFamily: 'AdventPro' }}>24</CustomText>
          {parts[1]}
        </>
      );
    }
    return description;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header with Logo */}
        <View style={styles.headerSection}>
          <View style={styles.logoContainer}>
            <Logo
              style={styles.logoImage}
              width={150}
              height={100}
            />
          </View>
        </View>

        {/* Main Content Area */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.termsSection}>
            <CustomText style={styles.termsTitle}>شروط الخدمة</CustomText>

            {/* Service Terms */}
            <View style={styles.termsContainer}>
              {displayedTerms.map((term, index) => (
                <View key={index} style={styles.termItem}>
                  <CustomText style={styles.termTitle}>{term.title}</CustomText>
                  <CustomText style={styles.termDescription}>
                    {renderDescription(term.description)}
                  </CustomText>
                </View>
              ))}
            </View>

            {/* Show More/Less Link */}
            <TouchableOpacity
              style={styles.showMoreContainer}
              onPress={() => setShowMore(!showMore)}
            >
              <CustomText style={styles.showMoreText}>
                {showMore ? 'عرض أقل' : 'عرض أكثر'}
              </CustomText>
              <Icon
                name={showMore ? "chevron-down" : "chevron-up"}
                size={16}
                color={Colors.primaryDark}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Tabs */}
      <BottomTabNavigator
        state={{ index: 4 }}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryDark,
  },
  safeArea: {
    flex: 1,
  },
  headerSection: {
    paddingTop: 20,
    alignItems: 'flex-end',
  },
  logoContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logoImage: {
    alignSelf: 'right',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  termsSection: {
    backgroundColor: '#f4eac1',
    // borderRadius: 25,
    borderTopLeftRadius: 60,
    borderBottomRightRadius: 60,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  termsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'center',
    marginBottom: 25,
  },
  termsContainer: {
    marginBottom: 25,
  },
  termItem: {
    marginBottom: 20,
  },
  termTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'center',
    marginBottom: 8,
  },
  termDescription: {
    fontSize: 16,
    color: Colors.primaryDark,
    textAlign: 'right',
    lineHeight: 24,
    opacity: 0.9,
  },
  showMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    paddingVertical: 10,
  },
  showMoreText: {
    fontSize: 16,
    color: Colors.primaryDark,
    marginRight: 8,
    textDecorationLine: 'underline',
  },
  agreeButton: {
    backgroundColor: '#f4d376',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  agreeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryDark,
  },
});

export default ServiceTermsScreen;
