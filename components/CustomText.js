import { Text } from 'react-native';
import { convertArabicToEnglish, containsArabicNumbers } from '../utils/numberUtils';

const CustomText = ({ style, children, ...rest }) => {
  // Check if the text contains numbers and apply appropriate font
  const hasNumbers = children && containsArabicNumbers(children.toString());
  
  // Convert Arabic numbers to English if present
  const processedChildren = hasNumbers ? convertArabicToEnglish(children) : children;
  
  // Use '' for numbers, VIPRawyThin for regular text
  const fontFamily = hasNumbers ? 'AdventPro' : 'VIPRawyThin';
  
  // Debug logging
  console.log('CustomText Debug:', { 
    hasNumbers, 
    fontFamily, 
    children: children?.toString().substring(0, 20),
    processedChildren: processedChildren?.toString().substring(0, 20)
  });
  
  return (
    <Text style={[{ fontFamily }, style]} {...rest}>
      {processedChildren}
    </Text>
  );
};

export default CustomText;