# Wedding Reservation First

A comprehensive React Native mobile application for wedding service reservations and partner management in Jordan.

## 🌟 Features

### Core Functionality
- **Partner Discovery**: Browse wedding service providers (venues, photographers, makeup artists, etc.)
- **Package Management**: View and subscribe to installment packages
- **Chat System**: Direct messaging with service partners
- **Favorites**: Save and manage preferred partners
- **Notifications**: Stay updated with offers and updates

### Partner Categories
- 🏨 **Party Venues**: Hotels and event halls
- 👗 **Fashion & Clothing**: Wedding dresses and suits
- 🚗 **Transportation**: Car rental services
- 💄 **Beauty & Makeup**: Professional makeup artists
- 📸 **Photography**: Wedding photography services

### User Experience
- **Arabic Language Support**: Full RTL (Right-to-Left) interface
- **Modern UI/UX**: Clean, intuitive design with smooth animations
- **Responsive Design**: Optimized for various screen sizes
- **Offline Capability**: Core functionality works without internet

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
   git clone <your-repo-url>
   cd "Wedding Reservation First"
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
- **Fallback**: System fonts
- **RTL Support**: Full Arabic text direction

### Components
- **Rounded Corners**: Consistent 15-30px border radius
- **Shadows**: Subtle elevation with proper contrast
- **Spacing**: 8px grid system for consistent layout

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_API_URL=your_api_url_here
EXPO_PUBLIC_APP_NAME=Aseel Wedding Reservation
```

### Metro Configuration
The app uses Metro bundler with custom configuration for asset handling and SVG support.

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

## 🚀 Deployment

### Building for Production
```bash
# iOS
expo build:ios

# Android
expo build:android
```

### App Store Deployment
1. Configure app.json with proper metadata
2. Build production version
3. Submit to App Store Connect / Google Play Console

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [Your Name]
- **Design**: [Designer Name]
- **Project Manager**: [PM Name]

## 📞 Support

For support and questions:
- Email: support@weddingreservationfirst.com
- Phone: +962 XX XXX XXXX
- Website: www.weddingreservationfirst.com

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Core partner discovery features
- Chat system implementation
- Package management
- Arabic language support

---
