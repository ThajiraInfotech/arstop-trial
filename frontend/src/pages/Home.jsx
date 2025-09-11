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
  className="relative bg-white py-10 lg:py-16"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Grid Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Main Hero Left */}
      <motion.div 
        className="lg:col-span-7 relative rounded-2xl overflow-hidden"
        whileHover={{ scale: 1.01 }}
      >
        <img 
          src="https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=1200&q=80"
          alt="Summer Outfit"
          className="w-full h-[500px] object-cover rounded-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-end p-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Color of Summer <br /> Outfit
          </h1>
          <p className="text-white/90 mt-3 max-w-md">
            100+ Collections for your outfit inspirations this summer
          </p>
          <Link to="/categories" className="mt-6">
            <Button className="bg-black text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-900">
              View Collections →
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Right Side 2x2 Grid */}
      <div className="lg:col-span-5 grid grid-cols-2 gap-4">
        {[
          { img: "https://images.unsplash.com/photo-1606813907291-96e88456d1d1?auto=format&fit=crop&w=600&q=80", title: "Outdoor Active" },
          { img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80", title: "Casual Comfort" },
          { img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80", title: "Say it with Shirt" },
          { img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80", title: "Funky never get old" }
        ].map((card, i) => (
          <motion.div 
            key={i}
            className="relative rounded-2xl overflow-hidden group"
            whileHover={{ scale: 1.03 }}
          >
            <img 
              src={card.img} 
              alt={card.title}
              className="w-full h-56 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all flex items-end p-4">
              <h3 className="text-white text-lg font-semibold">{card.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Below Section - Inspirations */}
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div whileHover={{ y: -5 }} className="relative rounded-2xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80"
          className="h-64 w-full object-cover"
          alt="Casual Inspo" 
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
          <h3 className="text-white text-xl font-bold">Casual Inspirations</h3>
          <p className="text-white/80 text-sm mt-2">Combinations to inspire your daily activity.</p>
        </div>
      </motion.div>
      <motion.div whileHover={{ y: -5 }} className="relative rounded-2xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80"
          className="h-64 w-full object-cover"
          alt="Say it with Shirt" 
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
          <h3 className="text-white text-xl font-bold">Say it with Shirt</h3>
        </div>
      </motion.div>
      <motion.div whileHover={{ y: -5 }} className="relative rounded-2xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1622445272235-2a5a48d55db6?auto=format&fit=crop&w=800&q=80"
          className="h-64 w-full object-cover"
          alt="Funky" 
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
          <h3 className="text-white text-xl font-bold">Funky never get old</h3>
        </div>
      </motion.div>
    </div>
  </div>
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
                <Button variant="outline" className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300">
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