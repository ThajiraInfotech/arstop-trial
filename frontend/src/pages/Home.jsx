import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Play } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { categories, products, instagramReels, testimonials } from '../data/mock';

const Home = () => {
  const featuredProducts = products.filter(product => product.featured).slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-100 to-gray-200 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
            {/* Main Hero Card */}
            <div className="lg:col-span-2">
              <Card className="h-full bg-gradient-to-br from-amber-50 to-orange-100 border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0 h-full relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1558114965-eeb97aa84c3b?crop=entropy&cs=srgb&fm=jpg&w=800&h=600&fit=crop"
                    alt="Islamic Art Collection"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 lg:p-12">
                    <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                      Color of
                      <br />
                      Islamic
                      <br />
                      Heritage
                    </h1>
                    <p className="text-lg text-white/90 mb-8 max-w-md">
                      100+ Collections for your spiritual and artistic inspiration in this modern world
                    </p>
                    <Link to="/categories">
                      <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-full text-lg font-medium transition-all duration-300">
                        VIEW COLLECTIONS
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Side Cards */}
            <div className="space-y-4">
              <Card className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0 h-full relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?crop=entropy&cs=srgb&fm=jpg&w=400&h=300&fit=crop"
                    alt="Modern Living"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 z-20 flex flex-col justify-center p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Modern
                      <br />
                      Living
                    </h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-64 bg-gradient-to-br from-rose-50 to-pink-100 border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0 h-full relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10"></div>
                  <img 
                    src="https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg?w=400&h=300&fit=crop"
                    alt="Traditional Crafts"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 z-20 flex flex-col justify-center p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Traditional
                      <br />
                      Crafts
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Browse by Categories
            </h2>
            <div className="flex justify-center space-x-8">
              <span className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium">ALL</span>
              <span className="text-gray-500 px-6 py-2 text-sm font-medium cursor-pointer hover:text-black transition-colors">ISLAMIC ART</span>
              <span className="text-gray-500 px-6 py-2 text-sm font-medium cursor-pointer hover:text-black transition-colors">HOME DECOR</span>
              <span className="text-gray-500 px-6 py-2 text-sm font-medium cursor-pointer hover:text-black transition-colors">GIFTS</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/categories/${category.slug}`}>
                <Card className="h-80 bg-white border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0 h-full relative">
                    <img 
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                      <p className="text-sm text-white/80">{category.productCount} products</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Featured Products</h2>
            <Link to="/products">
              <Button variant="outline" className="flex items-center space-x-2">
                <span>View All</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card className="bg-white border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {product.oldPrice && (
                        <span className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                          SALE
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">({product.reviewCount})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-900">
                          Rs. {product.price.toLocaleString()}
                        </span>
                        {product.oldPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            Rs. {product.oldPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Reels Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Instagram Reels
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See our latest creations and customer showcases on Instagram
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {instagramReels.map((reel) => (
              <Card key={reel.id} className="bg-white border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-0 relative">
                  <div className="aspect-[9/16] relative overflow-hidden">
                    <img 
                      src={reel.thumbnail}
                      alt={reel.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="font-semibold text-sm mb-2 line-clamp-2">{reel.title}</h4>
                      <div className="flex items-center space-x-4 text-xs">
                        <span>{reel.likes} likes</span>
                        <span>{reel.comments} comments</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have transformed their spaces with our art
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;