import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { getWishlistItems, saveWishlistItems, getCartItems, saveCartItems } from '../data/mock';
import { useToast } from '../hooks/use-toast';

const ProductCard = ({ product, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();

  const isInWishlist = getWishlistItems().some(item => item.id === product.id);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const wishlistItems = getWishlistItems();
    const existingIndex = wishlistItems.findIndex(item => item.id === product.id);

    if (existingIndex >= 0) {
      wishlistItems.splice(existingIndex, 1);
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      wishlistItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }

    saveWishlistItems(wishlistItems);
  };

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const cartItems = getCartItems();
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1
      });
    }

    saveCartItems(cartItems);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1
      }
    }
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl">
          {/* Image Container */}
          <div 
            className="relative h-64 overflow-hidden bg-gray-100"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setCurrentImageIndex(0);
            }}
          >
            {/* Main Product Image */}
            <motion.img
              key={currentImageIndex}
              src={product.images[currentImageIndex] || product.images[0]}
              alt={product.name}
              variants={imageVariants}
              initial="rest"
              animate={isHovered ? "hover" : "rest"}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover"
              onLoad={() => {
                // Auto-switch to second image on hover if available
                if (isHovered && product.images.length > 1 && currentImageIndex === 0) {
                  setTimeout(() => setCurrentImageIndex(1), 200);
                }
              }}
            />

            {/* Sale Badge */}
            {product.oldPrice && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
              >
                SALE
              </motion.div>
            )}

            {/* Action Buttons Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/10 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleWishlist}
                className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
                  isInWishlist 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/90 text-gray-700 hover:bg-white hover:text-red-500'
                }`}
              >
                <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={addToCart}
                className="p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-all duration-200"
              >
                <ShoppingCart className="h-5 w-5" />
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-3 bg-white/90 text-gray-700 rounded-full shadow-lg hover:bg-white transition-all duration-200"
              >
                <Eye className="h-5 w-5" />
              </motion.div>
            </motion.div>

            {/* Image Indicator Dots */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {product.images.map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{
                      scale: currentImageIndex === index ? 1 : 0.8,
                      opacity: currentImageIndex === index ? 1 : 0.5
                    }}
                    transition={{ duration: 0.2 }}
                    className={`w-2 h-2 rounded-full ${
                      currentImageIndex === index ? 'bg-white' : 'bg-white/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6">
            {product.collection && (
              <div className="mb-2">
                <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full max-w-full truncate">
                  {product.collection}
                </span>
              </div>
            )}
            <motion.h3
              className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors duration-200"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              {product.name}
            </motion.h3>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                  >
                    <Star 
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  </motion.div>
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviewCount})</span>
            </div>
            
            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="text-xl font-bold text-gray-900"
                >
                  Rs. {product.price.toLocaleString()}
                </motion.span>
                {product.oldPrice && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-gray-500 line-through"
                  >
                    Rs. {product.oldPrice.toLocaleString()}
                  </motion.span>
                )}
              </div>
              
              {/* Savings Badge */}
              {product.oldPrice && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium"
                >
                  Save {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </motion.span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;