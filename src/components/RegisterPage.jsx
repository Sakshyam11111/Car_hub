// src/components/RegisterPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiArrowLeft, FiPhone } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        
        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // Redirect to login page after successful registration
            navigate('/login');
        }, 1500);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.4,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.3 }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
            <motion.div
                className="w-full max-w-md"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Back to Home Button */}
                <motion.div variants={itemVariants} className="mb-6">
                    <Link 
                        to="/" 
                        className="inline-flex items-center text-gray-600 hover:text-orange-600 transition-colors"
                    >
                        <FiArrowLeft className="mr-2" />
                        Back to Home
                    </Link>
                </motion.div>

                {/* Register Card */}
                <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 p-6 text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">C</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white">Create Account</h2>
                        <p className="text-orange-100 mt-2">Join CarHub to explore cars</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        {/* Name Input */}
                        <motion.div variants={itemVariants} className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUser className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </motion.div>

                        {/* Email Input */}
                        <motion.div variants={itemVariants} className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMail className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </motion.div>

                        {/* Phone Input */}
                        <motion.div variants={itemVariants} className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiPhone className="text-gray-400" />
                            </div>
                            <input
                                type="tel"
                                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </motion.div>

                        {/* Password Input */}
                        <motion.div variants={itemVariants} className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLock className="text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400" />}
                            </button>
                        </motion.div>

                        {/* Confirm Password Input */}
                        <motion.div variants={itemVariants} className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLock className="text-gray-400" />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400" />}
                            </button>
                        </motion.div>

                        {/* Terms and Conditions */}
                        <motion.div variants={itemVariants} className="flex items-start">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 mt-1"
                                checked={agreeToTerms}
                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                                required
                            />
                            <span className="ml-2 text-sm text-gray-600">
                                I agree to the <a href="#" className="text-orange-600 hover:text-orange-700">Terms and Conditions</a> and <a href="#" className="text-orange-600 hover:text-orange-700">Privacy Policy</a>
                            </span>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            variants={itemVariants}
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </span>
                            ) : (
                                "Create Account"
                            )}
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <div className="px-6 pb-4">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="px-6 pb-6 grid grid-cols-3 gap-3">
                        <motion.button
                            variants={itemVariants}
                            className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaGoogle className="text-red-500" />
                        </motion.button>
                        <motion.button
                            variants={itemVariants}
                            className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaFacebook className="text-blue-600" />
                        </motion.button>
                        <motion.button
                            variants={itemVariants}
                            className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaTwitter className="text-blue-400" />
                        </motion.button>
                    </div>

                    {/* Sign In Link */}
                    <div className="px-6 pb-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="font-medium text-orange-600 hover:text-orange-700">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default RegisterPage;