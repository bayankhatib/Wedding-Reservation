import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Colors } from './constants/Colors';
import { useFonts } from 'expo-font';

// Import screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import CreateBusinessAccountScreen from './screens/CreateBusinessAccountScreen';
// import TermsOfServiceScreen1 from './screens/TermsOfServiceScreen1';
// import TermsOfServiceScreen2 from './screens/TermsOfServiceScreen2';
import RegistrationSuccessScreen from './screens/RegistrationSuccessScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import CategoryListScreen from './screens/CategoryListScreen';
import PartnerInfoScreen from './screens/PartnerInfoScreen';
import InstallmentPackagesScreen from './screens/InstallmentPackagesScreen';
import InstallmentScreen from './screens/InstallmentScreen';
import OffersScreen from './screens/OffersScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import ReportScreen from './screens/ReportScreen';
import ServiceTermsScreen from './screens/ServiceTermsScreen';
import ChatScreen from './screens/ChatScreen';
import ChatListScreen from './screens/ChatListScreen';
// Import components
import BottomTabNavigator from './components/BottomTabNavigator';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { UserProvider } from './contexts/UserContext';
import { FollowProvider } from './contexts/FollowContext';
import { NotificationsProvider } from './contexts/NotificationsContext';
import { ConversationsProvider } from './contexts/ConversationsContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <BottomTabNavigator {...props} />}
    >
    
     
      
      {/* <Tab.Screen name="Account" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={HomeScreen} /> */}
       <Tab.Screen name="List" component={HomeScreen} />
       <Tab.Screen name="installment" component={InstallmentScreen} />
      <Tab.Screen name="Offers" component={OffersScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
};

// Main App Stack
const MainAppStack = () => {
  const [sideMenuVisible, setSideMenuVisible] = useState(false);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      <Stack.Screen name="CategoryList" component={CategoryListScreen} />
      <Stack.Screen name="PartnerInfo" component={PartnerInfoScreen} />
      <Stack.Screen name="InstallmentPackages" component={InstallmentPackagesScreen} />
      <Stack.Screen name="InstallmentScreen" component={InstallmentScreen} />
      <Stack.Screen name="OffersScreen" component={OffersScreen} />
      <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
      <Stack.Screen name="ServiceTermsScreen" component={ServiceTermsScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="ChatList" component={ChatListScreen} />
    </Stack.Navigator>
  );
};

// Auth Stack Navigator
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="CreateBusinessAccount" component={CreateBusinessAccountScreen} />
      {/* <Stack.Screen name="TermsOfService1" component={TermsOfServiceScreen1} />
      <Stack.Screen name="TermsOfService2" component={TermsOfServiceScreen2} /> */}
      <Stack.Screen name="RegistrationSuccess" component={RegistrationSuccessScreen} />
      <Stack.Screen name="MainApp" component={MainAppStack} />
    </Stack.Navigator>
  );
};

export default function App() {
    const [fontsLoaded] = useFonts({
      'VIPRawyThin': require('./assets/fonts/vip-rawy-thin.ttf'),
    });
    if (!fontsLoaded) {
      return null;
    }
  return (
    <UserProvider>
      <FollowProvider>
        <FavoritesProvider>
          <NotificationsProvider>
            <ConversationsProvider>
              <NavigationContainer>
                <StatusBar style="light" backgroundColor={Colors.primaryDark} />
                <AuthStack />
              </NavigationContainer>
            </ConversationsProvider>
          </NotificationsProvider>
        </FavoritesProvider>
      </FollowProvider>
    </UserProvider>
  );
} 