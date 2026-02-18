export type AppLanguage = 'ar' | 'en';

export const defaultLanguage: AppLanguage = 'en';

export const fallbackDictionary: Record<AppLanguage, Record<string, string>> = {
  en: {
    'navigation.home': 'Home',
    'navigation.profile': 'Profile',
    'navigation.moduleHost': 'Module Host',
    'actions.switchLanguage': 'Switch Language',
    'actions.signOut': 'Sign out'
  },
  ar: {
    'navigation.home': 'الرئيسية',
    'navigation.profile': 'الملف الشخصي',
    'navigation.moduleHost': 'واجهة الوحدات',
    'actions.switchLanguage': 'تبديل اللغة',
    'actions.signOut': 'تسجيل خروج'
  }
};
