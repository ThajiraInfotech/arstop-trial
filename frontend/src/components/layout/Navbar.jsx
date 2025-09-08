import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Menu, X, User, Package, Heart, LogOut, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import SearchSuggestions from '../SearchSuggestions';
import { getCartItems, getWishlistItems } from '../../data/mock';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock auth state
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    // Initial count
    setCartCount(getCartItems().length);
    setWishlistItems(getWishlistItems());

    // Check if user is logged in (from localStorage)
    const user = localStorage.getItem('artstop_user');
    setIsLoggedIn(!!user);

    // Listen for cart updates
    const handleCartUpdate = () => {
      setCartCount(getCartItems().length);
    };

    const handleWishlistUpdate = () => {
      setWishlistItems(getWishlistItems());
    };

    const handleAuthUpdate = () => {
      const user = localStorage.getItem('artstop_user');
      setIsLoggedIn(!!user);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    window.addEventListener('authUpdated', handleAuthUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
      window.removeEventListener('authUpdated', handleAuthUpdate);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    navigate(`/products?search=${encodeURIComponent(suggestion)}`);
    setIsSearchFocused(false);
  };

  const handleUserAction = (action) => {
    setIsUserMenuOpen(false);
    if (!isLoggedIn && (action === '/profile' || action === '/orders' || action === '/settings')) {
      navigate('/login');
    } else if (action === '/logout') {
      localStorage.removeItem('artstop_user');
      setIsLoggedIn(false);
      window.dispatchEvent(new CustomEvent('authUpdated'));
      navigate('/');
    } else {
      navigate(action);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'Products', path: '/products' },
    { name: 'Customize', path: '/customize' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const userMenuItems = [
    { name: 'My Profile', icon: User, path: '/profile' },
    { name: 'My Orders', icon: Package, path: '/orders' },
    { name: 'Settings', icon: Settings, path: '/settings' },
    { name: 'Logout', icon: LogOut, path: '/logout' }
  ];

  const authMenuItems = [
    { name: 'Login', icon: User, path: '/login' },
    { name: 'Sign Up', icon: User, path: '/signup' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="text-2xl font-bold text-gray-900"
            >
              Art<span className="text-amber-600">Stop</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className="text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium relative group"
                >
                  {link.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300"
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="w-full relative">
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-colors duration-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
            
            <AnimatePresence>
              {isSearchFocused && (
                <SearchSuggestions
                  query={searchQuery}
                  onSuggestionClick={handleSuggestionClick}
                  onClose={() => setIsSearchFocused(false)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist Button */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsWishlistOpen(!isWishlistOpen)}
                className="relative p-2 text-gray-700 hover:text-amber-600 transition-colors duration-200"
              >
                <Heart className="h-5 w-5" />
                <AnimatePresence>
                  {wishlistItems.length > 0 && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                    >
                      {wishlistItems.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <AnimatePresence>
                {isWishlistOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-hidden"
                  >
                    <div className="p-4 border-b">
                      <h3 className="font-semibold text-gray-900">My Wishlist</h3>
                      <p className="text-sm text-gray-500">{wishlistItems.length} items</p>
                    </div>
                    
                    {wishlistItems.length === 0 ? (
                      <div className="p-6 text-center">
                        <Heart className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">No items in wishlist</p>
                      </div>
                    ) : (
                      <div className="max-h-64 overflow-y-auto">
                        {wishlistItems.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            className="p-3 hover:bg-gray-50 border-b last:border-b-0"
                          >
                            <Link
                              to={`/product/${item.id}`}
                              onClick={() => setIsWishlistOpen(false)}
                              className="flex items-center space-x-3"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {item.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Rs. {item.price.toLocaleString()}
                                </p>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    
                    <div className="p-3 border-t bg-gray-50">
                      <Link to="/wishlist" onClick={() => setIsWishlistOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full">
                          View All Wishlist
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="relative p-2 text-gray-700 hover:text-amber-600 transition-colors duration-200"
              >
                <User className="h-5 w-5" />
              </motion.button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50"
                  >
                    {(isLoggedIn ? userMenuItems : authMenuItems).map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <button
                          onClick={() => handleUserAction(item.path)}
                          className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 w-full text-left"
                        >
                          <item.icon className="h-4 w-4" />
                          <span className="text-sm font-medium">{item.name}</span>
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart Button */}
            <Link to="/cart">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-700 hover:text-amber-600 transition-colors duration-200"
              >
                <ShoppingCart className="h-5 w-5" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 text-gray-700 hover:text-amber-600 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t bg-white overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </form>

                {/* Mobile Navigation Links */}
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className="block px-3 py-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;