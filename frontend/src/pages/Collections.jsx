import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { categories, products } from '../data/mock';

const Collections = () => {
  const { category } = useParams();

  const categoryInfo = categories.find(cat => cat.slug === category);

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Category not found</h1>
          <Link to="/categories">
            <Button>Back to Categories</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate product counts for each collection and attach images
  const collectionsWithCounts = categoryInfo.collections.map(collection => ({
    name: collection,
    slug: collection.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    productCount: products.filter(product =>
      product.category === category && product.collection === collection
    ).length,
    image: (categoryInfo.collectionImages && categoryInfo.collectionImages[collection])
      ? categoryInfo.collectionImages[collection]
      : `https://picsum.photos/seed/${encodeURIComponent(collection)}/600/400`
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-indigo-50 p-3 rounded-2xl mb-6">
            <div className="bg-white p-2 rounded-xl">
              <svg className="w-10 h-10 text-indigo-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{categoryInfo.name} Collections</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our curated collections within {categoryInfo.name.toLowerCase()}
          </p>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/categories" className="hover:text-indigo-600 transition-colors">Categories</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{categoryInfo.name}</span>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {collectionsWithCounts.map((collection) => (
            <Link
              key={collection.slug}
              to={`/categories/${category}/collections/${collection.slug}`}
            >
              <Card className="bg-white border-0 shadow-md overflow-hidden group hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 rounded-xl">
                <CardContent className="p-0 relative">
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={collection.image}
                      alt={`${collection.name} preview`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                        {collection.productCount} items
                      </span>
                    </div>
                  
                  </div>
                  <div className="p-6 flex flex-col justify-between gap-1 relative bg-white">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {collection.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">View collection</span>
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
        {collectionsWithCounts.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto border border-gray-100">
              <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No collections found</h3>
              <p className="text-gray-600 mb-8">This category doesn't have any collections yet.</p>
              <Link to="/categories">
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  Browse Other Categories
                </Button>
              </Link>
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

export default Collections;