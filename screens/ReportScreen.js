import React from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Colors } from '../constants/Colors';
import CustomText from '../components/CustomText';
import { Ionicons } from '@expo/vector-icons';
import BottomTabNavigator from '../components/BottomTabNavigator';

const ReportScreen = ({ navigation }) => {
  const faqQuestions = [
    "ما هي الميزات الرئيسية التي يقدمها البرنامج؟",
    "كيف يمكنني جدولة الأحداث وإدارتها؟",
    "هل يتضمن البرنامج خاصية تذكير العملاء بالمواعيد المهمة؟",
    "هل توجد رسوم إضافية للميزات أو الخدمات الخاصة؟",
    "هل يمكن تخصيص تصميم البرنامج ليتناسب مع هوية علامتي التجارية؟"
  ];

  const handleAskQuestion = () => {
    // Handle asking a different question
    console.log('Ask different question pressed');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Header Section */}
        <View style={styles.headerSection}>
          <CustomText style={styles.headerTitle}>الإبلاغ</CustomText>
        </View>

        {/* Main Content Area */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.faqSection}>
            <CustomText style={styles.faqTitle}>الأسئلة المتكررة</CustomText>
            
            {/* FAQ Questions */}
            <View style={styles.questionsContainer}>
              {faqQuestions.map((question, index) => (
                <CustomText key={index} style={styles.questionText}>
                  {question}
                </CustomText>
              ))}
            </View>

            {/* Contact Information */}
            <View style={styles.contactContainer}>
              <CustomText style={styles.contactText}>
                يمكن التواصل من خلال البريد الإلكتروني التالي :
              </CustomText>
              <CustomText style={styles.emailText}>
                benfrahk@gmail.com
              </CustomText>
            </View>

            {/* Ask Different Question Button */}
            <TouchableOpacity 
              style={styles.askQuestionButton}
              onPress={handleAskQuestion}
            >
              <CustomText style={styles.askQuestionButtonText}>
                طرح سؤال مختلف
              </CustomText>
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
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  headerSection: {
    backgroundColor: '#f4eac1',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
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
  faqSection: {
    backgroundColor: '#f4eac1',
    borderRadius: 35,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  faqTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'right',
    marginBottom: 20,
  },
  questionsContainer: {
    marginBottom: 25,
  },
  questionText: {
    fontSize: 16,
    color: Colors.primaryDark,
    textAlign: 'right',
    marginBottom: 15,
    lineHeight: 22,
  },
  contactContainer: {
    marginBottom: 25,
    alignItems: 'center',
  },
  contactText: {
    fontSize: 16,
    color: Colors.primaryDark,
    textAlign: 'center',
    marginBottom: 10,
  },
  emailText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  askQuestionButton: {
    backgroundColor: '#f4d376',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '60%',
    elevation: 3,
    alignSelf: 'center',
  },
  askQuestionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primaryDark,
  },
});

export default ReportScreen;
