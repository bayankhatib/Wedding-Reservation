import { convertArabicToEnglish } from '../utils/numberUtils';

export const Categories = [
  { id: 1, title: 'مكان الحفل', image: 'part-location' },
  { id: 2, title: 'أزياء', image: 'clothes' },
  { id: 3, title: 'خبراء مكياج', image: 'makeup' },
  { id: 4, title: 'تأجير سيارات', image: 'cars' }
];

export const MostRequested = [
  {
    id: 1,
    title: 'بدلة عرس أنيقة',
    image: require('../assets/partners/di_class/photos/suit1.jpg'),
    price: convertArabicToEnglish('500 دينار'),
    category: 'الملابس',
    rating: 4.7,
    supplier: '',
    partnerId: 9, // Talyas Dress partner
  },
  {
    id: 2,
    title: 'فستان زفاف كلاسيكي',
    image: require('../assets/partners/beanka_rosa/photos/dress1.jpg'),
    rating: 4.9,
    price: convertArabicToEnglish('950 دينار'),
    category: 'الملابس',
    supplier: '',
    partnerId: 8,
  },
  {
    id: 3,
    title: 'سيارة زفاف',
    image: require('../assets/partners/elite_world/photos/car1.png'),
    rating: 4.9,
    price: convertArabicToEnglish('100 دينار'),
    category: 'التصوير',
    supplier: '',
    partnerId: 14, 
  },
  {
    id: 4,
    title: 'تجميل عروس',
    image: require('../assets/partners/sona_jermi/photos/makeup1.jpg'),
    price: convertArabicToEnglish('500 دينار'),
    rating: 4.8,
    category: 'التجميل',
    supplier: '',
    partnerId: 17, 
  }
];

export const SpecialPackages = [
  {
    id: 1,
    name: 'الباقة البرونزية',
    price: convertArabicToEnglish('1800 دينار'),
    description: 'باقة اقتصادية للخدمات الأساسية',
    icon: '/assets/icons/bronze-package.svg'
  },
  {
    id: 2,
    name: 'الباقة الفضية',
    price: convertArabicToEnglish('3000 دينار'),
    description: 'باقة متوسطة للخدمات الأساسية',
    icon: '/assets/icons/silver-package.svg',
  },
  {
    id: 3,
    name: 'الباقة الذهبية',
    price: convertArabicToEnglish('9000 دينار'),
    description: 'باقة شاملة لجميع الخدمات',
    icon: '/assets/icons/gold-package.svg'
  },
];

export const Notifications = [
  {
    id: 1,
    title: 'تم إرسال رسالة',
    message: 'لديك رسالة جديدة من العميل أحمد محمد',
    time: convertArabicToEnglish('منذ 5 دقائق'),
    icon: 'A',
    read: false
  },
  {
    id: 2,
    title: 'تم التفاعل مع منشوراتك',
    message: convertArabicToEnglish('أعجب 15 شخص بمنشورك الجديد'),
    time: convertArabicToEnglish('منذ ساعة'),
    icon: 'B',
    read: true
  },
  {
    id: 3,
    title: 'حجز جديد',
    message: 'تم تأكيد حجز جديد لخدمات التجميل',
    time: convertArabicToEnglish('منذ 3 ساعات'),
    icon: 'C',
    read: false
  },
  {
    id: 4,
    title: 'تقييم جديد',
    message: convertArabicToEnglish('حصلت على تقييم 5 نجوم من العميل سارة'),
    time: convertArabicToEnglish('منذ يوم'),
    icon: 'D',
    read: true
  }
];

export const BusinessProfile = {
  name: 'لجين سعد الدين',
  email: 'lujainsaadaldeen@gmail.com',
  businessType: 'تقديم جميع خدمات التجميل',
  rating: 4.8,
  reviews: 156,
  portfolio: [
    {
      id: 1,
      image: 'https://via.placeholder.com/120x120/ffcf33/ffffff?text=1',
      rating: 4.9
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/120x120/ffcf33/ffffff?text=2',
      rating: 4.7
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/120x120/ffcf33/ffffff?text=3',
      rating: 4.8
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/120x120/ffcf33/ffffff?text=4',
      rating: 4.6
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/120x120/ffcf33/ffffff?text=5',
      rating: 4.9
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/120x120/ffcf33/ffffff?text=6',
      rating: 4.7
    }
  ]
};

export const SubscriptionData = {
  plan: 'الباقة الذهبية',
  duration: '24 شهراً',
  monthlyPayment: '75 ريال',
  remainingMonths: '20',
  totalAmount: '1,200 ريال',
  features: [
    'عرض مميز في البحث',
    'إحصائيات مفصلة',
    'دعم فني متميز',
    'تحديثات مجانية'
  ]
}; 