import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, MessageSquare, Globe, Download, Edit, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface CatalogData {
  productName: string;
  description: string;
  features: string[];
  price: string;
  category: string;
  highlights: string[];
  marketingCopy: string;
}

export default function GenerateCatalog() {
  const [isGenerating, setIsGenerating] = useState(true);
  const [catalogData, setCatalogData] = useState<CatalogData | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const image = localStorage.getItem('capturedProductImage');
    const description = localStorage.getItem('productDescription');

    if (!image || !description) {
      toast({
        title: "Missing data",
        description: "Please complete the previous steps first.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    setCapturedImage(image);
    generateCatalog(description);
  }, [navigate, toast]);

  const generateCatalog = async (description: string) => {
    setIsGenerating(true);
    
    try {
      // Here you would call your OpenRouter API
      // For now, I'll simulate the AI generation with mock data
      
      // Add your OpenRouter API key here
      const API_KEY = 'YOUR_OPENROUTER_API_KEY';
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock AI-generated catalog data
      const mockCatalog: CatalogData = {
        productName: extractProductName(description),
        description: enhanceDescription(description),
        features: extractFeatures(description),
        price: extractPrice(description),
        category: 'Handmade Products',
        highlights: ['High Quality', 'Handcrafted', 'Traditional Design'],
        marketingCopy: generateMarketingCopy(description)
      };

      setCatalogData(mockCatalog);
      
      toast({
        title: "Catalog generated!",
        description: "Your professional catalog is ready to share.",
      });
    } catch (error) {
      console.error('Error generating catalog:', error);
      toast({
        title: "Generation failed",
        description: "Failed to generate catalog. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Helper functions to extract data from description
  const extractProductName = (desc: string): string => {
    const words = desc.split(' ');
    return words.slice(0, 3).join(' ') || 'Premium Product';
  };

  const extractFeatures = (desc: string): string[] => {
    const features = [];
    if (desc.toLowerCase().includes('cotton')) features.push('Pure Cotton Material');
    if (desc.toLowerCase().includes('handmade')) features.push('Handcrafted Quality');
    if (desc.toLowerCase().includes('traditional')) features.push('Traditional Design');
    if (desc.toLowerCase().includes('color')) features.push('Beautiful Colors');
    if (features.length === 0) features.push('Premium Quality', 'Excellent Craftsmanship');
    return features;
  };

  const extractPrice = (desc: string): string => {
    const priceMatch = desc.match(/(\d+)\s*(rupees?|rs|₹)/i);
    return priceMatch ? `₹${priceMatch[1]}` : 'Contact for Price';
  };

  const enhanceDescription = (desc: string): string => {
    return desc + ' This premium product combines traditional craftsmanship with modern appeal, perfect for discerning customers who value quality and authenticity.';
  };

  const generateMarketingCopy = (desc: string): string => {
    return `Experience the perfect blend of tradition and quality with this exceptional product. Carefully crafted with attention to detail, this item represents the finest in its category. Ideal for those who appreciate authentic craftsmanship and superior materials.`;
  };

  const shareWhatsApp = () => {
    if (!catalogData) return;
    
    const message = `🌟 ${catalogData.productName}\n\n${catalogData.description}\n\n💰 Price: ${catalogData.price}\n\n✨ Features:\n${catalogData.features.map(f => `• ${f}`).join('\n')}\n\nContact me for more details!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Opening WhatsApp",
      description: "Share your catalog with customers on WhatsApp.",
    });
  };

  const shareGeneral = async () => {
    if (!catalogData) return;
    
    const shareData = {
      title: catalogData.productName,
      text: catalogData.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(`${shareData.title}\n\n${shareData.text}`);
        toast({
          title: "Copied to clipboard",
          description: "Catalog details copied. You can paste and share anywhere.",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Share failed",
        description: "Could not share. Please try copying manually.",
        variant: "destructive",
      });
    }
  };

  const makePublic = () => {
    if (!catalogData || !capturedImage) return;
    
    // Create public catalog entry
    const publicCatalog = {
      id: Date.now().toString(),
      name: catalogData.productName,
      description: catalogData.description,
      price: catalogData.price,
      image: capturedImage,
      category: catalogData.category,
      location: 'India', // You could ask user for location
      seller: 'Rural Entrepreneur', // You could ask user for name
      rating: 4.8,
      likes: Math.floor(Math.random() * 50) + 10,
      isLiked: false,
      features: catalogData.features,
      highlights: catalogData.highlights,
      marketingCopy: catalogData.marketingCopy,
      createdAt: new Date().toISOString()
    };
    
    // Get existing public catalogs from localStorage
    const existingCatalogs = JSON.parse(localStorage.getItem('publicCatalogs') || '[]');
    
    // Add new catalog
    existingCatalogs.unshift(publicCatalog);
    
    // Save back to localStorage
    localStorage.setItem('publicCatalogs', JSON.stringify(existingCatalogs));
    
    toast({
      title: "Made public!",
      description: "Your catalog is now visible to everyone in the explore section.",
    });
  };

  const editCatalog = () => {
    navigate('/description');
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center card-elevated">
          <CardContent className="p-8 space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-primary-foreground animate-pulse" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gradient">Generating Your Catalog</h2>
              <p className="text-muted-foreground">
                Our AI is creating a professional catalog for your product...
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">This may take a few moments</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!catalogData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-4">Generation Failed</h2>
            <p className="text-muted-foreground mb-4">
              Unable to generate catalog. Please try again.
            </p>
            <Button onClick={() => navigate('/description')}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gradient">Your Professional Catalog</h1>
          <p className="text-muted-foreground">
            AI-generated catalog ready to share with the world
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Image */}
          <Card className="card-elevated">
            <CardContent className="p-6">
              {capturedImage && (
                <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-4">
                  <img
                    src={capturedImage}
                    alt={catalogData.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {catalogData.highlights.map((highlight, index) => (
                  <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Catalog Details */}
          <div className="space-y-4">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-2xl text-gradient">
                  {catalogData.productName}
                </CardTitle>
                <Badge variant="outline" className="w-fit">
                  {catalogData.category}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {catalogData.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Key Features</h3>
                  <ul className="space-y-1">
                    {catalogData.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-2xl text-gradient mb-1">
                    {catalogData.price}
                  </h3>
                  <p className="text-sm text-muted-foreground">Competitive pricing</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Marketing Copy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic">
                  {catalogData.marketingCopy}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={shareWhatsApp} className="btn-hero">
            <MessageSquare className="w-5 h-5 mr-2" />
            Share on WhatsApp
          </Button>
          
          <Button onClick={shareGeneral} variant="outline" size="lg">
            <Share2 className="w-5 h-5 mr-2" />
            Share More Ways
          </Button>
          
          <Button onClick={makePublic} className="btn-secondary-hero">
            <Globe className="w-5 h-5 mr-2" />
            Make Public
          </Button>
          
          <Button onClick={editCatalog} variant="outline" size="lg">
            <Edit className="w-5 h-5 mr-2" />
            Edit Details
          </Button>
        </div>

        {/* Success Message */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold mb-2 text-primary">🎉 Catalog Ready!</h3>
            <p className="text-sm text-muted-foreground">
              Your professional catalog has been generated successfully. Share it with customers 
              or make it public for everyone to discover.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}