// Utility functions for number handling

// Convert Arabic numbers to English numbers
export const convertArabicToEnglish = (text) => {
  if (typeof text !== 'string') return text;
  
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  let result = text;
  arabicNumbers.forEach((arabicNum, index) => {
    result = result.replace(new RegExp(arabicNum, 'g'), englishNumbers[index]);
  });
  
  return result;
};

// Format number with proper font family
export const formatNumber = (number, style = {}) => {
  return {
    ...style,
    fontFamily: 'AdventPro',
    text: convertArabicToEnglish(number?.toString() || '0'),
  };
};

// Check if text contains Arabic numbers
export const containsArabicNumbers = (text) => {
  if (typeof text !== 'string') return false;
  const arabicNumberRegex = /[٠-٩]/;
  return arabicNumberRegex.test(text);
};

