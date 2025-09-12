import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { categories, products } from '../data/mock';

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

  // Calculate actual product counts for each category
  const categoriesWithCounts = filteredCategories.map(category => ({
    ...category,
    actualProductCount: products.filter(product => product.category === category.slug).length
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-indigo-50 p-3 rounded-2xl mb-6">
            <div className="bg-white p-2 rounded-xl">
              <svg className="w-10 h-10 text-indigo-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Our Collections</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our curated collections of Islamic art, home decor, and custom creations
          </p>
        </div>
 

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categoriesWithCounts.map((category) => (
            <Link key={category.id} to={`/categories/${category.slug}/collections`}>
              <Card className="h-96 bg-white border-0 shadow-md overflow-hidden group hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 rounded-xl">
                <CardContent className="p-0 h-full relative">
                  <div className="h-3/4 overflow-hidden relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                        {category.actualProductCount} items
                      </span>
                    </div>
                  </div>
                  <div className="p-6 h-1/4 flex flex-col justify-center relative bg-white">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {category.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Explore collection</span>
                      <span className="text-indigo-600 font-medium group-hover:text-indigo-800 transition-colors transform group-hover:translate-x-1 duration-300">
                        →
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {categoriesWithCounts.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto border border-gray-100">
              <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No categories found</h3>
              <p className="text-gray-600 mb-8">Try adjusting your filters or browse all categories</p>
              <Button 
                onClick={() => setActiveCategory('all')}
                className="bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 px-6 py-3 rounded-full shadow-sm"
              >
                Browse All Categories
              </Button>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-2xl p-8 lg:p-12 relative overflow-hidden border border-indigo-100">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-100 rounded-full -translate-x-12 translate-y-12 opacity-50"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full p-3 mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Let us create something unique just for you. Our custom design service brings your vision to life.
              </p>
              <Link to="/customize">
                <Button className="bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 px-8 py-3 rounded-full text-base font-medium shadow-sm hover:shadow-md transition-all">
                  Request Custom Design
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;