# Wedding Reservation First

A comprehensive React Native mobile application for wedding service reservations and partner management in Jordan.

## 🌟 Features

### Core Functionality
- **Partner Discovery**: Browse wedding service providers (venues, clothes, makeup artists, etc.)
- **Package Management**: View and subscribe to installment packages
- **Chat System**: Direct messaging with service partners
- **Favorites**: Save and manage preferred partners
- **Notifications**: Stay updated with offers and updates

### Partner Categories
- 🏨 **Party Venues**: Hotels and event halls
- 👗 **Fashion & Clothing**: Wedding dresses and suits
- 🚗 **Transportation**: Car rental services
- 💄 **Beauty & Makeup**: Professional makeup artists

### User Experience
- **Arabic Language Support**: Full RTL (Right-to-Left) interface
- **Modern UI/UX**: Clean, intuitive design with smooth animations
- **Responsive Design**: Optimized for various screen sizes


## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- React Native CLI
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <the repo url ssh/http>
   cd "Wedding Reservation"
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your device

## 📱 App Structure

### Screens
- `HomeScreen`: Main dashboard with categories and special packages
- `PartnerInfoScreen`: Detailed partner information and gallery
- `ChatScreen`: Direct messaging with partners
- `ChatListScreen`: Overview of all conversations
- `OffersScreen`: Current promotions and deals
- `InstallmentPackagesScreen`: Payment plan management
- `ProfileScreen`: User account and settings

### Components
- `PackageSlider`: Interactive package selection
- `OfferCard`: Discount and package details
- `ImageSlider`: Gallery image carousel
- `NotificationsModal`: User notifications
- `BottomTabNavigator`: Main navigation

### Contexts
- `UserContext`: User authentication and profile
- `FavoritesContext`: Favorite partners management
- `FollowContext`: Partner following system
- `NotificationsContext`: Notification state management
- `ConversationsContext`: Chat conversation storage

## 🎨 Design System

### Colors
- **Primary**: `#6A1B9A` (Dark Purple)
- **Secondary**: `#FDD835` (Yellow)
- **Background**: `#fffdf7` (Light Cream)
- **Accent**: `#f4eac1` (Light Yellow)

### Typography
- **Arabic Font**: VIP Rawy Thin
- **Number Font**: Advent Pro Regular
- **Fallback**: System fonts
- **RTL Support**: Full Arabic text direction

### Components
- **Rounded Corners**: Consistent 15-30px border radius
- **Shadows**: Subtle elevation with proper contrast
- **Spacing**: 8px grid system for consistent layout

## 🔧 Configuration


## 📦 Dependencies

### Core Dependencies
- `react-native`: Core framework
- `expo`: Development platform
- `@react-navigation`: Navigation system
- `react-native-svg`: SVG icon support

### UI Libraries
- `@expo/vector-icons`: Icon library
- `expo-av`: Video playback
- `expo-font`: Custom font loading


## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Core partner discovery features
- Chat system implementation
- Package management
- Arabic language support

---
