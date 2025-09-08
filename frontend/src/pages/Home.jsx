import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Play, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import ProductCard from '../components/ProductCard';
import { categories, products, instagramReels, testimonials } from '../data/mock';

const Home = () => {
  const featuredProducts = products.filter(product => product.featured).slice(0, 6);
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative bg-gradient-to-br from-gray-100 to-gray-200 py-16 lg:py-24 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: [
              `${mousePosition.x * 0.02}px ${mousePosition.y * 0.02}px`,
              `${mousePosition.x * 0.02 + 10}px ${mousePosition.y * 0.02 + 10}px`
            ]
          }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            backgroundSize: "60px 60px"
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full"
          >
            {/* Main Hero Card - spans 7 columns */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-7"
            >
              <Card className="h-full bg-gradient-to-br from-amber-50 to-orange-100 border-0 shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-500">
                <CardContent className="p-0 h-full relative min-h-[500px]">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10"
                    whileHover={{ background: "linear-gradient(to right, rgba(0,0,0,0.5), transparent)" }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.img 
                    src="https://images.unsplash.com/photo-1558114965-eeb97aa84c3b?crop=entropy&cs=srgb&fm=jpg&w=800&h=600&fit=crop"
                    alt="Islamic Art Collection"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  <motion.div 
                    className="absolute inset-0 z-20 flex flex-col justify-center p-8 lg:p-12"
                    variants={itemVariants}
                  >
                    <motion.h1 
                      className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      Color of
                      <br />
                      <motion.span
                        className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        Islamic
                      </motion.span>
                      <br />
                      Heritage
                    </motion.h1>
                    <motion.p 
                      className="text-lg text-white/90 mb-8 max-w-md"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                    >
                      100+ Collections for your spiritual and artistic inspiration in this modern world
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                    >
                      <Link to="/categories">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow-xl hover:shadow-2xl">
                            VIEW COLLECTIONS
                            <motion.div
                              className="ml-2"
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ArrowRight className="h-5 w-5" />
                            </motion.div>
                          </Button>
                        </motion.div>
                      </Link>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Side Cards - spans 5 columns, arranged in 2x2 grid */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* Top Left Card */}
              <motion.div animate={floatingAnimation}>
                <Card className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500">
                  <CardContent className="p-0 h-full relative">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10"
                      whileHover={{ background: "linear-gradient(to right, rgba(0,0,0,0.4), transparent)" }}
                    />
                    <motion.img 
                      src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?crop=entropy&cs=srgb&fm=jpg&w=400&h=300&fit=crop"
                      alt="Modern Living"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div 
                      className="absolute inset-0 z-20 flex flex-col justify-center p-4"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.h3 
                        className="text-lg font-bold text-white mb-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        Modern
                        <br />
                        Living
                      </motion.h3>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Top Right Card */}
              <motion.div 
                animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 0.5 } }}
              >
                <Card className="h-48 bg-gradient-to-br from-rose-50 to-pink-100 border-0 shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500">
                  <CardContent className="p-0 h-full relative">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10"
                      whileHover={{ background: "linear-gradient(to right, rgba(0,0,0,0.4), transparent)" }}
                    />
                    <motion.img 
                      src="https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg?w=400&h=300&fit=crop"
                      alt="Traditional Crafts"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div 
                      className="absolute inset-0 z-20 flex flex-col justify-center p-4"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.h3 
                        className="text-lg font-bold text-white mb-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        Traditional
                        <br />
                        Crafts
                      </motion.h3>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Bottom Left Card */}
              <motion.div 
                animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
              >
                <Card className="h-48 bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500">
                  <CardContent className="p-0 h-full relative">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10"
                      whileHover={{ background: "linear-gradient(to right, rgba(0,0,0,0.4), transparent)" }}
                    />
                    <motion.img 
                      src="https://images.unsplash.com/photo-1615874694520-474822394e73?crop=entropy&cs=srgb&fm=jpg&w=400&h=300&fit=crop"
                      alt="Elegant Decor"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div 
                      className="absolute inset-0 z-20 flex flex-col justify-center p-4"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.h3 
                        className="text-lg font-bold text-white mb-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        Elegant
                        <br />
                        Decor
                      </motion.h3>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Bottom Right Card */}
              <motion.div 
                animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1.5 } }}
              >
                <Card className="h-48 bg-gradient-to-br from-purple-50 to-violet-100 border-0 shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500">
                  <CardContent className="p-0 h-full relative">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10"
                      whileHover={{ background: "linear-gradient(to right, rgba(0,0,0,0.4), transparent)" }}
                    />
                    <motion.img 
                      src="https://images.pexels.com/photos/1099816/pexels-photo-1099816.jpeg?w=400&h=300&fit=crop"
                      alt="Custom Art"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div 
                      className="absolute inset-0 z-20 flex flex-col justify-center p-4"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.h3 
                        className="text-lg font-bold text-white mb-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        Custom
                        <br />
                        Art
                      </motion.h3>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6 text-gray-600" />
        </motion.div>
      </motion.section>

      {/* Categories Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Browse by Categories
            </h2>
            <motion.div 
              className="flex justify-center space-x-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {['ALL', 'ISLAMIC ART', 'HOME DECOR', 'GIFTS'].map((filter, index) => (
                <motion.span
                  key={filter}
                  variants={itemVariants}
                  className={`px-6 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 ${
                    index === 0 
                      ? 'bg-black text-white' 
                      : 'text-gray-500 hover:text-black hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Link to={`/categories/${category.slug}`}>
                  <Card className="h-80 bg-white border-0 shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500">
                    <CardContent className="p-0 h-full relative">
                      <motion.img 
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                        whileHover={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent, transparent)" }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div 
                        className="absolute bottom-6 left-6 text-white"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                        <p className="text-sm text-white/80">{category.productCount} products</p>
                      </motion.div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex justify-between items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Featured Products</h2>
            <Link to="/products">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className="flex items-center space-x-2 hover:bg-amber-50 hover:border-amber-300 transition-all duration-300">
                  <span>View All</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Instagram Reels Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Instagram Reels
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See our latest creations and customer showcases on Instagram
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {instagramReels.map((reel, index) => (
              <motion.div
                key={reel.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white border-0 shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 cursor-pointer">
                  <CardContent className="p-0 relative">
                    <div className="aspect-[9/16] relative overflow-hidden">
                      <motion.img 
                        src={reel.thumbnail}
                        alt={reel.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <motion.div 
                        className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Play className="h-12 w-12 text-white" />
                        </motion.div>
                      </motion.div>
                      <motion.div 
                        className="absolute bottom-4 left-4 right-4 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <h4 className="font-semibold text-sm mb-2 line-clamp-2">{reel.title}</h4>
                        <div className="flex items-center space-x-4 text-xs">
                          <span>{reel.likes} likes</span>
                          <span>{reel.comments} comments</span>
                        </div>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have transformed their spaces with our art
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <CardContent className="p-8">
                    <motion.div 
                      className="flex items-center mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                          <Star 
                            className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                    <motion.p 
                      className="text-gray-700 mb-6 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      "{testimonial.comment}"
                    </motion.p>
                    <motion.div 
                      className="flex items-center space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;