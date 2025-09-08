import React, { useState } from 'react';
import { Upload, X, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';

const Customize = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productRef: '',
    dimensions: '',
    material: '',
    notes: ''
  });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const sampleImages = [
    {
      id: 1,
      title: "Ayatul Kursi Design",
      src: "https://images.unsplash.com/photo-1558114965-eeb97aa84c3b?crop=entropy&cs=srgb&fm=jpg&w=300&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Islamic Geometric Pattern",
      src: "https://images.unsplash.com/photo-1573765727997-e02883182ba7?crop=entropy&cs=srgb&fm=jpg&w=300&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Modern Calligraphy",
      src: "https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg?w=300&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Traditional Mandala",
      src: "https://images.unsplash.com/photo-1615874694520-474822394e73?crop=entropy&cs=srgb&fm=jpg&w=300&h=300&fit=crop"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImages(prev => [...prev, {
            id: Date.now() + Math.random(),
            name: file.name,
            src: e.target.result
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeUploadedImage = (id) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Please fill required fields",
        description: "Name, email, and phone are required.",
        variant: "destructive",
      });
      return;
    }

    // Mock submission
    setIsSubmitted(true);
    toast({
      title: "Request Submitted Successfully!",
      description: "We'll get back to you within 24 hours with a quote.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Request Submitted Successfully!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your custom request. Our design team will review your requirements and get back to you within 24 hours with a detailed quote and timeline.
          </p>
          <div className="bg-white rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
            <h3 className="font-semibold mb-4">What happens next?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Our design team reviews your request</li>
              <li>• We prepare a detailed quote and timeline</li>
              <li>• You'll receive an email within 24 hours</li>
              <li>• Once approved, we start creating your masterpiece</li>
            </ul>
          </div>
          <div className="space-x-4">
            <Button 
              onClick={() => setIsSubmitted(false)} 
              variant="outline"
            >
              Submit Another Request
            </Button>
            <Button className="bg-black text-white hover:bg-gray-800">
              <a href="mailto:info@artstop.com">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Custom Design Request</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Bring your vision to life with our custom design service. Share your ideas and we'll create something uniquely yours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Design Requirements */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Design Requirements</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="productRef">Product Reference/Link (Optional)</Label>
                    <Input
                      id="productRef"
                      name="productRef"
                      value={formData.productRef}
                      onChange={handleInputChange}
                      placeholder="Existing product link or reference"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="dimensions">Desired Dimensions</Label>
                    <Input
                      id="dimensions"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleInputChange}
                      placeholder="e.g., 24x36 inches, 60x90 cm"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="material">Preferred Material</Label>
                    <Select value={formData.material} onValueChange={(value) => handleSelectChange('material', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stainless-steel">Stainless Steel</SelectItem>
                        <SelectItem value="acrylic">Acrylic</SelectItem>
                        <SelectItem value="wood">Wood</SelectItem>
                        <SelectItem value="canvas">Canvas</SelectItem>
                        <SelectItem value="metal">Metal</SelectItem>
                        <SelectItem value="other">Other (specify in notes)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Design Notes */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Design Notes & Special Requirements</h2>
              <Textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Please describe your vision, color preferences, style requirements, or any special instructions..."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Upload Reference Images</h2>
              <p className="text-gray-600 mb-4">
                Upload any reference images, sketches, or inspiration photos to help us understand your vision better.
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                <input
                  type="file"
                  id="image-upload"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">Click to upload images</p>
                  <p className="text-gray-600">PNG, JPG, GIF up to 10MB each</p>
                </label>
              </div>

              {/* Uploaded Images Preview */}
              {uploadedImages.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Uploaded Images:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {uploadedImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <img 
                          src={image.src} 
                          alt={image.name}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeUploadedImage(image.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <p className="text-xs text-gray-600 mt-1 truncate">{image.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sample Gallery */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Sample Designs for Inspiration</h2>
              <p className="text-gray-600 mb-6">
                Browse our sample designs to get inspired or reference them in your request.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {sampleImages.map((sample) => (
                  <div key={sample.id} className="text-center">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 hover:shadow-md transition-shadow cursor-pointer">
                      <img 
                        src={sample.src} 
                        alt={sample.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-900">{sample.title}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center">
            <Button 
              type="submit" 
              className="bg-black text-white hover:bg-gray-800 px-12 py-3 text-lg font-medium rounded-full"
            >
              Submit Custom Request
            </Button>
            <p className="text-sm text-gray-600 mt-4">
              We'll review your request and get back to you within 24 hours with a quote.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Customize;