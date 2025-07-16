import { useState, useEffect } from 'react';
import { Search, Filter, Heart, Share2, MessageSquare, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  location: string;
  seller: string;
  rating: number;
  likes: number;
  isLiked: boolean;
}

export default function Explore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load both mock products and user-created public catalogs
    setTimeout(() => {
      const publicCatalogs = JSON.parse(localStorage.getItem('publicCatalogs') || '[]');
      const allProducts = [...publicCatalogs, ...mockProducts];
      setProducts(allProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Handwoven Cotton Saree',
      description: 'Beautiful traditional saree with intricate golden border. Perfect for weddings and special occasions.',
      price: '₹2,500',
      image: '/api/placeholder/300/300',
      category: 'Textiles',
      location: 'Tamil Nadu',
      seller: 'Priya Textiles',
      rating: 4.8,
      likes: 45,
      isLiked: false
    },
    {
      id: '2',
      name: 'Organic Turmeric Powder',
      description: 'Pure, organic turmeric powder grown naturally. Rich in curcumin and free from chemicals.',
      price: '₹150/kg',
      image: '/api/placeholder/300/300',
      category: 'Agriculture',
      location: 'Karnataka',
      seller: 'Green Farm Co-op',
      rating: 4.9,
      likes: 32,
      isLiked: true
    },
    {
      id: '3',
      name: 'Bamboo Handicrafts Set',
      description: 'Eco-friendly bamboo home decor items. Includes vases, baskets, and decorative pieces.',
      price: '₹800',
      image: '/api/placeholder/300/300',
      category: 'Handicrafts',
      location: 'Assam',
      seller: 'Bamboo Craft House',
      rating: 4.6,
      likes: 28,
      isLiked: false
    },
    {
      id: '4',
      name: 'Pure Honey',
      description: 'Natural honey collected from local beehives. Rich flavor and completely pure.',
      price: '₹400/500g',
      image: '/api/placeholder/300/300',
      category: 'Agriculture',
      location: 'Himachal Pradesh',
      seller: 'Mountain Honey Farm',
      rating: 4.7,
      likes: 56,
      isLiked: false
    },
    {
      id: '5',
      name: 'Clay Pottery Collection',
      description: 'Traditional clay pots and containers. Perfect for kitchen use and home decoration.',
      price: '₹300',
      image: '/api/placeholder/300/300',
      category: 'Handicrafts',
      location: 'Rajasthan',
      seller: 'Desert Pottery',
      rating: 4.5,
      likes: 23,
      isLiked: true
    },
    {
      id: '6',
      name: 'Silk Dupatta',
      description: 'Luxurious silk dupatta with traditional patterns. Lightweight and elegant.',
      price: '₹1,200',
      image: '/api/placeholder/300/300',
      category: 'Textiles',
      location: 'West Bengal',
      seller: 'Silk Heritage',
      rating: 4.8,
      likes: 41,
      isLiked: false
    }
  ];

  const categories = ['all', 'Textiles', 'Agriculture', 'Handicrafts', 'Jewelry', 'Food'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLike = (productId: string) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { 
            ...product, 
            isLiked: !product.isLiked,
            likes: product.isLiked ? product.likes - 1 : product.likes + 1
          }
        : product
    ));
  };

  const handleShare = (product: Product) => {
    const shareData = {
      title: product.name,
      text: `${product.description}\n\nPrice: ${product.price}\nSeller: ${product.seller}`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(`${shareData.title}\n\n${shareData.text}`);
    }
  };

  const handleContact = (product: Product) => {
    const message = `Hi! I'm interested in your ${product.name} listed for ${product.price}. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gradient mb-2">Explore Products</h1>
            <p className="text-muted-foreground">Loading amazing products from rural entrepreneurs...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-square bg-muted rounded-lg"></div>
                <CardContent className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gradient">Explore Products</h1>
          <p className="text-muted-foreground">
            Discover amazing products from rural entrepreneurs across India
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="card-interactive group overflow-hidden">
              <div className="aspect-square bg-muted overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <CardContent className="p-4 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleLike(product.id)}
                      className={`flex-shrink-0 ${
                        product.isLiked ? 'text-red-500' : 'text-muted-foreground'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${product.isLiked ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-xl font-bold text-gradient">{product.price}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {product.location}
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {product.category}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Star className="w-3 h-3 fill-current text-yellow-500" />
                  <span>{product.rating}</span>
                  <span>•</span>
                  <Heart className="w-3 h-3" />
                  <span>{product.likes} likes</span>
                  <span>•</span>
                  <span>{product.seller}</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => handleContact(product)}
                    className="flex-1 bg-gradient-to-r from-primary to-primary-glow"
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Contact
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare(product)}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="text-center p-12">
            <CardContent>
              <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find more products.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-gradient mb-2">Want to showcase your products?</h3>
            <p className="text-muted-foreground mb-4">
              Create beautiful catalogs and reach more customers with our AI-powered platform.
            </p>
            <Button className="btn-hero">
              Start Creating Catalogs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}