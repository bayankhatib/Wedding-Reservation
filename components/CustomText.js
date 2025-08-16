import { Text } from 'react-native';

const CustomText = ({ style, children, ...rest }) => {
  return (
    <Text style={[{ fontFamily: 'VIPRawyThin' }, style]} {...rest}>
      {children}
    </Text>
  );
};

export default CustomText;