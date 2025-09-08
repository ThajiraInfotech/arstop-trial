import React from 'react';
import { Award, Users, Globe, Heart } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { label: 'Happy Customers', value: '5,000+', icon: Users },
    { label: 'Countries Served', value: '25+', icon: Globe },
    { label: 'Years of Excellence', value: '8+', icon: Award },
    { label: 'Custom Designs', value: '2,500+', icon: Heart }
  ];

  const team = [
    {
      name: 'Ahmed Al-Rashid',
      role: 'Founder & Master Craftsman',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=faces&fit=crop&w=300&h=300',
      bio: 'With over 15 years of experience in Islamic art and calligraphy, Ahmed founded ArtStop to preserve and modernize traditional Islamic artistic expressions.'
    },
    {
      name: 'Fatima Hassan',
      role: 'Lead Designer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=faces&fit=crop&w=300&h=300',
      bio: 'Fatima brings contemporary design sensibilities to traditional Islamic patterns, creating pieces that resonate with modern homes while honoring heritage.'
    },
    {
      name: 'Omar Khalil',
      role: 'Production Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=faces&fit=crop&w=300&h=300',
      bio: 'Omar ensures every piece meets our high standards of quality and craftsmanship, overseeing production from concept to completion.'
    }
  ];

  const values = [
    {
      title: 'Authentic Craftsmanship',
      description: 'Every piece is carefully crafted with attention to detail and respect for traditional Islamic artistic principles.',
      icon: Award
    },
    {
      title: 'Modern Innovation',
      description: 'We blend traditional art forms with contemporary design and modern materials to create timeless pieces.',
      icon: Globe
    },
    {
      title: 'Cultural Heritage',
      description: 'Preserving and celebrating Islamic artistic heritage while making it accessible to the modern world.',
      icon: Heart
    },
    {
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We work closely with each customer to exceed expectations.',
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">About ArtStop</h1>
          <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Bridging the timeless beauty of Islamic art with contemporary living through exceptional craftsmanship and innovative design.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white shadow-lg text-center transform hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  Founded in 2016, ArtStop began as a passion project to preserve and modernize Islamic artistic traditions. 
                  What started as a small workshop has grown into a globally recognized brand, serving customers across 25 countries.
                </p>
                <p>
                  Our journey began when our founder, Ahmed Al-Rashid, noticed a gap in the market for high-quality, 
                  contemporary Islamic art that could seamlessly blend with modern home decor. Drawing from his extensive 
                  background in traditional calligraphy and geometric patterns, he set out to create pieces that honor 
                  our heritage while appealing to contemporary sensibilities.
                </p>
                <p>
                  Today, we're proud to be at the forefront of Islamic art innovation, combining traditional craftsmanship 
                  with cutting-edge technology and modern materials to create pieces that inspire and elevate any space.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1558114965-eeb97aa84c3b?crop=entropy&cs=srgb&fm=jpg&w=600&h=400&fit=crop"
                alt="Islamic Art Workshop"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">8+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and every piece we create.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-8">
                  <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate artisans and designers behind every ArtStop creation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-amber-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Discover our collection of authentic Islamic art and home decor, or work with us to create something uniquely yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg font-medium rounded-full">
                Browse Our Collection
              </Button>
            </Link>
            <Link to="/customize">
              <Button variant="outline" className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 text-lg font-medium rounded-full">
                Start Custom Design
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;