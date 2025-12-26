// Form validation utilities

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validate Egyptian phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Whether phone is valid
 */
export const isValidEgyptianPhone = (phone) => {
  // Remove spaces and dashes
  const cleaned = phone.replace(/[\s-]/g, '');
  // Egyptian phone: starts with +20, 01, or 20
  const regex = /^(\+20|20|0)?1[0125][0-9]{8}$/;
  return regex.test(cleaned);
};

/**
 * Format Egyptian phone number
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatEgyptianPhone = (phone) => {
  const cleaned = phone.replace(/[\s-]/g, '');
  // If starts with +20, format as +20 1XX XXX XXXX
  if (cleaned.startsWith('+20')) {
    const digits = cleaned.slice(3);
    return `+20 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }
  // If starts with 01, format as 01XX XXX XXXX
  if (cleaned.startsWith('01')) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with score and feedback
 */
export const validatePassword = (password) => {
  const result = {
    isValid: false,
    score: 0,
    feedback: []
  };

  if (password.length < 8) {
    result.feedback.push('Password must be at least 8 characters');
  } else {
    result.score += 1;
  }

  if (!/[a-z]/.test(password)) {
    result.feedback.push('Include at least one lowercase letter');
  } else {
    result.score += 1;
  }

  if (!/[A-Z]/.test(password)) {
    result.feedback.push('Include at least one uppercase letter');
  } else {
    result.score += 1;
  }

  if (!/[0-9]/.test(password)) {
    result.feedback.push('Include at least one number');
  } else {
    result.score += 1;
  }

  result.isValid = result.score >= 3 && password.length >= 8;
  return result;
};

/**
 * Validate required field
 * @param {any} value - Value to check
 * @returns {boolean} Whether field has a value
 */
export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

/**
 * Validate minimum length
 * @param {string} value - Value to check
 * @param {number} min - Minimum length
 * @returns {boolean} Whether value meets minimum length
 */
export const minLength = (value, min) => {
  return value && value.length >= min;
};

/**
 * Validate maximum length
 * @param {string} value - Value to check
 * @param {number} max - Maximum length
 * @returns {boolean} Whether value is within maximum length
 */
export const maxLength = (value, max) => {
  return !value || value.length <= max;
};

/**
 * Validate number is positive
 * @param {number} value - Value to check
 * @returns {boolean} Whether value is positive
 */
export const isPositive = (value) => {
  return typeof value === 'number' && value > 0;
};

/**
 * Validate number is within range
 * @param {number} value - Value to check
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} Whether value is within range
 */
export const isInRange = (value, min, max) => {
  return typeof value === 'number' && value >= min && value <= max;
};

/**
 * Validate price (positive number with max 2 decimal places)
 * @param {number|string} price - Price to validate
 * @returns {boolean} Whether price is valid
 */
export const isValidPrice = (price) => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return !isNaN(num) && num >= 0 && Number.isFinite(num);
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} Whether URL is valid
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Create form validator
 * @param {object} rules - Validation rules object
 * @returns {function} Validator function
 */
export const createValidator = (rules) => {
  return (data) => {
    const errors = {};
    
    Object.entries(rules).forEach(([field, fieldRules]) => {
      const value = data[field];
      
      for (const rule of fieldRules) {
        const error = rule(value, data);
        if (error) {
          errors[field] = error;
          break;
        }
      }
    });
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
};

// Pre-built validation rules
export const validationRules = {
  required: (fieldName) => (value) => 
    !isRequired(value) ? `${fieldName} is required` : null,
  
  email: () => (value) => 
    value && !isValidEmail(value) ? 'Invalid email address' : null,
  
  phone: () => (value) => 
    value && !isValidEgyptianPhone(value) ? 'Invalid phone number' : null,
  
  minLength: (min, fieldName) => (value) => 
    value && value.length < min ? `${fieldName} must be at least ${min} characters` : null,
  
  maxLength: (max, fieldName) => (value) => 
    value && value.length > max ? `${fieldName} must be less than ${max} characters` : null,
  
  price: () => (value) => 
    !isValidPrice(value) ? 'Invalid price' : null,
  
  positive: (fieldName) => (value) => 
    !isPositive(value) ? `${fieldName} must be a positive number` : null
};

