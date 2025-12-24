import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FiSend, FiCheck, FiAlertCircle, FiLoader } from 'react-icons/fi';

const locations = [
  'New Cairo',
  'Madinaty',
  'Nasr City',
  'Heliopolis',
  'Zamalek',
  'Mohandessin',
  'Sheikh Zayed',
  '6th of October',
  'Other',
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    phone: '',
    location: '',
    message: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = 'Restaurant name is required';
    }
    
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'Your name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-+()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.location) {
      newErrors.location = 'Please select a location';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Add to Firebase Firestore
      await addDoc(collection(db, 'leads'), {
        ...formData,
        timestamp: serverTimestamp(),
        status: 'new',
      });
      
      setSubmitStatus('success');
      setFormData({
        restaurantName: '',
        ownerName: '',
        email: '',
        phone: '',
        location: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-[#f8f9fa] to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-40 left-20 w-64 h-64 bg-[#2ecc71]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-64 h-64 bg-[#3498db]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#2ecc71]/10 text-[#2ecc71] text-sm font-medium mb-4">
              Get Started
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2c3e50] mb-6">
              Transform Your <span className="text-[#2ecc71]">Restaurant</span> Today
            </h2>
            <p className="text-lg text-[#646464] mb-8">
              Don't let outdated systems hold your business back. Join the dining 
              revolution and see how Qoot can transform your customer experience.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {[
                'Free demo and consultation',
                'No commitment required',
                'Custom solution for your needs',
                'Local support in Arabic & English',
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[#2ecc71]/10 flex items-center justify-center">
                    <FiCheck className="w-4 h-4 text-[#2ecc71]" />
                  </div>
                  <span className="text-[#2c3e50]">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="p-6 rounded-2xl bg-[#2c3e50] text-white">
              <h3 className="font-semibold mb-4">Prefer to reach out directly?</h3>
              <div className="space-y-2">
                <p className="text-white/70">Email: <a href="mailto:ahmedallam344@gmail.com" className="text-[#2ecc71]">ahmedallam344@gmail.com</a></p>
                <p className="text-white/70">WhatsApp: <a href="https://wa.me/201099441915" className="text-[#2ecc71]">+20 109 944 1915</a></p>
              </div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-[#2c3e50] mb-6">Request a Demo</h3>
              
              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#2ecc71]/10 flex items-center justify-center">
                      <FiCheck className="w-10 h-10 text-[#2ecc71]" />
                    </div>
                    <h4 className="text-2xl font-bold text-[#2c3e50] mb-2">Thank You!</h4>
                    <p className="text-[#646464] mb-6">
                      We've received your request and will contact you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitStatus(null)}
                      className="text-[#2ecc71] font-medium hover:underline"
                    >
                      Submit another request
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Restaurant Name */}
                    <div>
                      <label className="block text-sm font-medium text-[#2c3e50] mb-2">
                        Restaurant Name *
                      </label>
                      <input
                        type="text"
                        name="restaurantName"
                        value={formData.restaurantName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.restaurantName ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-[#2ecc71]/20 focus:border-[#2ecc71] outline-none transition-all`}
                        placeholder="e.g., Cairo Grill House"
                      />
                      {errors.restaurantName && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <FiAlertCircle className="w-4 h-4" />
                          {errors.restaurantName}
                        </p>
                      )}
                    </div>

                    {/* Owner Name */}
                    <div>
                      <label className="block text-sm font-medium text-[#2c3e50] mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.ownerName ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-[#2ecc71]/20 focus:border-[#2ecc71] outline-none transition-all`}
                        placeholder="Your full name"
                      />
                      {errors.ownerName && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <FiAlertCircle className="w-4 h-4" />
                          {errors.ownerName}
                        </p>
                      )}
                    </div>

                    {/* Email & Phone Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#2c3e50] mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.email ? 'border-red-500' : 'border-gray-200'
                          } focus:ring-2 focus:ring-[#2ecc71]/20 focus:border-[#2ecc71] outline-none transition-all`}
                          placeholder="you@email.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <FiAlertCircle className="w-4 h-4" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2c3e50] mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.phone ? 'border-red-500' : 'border-gray-200'
                          } focus:ring-2 focus:ring-[#2ecc71]/20 focus:border-[#2ecc71] outline-none transition-all`}
                          placeholder="+20 1XX XXX XXXX"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <FiAlertCircle className="w-4 h-4" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-[#2c3e50] mb-2">
                        Location *
                      </label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.location ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-[#2ecc71]/20 focus:border-[#2ecc71] outline-none transition-all bg-white`}
                      >
                        <option value="">Select your location</option>
                        {locations.map((loc) => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                      {errors.location && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <FiAlertCircle className="w-4 h-4" />
                          {errors.location}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-[#2c3e50] mb-2">
                        Message (Optional)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2ecc71]/20 focus:border-[#2ecc71] outline-none transition-all resize-none"
                        placeholder="Tell us about your restaurant and what you're looking for..."
                      />
                    </div>

                    {/* Error Message */}
                    {submitStatus === 'error' && (
                      <div className="p-4 rounded-xl bg-red-50 text-red-600 flex items-center gap-3">
                        <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm">Something went wrong. Please try again or contact us directly.</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#2ecc71] text-white rounded-xl font-semibold text-lg shadow-lg shadow-[#2ecc71]/30 hover:bg-[#27ae60] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <FiLoader className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <FiSend className="w-5 h-5" />
                          Request Demo
                        </>
                      )}
                    </motion.button>

                    <p className="text-xs text-center text-[#646464]">
                      By submitting, you agree to be contacted by the Qoot team.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

