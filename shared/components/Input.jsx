import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Input({
  label,
  error,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  id,
  required = false,
  disabled = false,
  className = '',
  inputClassName = '',
  icon = null,
  iconPosition = 'left',
  hint = '',
  isRTL = false,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || name;
  
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className={`block text-sm font-medium text-[#2c3e50] mb-2 ${isRTL ? 'text-right' : ''}`}
        >
          {label}
          {required && <span className="text-[#e74c3c] ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`}>
            {icon}
          </div>
        )}
        
        <input
          type={inputType}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
            focus:outline-none focus:ring-0
            ${error 
              ? 'border-[#e74c3c] focus:border-[#e74c3c] bg-red-50' 
              : 'border-gray-200 focus:border-[#2ecc71] bg-white'
            }
            ${icon && iconPosition === 'left' ? (isRTL ? 'pr-12' : 'pl-12') : ''}
            ${icon && iconPosition === 'right' ? (isRTL ? 'pl-12' : 'pr-12') : ''}
            ${isPassword ? (isRTL ? 'pl-12' : 'pr-12') : ''}
            ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}
            ${isRTL ? 'text-right' : ''}
            placeholder:text-gray-400
            ${inputClassName}
          `}
          dir={isRTL ? 'rtl' : 'ltr'}
          {...props}
        />
        
        {icon && iconPosition === 'right' && !isPassword && (
          <div className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-gray-400`}>
            {icon}
          </div>
        )}
        
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors`}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        )}
      </div>
      
      {error && (
        <p className={`mt-2 text-sm text-[#e74c3c] ${isRTL ? 'text-right' : ''}`}>
          {error}
        </p>
      )}
      
      {hint && !error && (
        <p className={`mt-2 text-sm text-gray-500 ${isRTL ? 'text-right' : ''}`}>
          {hint}
        </p>
      )}
    </div>
  );
}

// Textarea variant
export function Textarea({
  label,
  error,
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  id,
  required = false,
  disabled = false,
  className = '',
  rows = 4,
  isRTL = false,
  ...props
}) {
  const inputId = id || name;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className={`block text-sm font-medium text-[#2c3e50] mb-2 ${isRTL ? 'text-right' : ''}`}
        >
          {label}
          {required && <span className="text-[#e74c3c] ml-1">*</span>}
        </label>
      )}
      
      <textarea
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        className={`
          w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
          focus:outline-none focus:ring-0 resize-none
          ${error 
            ? 'border-[#e74c3c] focus:border-[#e74c3c] bg-red-50' 
            : 'border-gray-200 focus:border-[#2ecc71] bg-white'
          }
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}
          ${isRTL ? 'text-right' : ''}
          placeholder:text-gray-400
        `}
        dir={isRTL ? 'rtl' : 'ltr'}
        {...props}
      />
      
      {error && (
        <p className={`mt-2 text-sm text-[#e74c3c] ${isRTL ? 'text-right' : ''}`}>
          {error}
        </p>
      )}
    </div>
  );
}

// Select variant
export function Select({
  label,
  error,
  options = [],
  value,
  onChange,
  name,
  id,
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  className = '',
  isRTL = false,
  ...props
}) {
  const inputId = id || name;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className={`block text-sm font-medium text-[#2c3e50] mb-2 ${isRTL ? 'text-right' : ''}`}
        >
          {label}
          {required && <span className="text-[#e74c3c] ml-1">*</span>}
        </label>
      )}
      
      <select
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`
          w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
          focus:outline-none focus:ring-0 appearance-none cursor-pointer
          bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')]
          bg-[length:10px_10px] bg-no-repeat
          ${isRTL ? 'bg-[position:left_1rem_center]' : 'bg-[position:right_1rem_center]'}
          ${error 
            ? 'border-[#e74c3c] focus:border-[#e74c3c] bg-red-50' 
            : 'border-gray-200 focus:border-[#2ecc71] bg-white'
          }
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}
          ${isRTL ? 'text-right pr-4 pl-10' : 'pr-10'}
        `}
        dir={isRTL ? 'rtl' : 'ltr'}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className={`mt-2 text-sm text-[#e74c3c] ${isRTL ? 'text-right' : ''}`}>
          {error}
        </p>
      )}
    </div>
  );
}

