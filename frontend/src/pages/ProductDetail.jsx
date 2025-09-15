import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Upload, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { products, reviews, getCartItems, saveCartItems, getWishlistItems, saveWishlistItems } from '../data/mock';
import { useToast } from '../hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const product = products.find(p => p.id === parseInt(id));
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]?.value || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [reviewMedia, setReviewMedia] = useState([]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center ">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const selectedVariantData = product.variants?.find(v => v.value === selectedVariant);
  const currentPrice = selectedVariantData?.price || product.price;

  const addToCart = () => {
    const cartItems = getCartItems();
    const existingItem = cartItems.find(item => 
      item.id === product.id && 
      item.variant === selectedVariant && 
      item.color === selectedColor
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({
        id: product.id,
        name: product.name,
        price: currentPrice,
        image: product.images[0],
        variant: selectedVariant,
        variantName: selectedVariantData?.name || '',
        variantDimensions: selectedVariantData?.dimensions || '',
        color: selectedColor,
        quantity: quantity
      });
    }

    saveCartItems(cartItems);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const toggleWishlist = () => {
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

  const isInWishlist = getWishlistItems().some(item => item.id === product.id);
  const productReviews = reviews.filter(review => review.productId === product.id);

  // Review form handlers
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newMedia = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video'
    }));
    setReviewMedia([...reviewMedia, ...newMedia]);
  };

  const removeMedia = (index) => {
    const newMedia = [...reviewMedia];
    URL.revokeObjectURL(newMedia[index].url);
    newMedia.splice(index, 1);
    setReviewMedia(newMedia);
  };

  const submitReview = () => {
    if (!reviewRating || !reviewTitle.trim() || !reviewContent.trim() || !displayName.trim() || !email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send to backend
    const newReview = {
      id: Date.now(),
      productId: product.id,
      userName: displayName,
      rating: reviewRating,
      comment: reviewContent,
      title: reviewTitle,
      date: new Date().toISOString().split('T')[0],
      verified: false,
      media: reviewMedia
    };

    // Reset form
    setReviewRating(0);
    setReviewTitle('');
    setReviewContent('');
    setDisplayName('');
    setEmail('');
    setReviewMedia([]);
    setShowReviewForm(false);

    toast({
      title: "Review Submitted",
      description: "Thank you for your review! It will be published after moderation.",
    });
  };

  const cancelReview = () => {
    // Clean up object URLs
    reviewMedia.forEach(media => URL.revokeObjectURL(media.url));
    setReviewRating(0);
    setReviewTitle('');
    setReviewContent('');
    setDisplayName('');
    setEmail('');
    setReviewMedia([]);
    setShowReviewForm(false);
  };

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = productReviews.filter(review => review.rating === rating).length;
    const percentage = productReviews.length > 0 ? (count / productReviews.length) * 100 : 0;
    return { rating, count, percentage };
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-gray-700">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">{product.rating}</span>
                <span className="text-gray-500">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-3">
                <span className="text-3xl font-bold text-gray-900">
                  Rs. {currentPrice.toLocaleString()}
                </span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    Rs. {product.oldPrice.toLocaleString()}
                  </span>
                )}
                {product.oldPrice && (
                  <Badge variant="destructive" className="text-sm">
                    Save {Math.round(((product.oldPrice - currentPrice) / product.oldPrice) * 100)}%
                  </Badge>
                )}
              </div>
              {/* Selected size display (no price here) */}
              {selectedVariantData && (
                <div className="text-sm text-gray-600 mb-6">
                  Selected size:{" "}
                  <span className="font-medium text-gray-900">{selectedVariantData.name}</span>
                  {selectedVariantData.dimensions ? (
                    <span> — {selectedVariantData.dimensions}</span>
                  ) : null}
                </div>
              )}
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Size</h3>
                <RadioGroup
                  value={selectedVariant}
                  onValueChange={(v) => setSelectedVariant(v)}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {product.variants.map((variant) => {
                    const id = `size-${variant.value}`;
                    return (
                      <Label
                        key={variant.value}
                        htmlFor={id}
                        className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedVariant === variant.value ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <RadioGroupItem id={id} value={variant.value} />
                          <div className="font-medium text-gray-900">{variant.name}{variant.dimensions ? `: ${variant.dimensions}` : ''}</div>
                        </div>
                        {selectedVariant === variant.value && (
                          <span className="text-xs text-green-600 font-medium">Selected</span>
                        )}
                      </Label>
                    );
                  })}
                </RadioGroup>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Color</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      onClick={() => setSelectedColor(color)}
                      className="min-w-[80px]"
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quantity</h3>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                onClick={addToCart}
                className="flex-1 bg-black text-white hover:bg-gray-800 py-3 text-lg font-medium rounded-full"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                onClick={toggleWishlist}
                className="px-6 py-3 rounded-full"
              >
                <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current text-red-500' : ''}`} />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                <p className="text-sm text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                <p className="text-sm text-gray-600">2 Year Warranty</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                <p className="text-sm text-gray-600">30 Day Returns</p>
              </div>
            </div>

            {/* Customize CTA */}
            <Card className="bg-gradient-to-r from-blue-50 to-orange-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">Want Something Custom?</h3>
                <p className="text-gray-600 mb-4">Let us create a personalized version just for you</p>
                <Link to="/customize">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                    Customize This Product
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
                  
                  <h4 className="text-lg font-semibold mb-3">Features</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Rating Overview */}
                <Card>
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold mb-2">{product.rating}</div>
                      <div className="flex items-center justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">{product.reviewCount} reviews</p>
                    </div>
                    
                    <div className="space-y-3">
                      {ratingDistribution.map(({ rating, count, percentage }) => (
                        <div key={rating} className="flex items-center space-x-3">
                          <span className="text-sm w-3">{rating}</span>
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-8">{count}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews List */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Write a Review Button */}
                  {!showReviewForm && (
                    <Card className="border-dashed border-2">
                      <CardContent className="p-6 text-center">
                        <h3 className="text-lg font-semibold mb-2">Share Your Experience</h3>
                        <p className="text-gray-600 mb-4">Help others by writing a review for this product</p>
                        <Button onClick={() => setShowReviewForm(true)} className="bg-black text-white hover:bg-gray-800">
                          Write a Review
                        </Button>
                      </CardContent>
                    </Card>
                  )}

                  {/* Review Form */}
                  {showReviewForm && (
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-6">Write a Review</h3>

                        {/* Rating */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setReviewRating(star)}
                                className="focus:outline-none"
                              >
                                <Star
                                  className={`h-8 w-8 ${
                                    star <= reviewRating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300 hover:text-yellow-400'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Review Title */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Review Title *
                          </label>
                          <p className="text-sm text-gray-500 mb-2">Give your review a title</p>
                          <Input
                            value={reviewTitle}
                            onChange={(e) => setReviewTitle(e.target.value)}
                            placeholder="Summarize your experience"
                            maxLength={100}
                          />
                        </div>

                        {/* Review Content */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Review Content *
                          </label>
                          <p className="text-sm text-gray-500 mb-2">Start writing here...</p>
                          <Textarea
                            value={reviewContent}
                            onChange={(e) => setReviewContent(e.target.value)}
                            placeholder="Share details of your experience with this product"
                            rows={6}
                            maxLength={1000}
                          />
                          <div className="text-right text-sm text-gray-500 mt-1">
                            {reviewContent.length}/1000
                          </div>
                        </div>

                        {/* Media Upload */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Picture/Video (optional)
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                            <input
                              type="file"
                              multiple
                              accept="image/*,video/*"
                              onChange={handleFileUpload}
                              className="hidden"
                              id="media-upload"
                            />
                            <label htmlFor="media-upload" className="cursor-pointer">
                              <div className="text-center">
                                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF, MP4 up to 10MB each</p>
                              </div>
                            </label>
                          </div>

                          {/* Media Preview */}
                          {reviewMedia.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                              {reviewMedia.map((media, index) => (
                                <div key={index} className="relative">
                                  {media.type === 'image' ? (
                                    <img
                                      src={media.url}
                                      alt={`Upload ${index + 1}`}
                                      className="w-full h-24 object-cover rounded-lg"
                                    />
                                  ) : (
                                    <video
                                      src={media.url}
                                      className="w-full h-24 object-cover rounded-lg"
                                      controls
                                    />
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => removeMedia(index)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Display Name */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Display Name *
                          </label>
                          <p className="text-sm text-gray-500 mb-2">Displayed publicly like "John Smith"</p>
                          <Input
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Your display name"
                          />
                        </div>

                        {/* Email */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <p className="text-sm text-gray-500 mb-2">Your email address</p>
                          <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                          />
                        </div>

                        {/* Terms */}
                        <div className="mb-6">
                          <p className="text-sm text-gray-600">
                            How we use your data: We'll only contact you about the review you left, and only if necessary. By submitting your review, you agree to Judge.me's terms, privacy and content policies.
                          </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-4">
                          <Button
                            onClick={cancelReview}
                            variant="outline"
                            className="flex-1"
                          >
                            Cancel Review
                          </Button>
                          <Button
                            onClick={submitReview}
                            className="flex-1 bg-black text-white hover:bg-gray-800"
                          >
                            Submit Review
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Existing Reviews */}
                  {productReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-semibold">{review.userName}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">Verified</Badge>
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Shipping Information</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Free Shipping</h4>
                      <p className="text-gray-700">Free standard shipping on all orders over Rs. 5,000</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Delivery Time</h4>
                      <p className="text-gray-700">Standard: 5-7 business days</p>
                      <p className="text-gray-700">Express: 2-3 business days (additional charges apply)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Returns</h4>
                      <p className="text-gray-700">30-day return policy. Items must be in original condition.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;