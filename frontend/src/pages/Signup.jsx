import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
     name: '',
     email: '',
     phone: '',
     password: '',
     confirmPassword: ''
   });
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [isVerificationSent, setIsVerificationSent] = useState(false);
   const [verificationCode, setVerificationCode] = useState('');
   const { toast } = useToast();
   const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendVerification = async () => {
     if (!formData.email) {
       toast({
         title: "Email required",
         description: "Please enter your email address first.",
         variant: "destructive",
       });
       return;
     }

     // Email validation
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(formData.email)) {
       toast({
         title: "Invalid email",
         description: "Please enter a valid email address.",
         variant: "destructive",
       });
       return;
     }

     setIsLoading(true);

     // Mock sending verification code
     setTimeout(() => {
       setIsVerificationSent(true);
       toast({
         title: "Verification Code Sent!",
         description: "Please check your email for the verification code.",
       });
       setIsLoading(false);
     }, 1000);
   };

  const handleSubmit = async (e) => {
     e.preventDefault();
     setIsLoading(true);

     // Validation
     if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
       toast({
         title: "Please fill all required fields",
         description: "Name, email, and password are required.",
         variant: "destructive",
       });
       setIsLoading(false);
       return;
     }

     if (formData.password !== formData.confirmPassword) {
       toast({
         title: "Passwords don't match",
         description: "Please make sure your passwords match.",
         variant: "destructive",
       });
       setIsLoading(false);
       return;
     }

     if (formData.password.length < 6) {
       toast({
         title: "Password too short",
         description: "Password must be at least 6 characters long.",
         variant: "destructive",
       });
       setIsLoading(false);
       return;
     }

     if (!isVerificationSent) {
       toast({
         title: "Email verification required",
         description: "Please verify your email first.",
         variant: "destructive",
       });
       setIsLoading(false);
       return;
     }

     if (!verificationCode || verificationCode.length !== 6) {
       toast({
         title: "Invalid verification code",
         description: "Please enter a valid 6-digit verification code.",
         variant: "destructive",
       });
       setIsLoading(false);
       return;
     }

     // Mock verification check
     if (verificationCode !== '123456') {
       toast({
         title: "Invalid verification code",
         description: "The verification code is incorrect.",
         variant: "destructive",
       });
       setIsLoading(false);
       return;
     }

     // Mock registration
     setTimeout(() => {
       // Mock user data
       const mockUser = {
         id: Date.now(),
         name: formData.name,
         email: formData.email,
         phone: formData.phone,
         avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=f59e0b&color=fff`
       };

       localStorage.setItem('artstop_user', JSON.stringify(mockUser));

       toast({
         title: "Account Created Successfully!",
         description: "Welcome to ArtStop. You are now logged in.",
       });

       // Trigger auth update event
       window.dispatchEvent(new CustomEvent('authUpdated'));

       setIsLoading(false);
       navigate('/');
     }, 1000);
   };

  return (
    <div className="min-h-screen flex">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md text-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="font-medium">Back</span>
          </motion.button>
        </Link>
      </div>

      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm"
        >
          {/* Header */}
          <div className="text-center lg:text-left mb-6">
            <Link to="/">
                          <motion.img
                            whileHover={{ scale: 1.05 }}
                            src="/artstoplogo.png"
                            alt="ArtStop Logo"
                            className="h-16 w-auto object-contain"
                          />
                        </Link>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h2>
            <p className="text-gray-600 text-sm">Join ArtStop and discover amazing Islamic art</p>
          </div>

          {/* Signup Form */}
          <Card className="">
            <CardContent className="p-1">
              <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <div className="relative mt-1">
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="pl-10 focus:ring-amber-500 focus:border-amber-500"
                        required
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative mt-1">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="pl-10 focus:ring-amber-500 focus:border-amber-500"
                        required
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Email Verification */}
                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="verification">Email Verification</Label>
                      {!isVerificationSent ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleSendVerification}
                          disabled={isLoading}
                          className="text-amber-600 hover:text-amber-700"
                        >
                          Send Code
                        </Button>
                      ) : (
                        <span className="text-sm text-green-600">Code Sent ✓</span>
                      )}
                    </div>
                    <div className="relative mt-1">
                      <Input
                        id="verification"
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="Enter 6-digit code"
                        className="text-center tracking-widest focus:ring-amber-500 focus:border-amber-500"
                        maxLength={6}
                        disabled={!isVerificationSent}
                      />
                    </div>
                    {isVerificationSent && (
                      <p className="text-xs text-gray-500 mt-1">
                        Demo code: 123456
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <div className="relative mt-1">
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="pl-10 focus:ring-amber-500 focus:border-amber-500"
                      />
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a password"
                        className="pl-10 pr-10 focus:ring-amber-500 focus:border-amber-500"
                        required
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative mt-1">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        className="pl-10 pr-10 focus:ring-amber-500 focus:border-amber-500"
                        required
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="flex items-start">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded mt-1"
                    />
                    <Label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                      I agree to the{' '}
                      <Link to="/terms" className="text-amber-600 hover:text-amber-700">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-amber-600 hover:text-amber-700">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black text-white hover:bg-gray-800 py-3 text-lg font-medium rounded-full transition-all duration-300"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>
                </div>

                {/* Social Login */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full">
                    <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                    Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/448224/facebook.svg" alt="Facebook" />
                    Facebook
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Login Link */}
            <div className="text-center mt-4">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-amber-600 hover:text-amber-700 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Image Background */}
        <div className="hidden lg:flex flex-1 bg-cover bg-center relative" style={{ backgroundImage: 'url(/signupimg.PNG)' }}>
            <div className="absolute inset-0 bg-black/10"></div>
                  
                  {/* Centered text content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative z-10 flex flex-col items-center justify-center text-center text-white p-8 max-w-md mx-auto"
                  >
                    <h2 className="text-4xl font-bold mb-4">Start Your Art Journey</h2>
                    <p className="text-lg mb-6 font-medium">
                        Create your account today and unlock access to our exclusive collection of art. From traditional calligraphy to contemporary geometric designs.</p>
                  </motion.div>
                </div>
        </div>
      
  );
};

export default Signup;