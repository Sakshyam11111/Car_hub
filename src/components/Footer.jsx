import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiLinkedin, 
  FiMail, FiPhone, FiMapPin, FiSend, FiChevronRight, FiHeart
} from 'react-icons/fi';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Sitemap', href: '/sitemap' }
  ];

  const carServices = [
    { name: 'New Cars', href: '/new-cars' },
    { name: 'Used Cars', href: '/used-cars' },
    { name: 'Car Reviews', href: '/reviews' },
    { name: 'Compare Cars', href: '/compare' },
    { name: 'Car Loan', href: '/loan' },
    { name: 'Car Insurance', href: '/insurance' }
  ];

  const popularBrands = [
    { name: 'Tata', href: '/brand/tata' },
    { name: 'Maruti Suzuki', href: '/brand/maruti' },
    { name: 'Hyundai', href: '/brand/hyundai' },
    { name: 'Honda', href: '/brand/honda' },
    { name: 'Toyota', href: '/brand/toyota' },
    { name: 'Mahindra', href: '/brand/mahindra' }
  ];

  const socialLinks = [
    { icon: FiFacebook, href: '#', label: 'Facebook' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiInstagram, href: '#', label: 'Instagram' },
    { icon: FiYoutube, href: '#', label: 'YouTube' },
    { icon: FiLinkedin, href: '#', label: 'LinkedIn' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated with Latest Cars</h2>
            <p className="text-lg mb-8 opacity-90">
              Subscribe to our newsletter and never miss an update on new launches, reviews, and exclusive offers
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="px-6 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
                <FiSend size={18} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <h3 className="text-2xl font-bold">CarHub</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted partner for finding the perfect car. We provide comprehensive information, 
              expert reviews, and the best deals on new and used cars in Nepal.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <FiMapPin className="mr-3 text-orange-500" size={18} />
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center text-gray-400">
                <FiPhone className="mr-3 text-orange-500" size={18} />
                <span>+977 9812345678</span>
              </div>
              <div className="flex items-center text-gray-400">
                <FiMail className="mr-3 text-orange-500" size={18} />
                <span>info@carhub.com.np</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-orange-500 transition-colors flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <FiChevronRight className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Car Services */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Car Services</h4>
            <ul className="space-y-2">
              {carServices.map((service, index) => (
                <li key={index}>
                  <motion.a
                    href={service.href}
                    className="text-gray-400 hover:text-orange-500 transition-colors flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <FiChevronRight className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
                    {service.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Popular Brands */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Popular Brands</h4>
            <ul className="space-y-2">
              {popularBrands.map((brand, index) => (
                <li key={index}>
                  <motion.a
                    href={brand.href}
                    className="text-gray-400 hover:text-orange-500 transition-colors flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <FiChevronRight className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
                    {brand.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} CarHub. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center">
              Made with <FiHeart className="mx-1 text-red-500" size={14} /> in Nepal
            </p>
            <div className="flex gap-6">
              <a href="/privacy" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </footer>
  );
};

export default Footer;