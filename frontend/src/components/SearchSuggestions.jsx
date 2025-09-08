import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp } from 'lucide-react';
import { products } from '../data/mock';

const SearchSuggestions = ({ query, onSuggestionClick, onClose }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const popularSearches = [
    'Islamic Wall Art',
    'Home Decor',
    'Calligraphy',
    'Lanterns',
    'Canvas Prints'
  ];

  if (query.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-xl border mt-2 z-50 p-4"
      >
        <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
          <TrendingUp className="h-4 w-4 mr-2" />
          Popular Searches
        </h4>
        <div className="space-y-2">
          {popularSearches.map((search, index) => (
            <motion.button
              key={search}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSuggestionClick(search)}
              className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              {search}
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  }

  if (suggestions.length === 0 && query.length > 1) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-xl border mt-2 z-50 p-4"
      >
        <div className="text-center py-4">
          <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No products found for "{query}"</p>
          <p className="text-xs text-gray-400 mt-1">Try searching for "Islamic Art" or "Home Decor"</p>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      {suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-xl border mt-2 z-50 max-h-96 overflow-y-auto"
        >
          <div className="p-2">
            {suggestions.map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                onClick={() => onClose()}
              >
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Rs. {product.price.toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchSuggestions;