// Currency formatting utilities for Egyptian Pound (EGP)

/**
 * Format a number as Egyptian Pounds
 * @param {number} amount - The amount to format
 * @param {object} options - Formatting options
 * @returns {string} Formatted currency string
 */
export const formatEGP = (amount, options = {}) => {
  const {
    showSymbol = true,
    showDecimals = true,
    locale = 'en-EG'
  } = options;

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0
  }).format(amount);

  return showSymbol ? `${formatted} EGP` : formatted;
};

/**
 * Format currency with Arabic support
 * @param {number} amount - The amount to format
 * @param {boolean} isArabic - Whether to use Arabic formatting
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, isArabic = false) => {
  if (isArabic) {
    return `${amount.toLocaleString('ar-EG')} ج.م`;
  }
  return `${amount.toLocaleString('en-EG')} EGP`;
};

/**
 * Format currency short form (for display in cards/badges)
 * @param {number} amount - The amount to format
 * @returns {string} Short formatted currency
 */
export const formatCurrencyShort = (amount) => {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M EGP`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K EGP`;
  }
  return `${amount.toFixed(0)} EGP`;
};

/**
 * Parse currency string to number
 * @param {string} value - The currency string to parse
 * @returns {number} Parsed number
 */
export const parseCurrency = (value) => {
  if (typeof value === 'number') return value;
  return parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
};

/**
 * Calculate tax amount
 * @param {number} subtotal - The subtotal amount
 * @param {number} taxRate - The tax rate (default 14% for Egypt)
 * @returns {number} Tax amount
 */
export const calculateTax = (subtotal, taxRate = 0.14) => {
  return subtotal * taxRate;
};

/**
 * Calculate total with tax
 * @param {number} subtotal - The subtotal amount
 * @param {number} taxRate - The tax rate
 * @returns {object} Object with subtotal, tax, and total
 */
export const calculateTotal = (subtotal, taxRate = 0.14) => {
  const tax = calculateTax(subtotal, taxRate);
  return {
    subtotal,
    tax,
    total: subtotal + tax
  };
};

/**
 * Format percentage change
 * @param {number} current - Current value
 * @param {number} previous - Previous value
 * @returns {string} Formatted percentage with sign
 */
export const formatPercentageChange = (current, previous) => {
  if (previous === 0) return current > 0 ? '+100%' : '0%';
  const change = ((current - previous) / previous) * 100;
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}%`;
};

