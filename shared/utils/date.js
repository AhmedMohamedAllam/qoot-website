import { format, formatDistance, formatRelative, isToday, isYesterday, startOfDay, endOfDay, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

/**
 * Get locale based on language
 * @param {boolean} isArabic - Whether to use Arabic locale
 * @returns {object} date-fns locale
 */
const getLocale = (isArabic) => isArabic ? ar : enUS;

/**
 * Format date with language support
 * @param {Date|number} date - The date to format
 * @param {string} formatStr - Format string
 * @param {boolean} isArabic - Whether to use Arabic
 * @returns {string} Formatted date
 */
export const formatDate = (date, formatStr = 'PPP', isArabic = false) => {
  if (!date) return '';
  const dateObj = date instanceof Date ? date : new Date(date);
  return format(dateObj, formatStr, { locale: getLocale(isArabic) });
};

/**
 * Format time
 * @param {Date|number} date - The date to format
 * @param {boolean} isArabic - Whether to use Arabic
 * @returns {string} Formatted time
 */
export const formatTime = (date, isArabic = false) => {
  if (!date) return '';
  const dateObj = date instanceof Date ? date : new Date(date);
  return format(dateObj, 'p', { locale: getLocale(isArabic) });
};

/**
 * Format date and time
 * @param {Date|number} date - The date to format
 * @param {boolean} isArabic - Whether to use Arabic
 * @returns {string} Formatted date and time
 */
export const formatDateTime = (date, isArabic = false) => {
  if (!date) return '';
  const dateObj = date instanceof Date ? date : new Date(date);
  return format(dateObj, 'PPp', { locale: getLocale(isArabic) });
};

/**
 * Get relative time string
 * @param {Date|number} date - The date
 * @param {boolean} isArabic - Whether to use Arabic
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date, isArabic = false) => {
  if (!date) return '';
  const dateObj = date instanceof Date ? date : new Date(date);
  return formatDistance(dateObj, new Date(), { 
    addSuffix: true, 
    locale: getLocale(isArabic) 
  });
};

/**
 * Get smart date label (Today, Yesterday, or date)
 * @param {Date|number} date - The date
 * @param {boolean} isArabic - Whether to use Arabic
 * @returns {string} Smart date label
 */
export const getSmartDateLabel = (date, isArabic = false) => {
  if (!date) return '';
  const dateObj = date instanceof Date ? date : new Date(date);
  
  if (isToday(dateObj)) {
    return isArabic ? 'اليوم' : 'Today';
  }
  if (isYesterday(dateObj)) {
    return isArabic ? 'أمس' : 'Yesterday';
  }
  return formatDate(dateObj, 'EEE, MMM d', isArabic);
};

/**
 * Format order timestamp for display
 * @param {Date|number|object} timestamp - The timestamp (can be Firestore Timestamp)
 * @param {boolean} isArabic - Whether to use Arabic
 * @returns {string} Formatted timestamp
 */
export const formatOrderTime = (timestamp, isArabic = false) => {
  if (!timestamp) return '';
  
  // Handle Firestore Timestamp
  const dateObj = timestamp.toDate ? timestamp.toDate() : 
                  timestamp instanceof Date ? timestamp : 
                  new Date(timestamp);
  
  if (isToday(dateObj)) {
    return formatTime(dateObj, isArabic);
  }
  return formatDateTime(dateObj, isArabic);
};

/**
 * Get date ranges for analytics
 * @returns {object} Date range presets
 */
export const getDateRanges = () => {
  const now = new Date();
  
  return {
    today: {
      start: startOfDay(now),
      end: endOfDay(now),
      label: 'Today',
      labelAr: 'اليوم'
    },
    yesterday: {
      start: startOfDay(subDays(now, 1)),
      end: endOfDay(subDays(now, 1)),
      label: 'Yesterday',
      labelAr: 'أمس'
    },
    last7Days: {
      start: startOfDay(subDays(now, 6)),
      end: endOfDay(now),
      label: 'Last 7 Days',
      labelAr: 'آخر 7 أيام'
    },
    last30Days: {
      start: startOfDay(subDays(now, 29)),
      end: endOfDay(now),
      label: 'Last 30 Days',
      labelAr: 'آخر 30 يوم'
    },
    thisWeek: {
      start: startOfWeek(now),
      end: endOfWeek(now),
      label: 'This Week',
      labelAr: 'هذا الأسبوع'
    },
    thisMonth: {
      start: startOfMonth(now),
      end: endOfMonth(now),
      label: 'This Month',
      labelAr: 'هذا الشهر'
    }
  };
};

/**
 * Get hour label for charts
 * @param {number} hour - Hour (0-23)
 * @param {boolean} isArabic - Whether to use Arabic
 * @returns {string} Hour label
 */
export const getHourLabel = (hour, isArabic = false) => {
  const suffix = hour >= 12 ? (isArabic ? 'م' : 'PM') : (isArabic ? 'ص' : 'AM');
  const displayHour = hour % 12 || 12;
  return `${displayHour}${suffix}`;
};

/**
 * Get day of week label
 * @param {number} dayIndex - Day index (0-6, 0 = Sunday)
 * @param {boolean} isArabic - Whether to use Arabic
 * @returns {string} Day label
 */
export const getDayLabel = (dayIndex, isArabic = false) => {
  const days = isArabic 
    ? ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[dayIndex];
};

