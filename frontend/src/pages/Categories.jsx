import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { categories } from '../data/mock';

const Categories = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'all');

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'islamic-art', label: 'Islamic Art' },
    { value: 'home-decor', label: 'Home Decor' },
    { value: 'gifts', label: 'Gifts' },
    { value: 'cutouts-signage', label: 'Cutouts & Signage' }
  ];

  const filteredCategories = activeCategory === 'all' 
    ? categories 
    : categories.filter(cat => cat.slug === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Categories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated collections of Islamic art, home decor, and custom creations
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={activeCategory === option.value ? "default" : "outline"}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === option.value 
                  ? 'bg-black text-white hover:bg-gray-800' 
                  : 'border-2 hover:border-black hover:text-black'
              }`}
              onClick={() => setActiveCategory(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCategories.map((category) => (
            <Link key={category.id} to={`/categories/${category.slug}`}>
              <Card className="h-96 bg-white border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-0 h-full relative">
                  <div className="h-3/4 overflow-hidden">
                    <img 
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>
                  <div className="p-6 h-1/4 flex flex-col justify-center relative">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{category.productCount} products</span>
                      <span className="text-amber-600 font-medium group-hover:text-amber-700 transition-colors">
                        Explore →
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No categories found</h3>
            <p className="text-gray-600 mb-8">Try adjusting your filters or browse all categories</p>
            <Button onClick={() => setActiveCategory('all')}>
              Browse All Categories
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Let us create something unique just for you. Our custom design service brings your vision to life.
            </p>
            <Link to="/customize">
              <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-full text-lg font-medium">
                Request Custom Design
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;