import { useState } from "react";
import { ArrowLeft, Share2, Eye, Heart, MessageCircle, Globe, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const CatalogGenerated = () => {
  const [isPublic, setIsPublic] = useState(false);
  const location = useLocation();
  const { image, description } = location.state || {};

  const handleWhatsAppShare = () => {
    const catalogText = `🌟 Check out my product! 🌟\n\n${description}\n\nContact me for more details!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(catalogText)}`;
    window.open(whatsappUrl, '_blank');
    toast.success("Opening WhatsApp to share your catalog!");
  };

  const handleOtherShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Product Catalog',
        text: description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${description}\n\nShared from Rural Catalog App`);
      toast.success("Catalog link copied to clipboard!");
    }
  };

  const handleMakePublic = () => {
    setIsPublic(true);
    toast.success("Your catalog is now visible to everyone in the community!");
  };

  // Generate a mock catalog with AI-enhanced content
  const enhancedDescription = description 
    ? `🌟 ${description}\n\n✨ Key Features:\n• High Quality Product\n• Locally Sourced\n• Great Value for Money\n• Fast Delivery Available\n\n📞 Contact me for orders and inquiries!`
    : "Beautiful product catalog generated with AI assistance!";

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link to="/description">
            <Button variant="ghost" size="icon" className="mr-3">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-earth-brown">Your Catalog is Ready!</h1>
            <p className="text-muted-foreground">Share it with your community</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Generated Catalog Preview */}
          <Card className="bg-white shadow-warm border-2 border-primary/10">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-earth-brown text-lg">Product Catalog</h3>
                  <div className="flex items-center space-x-1 text-muted-foreground text-sm">
                    <Eye className="h-4 w-4" />
                    <span>Preview</span>
                  </div>
                </div>

                {/* Product Image */}
                {image && (
                  <div className="aspect-square max-w-sm mx-auto rounded-xl overflow-hidden shadow-card">
                    <img
                      src={image}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Enhanced Description */}
                <div className="bg-gradient-subtle rounded-xl p-4 border border-primary/10">
                  <pre className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">
                    {enhancedDescription}
                  </pre>
                </div>

                {/* Engagement Metrics (Simulated) */}
                <div className="flex items-center justify-center space-x-6 pt-4 border-t border-border">
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">0</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">0</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Share2 className="h-4 w-4" />
                    <span className="text-sm">0</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sharing Options */}
          <div className="space-y-4">
            <h3 className="font-semibold text-earth-brown text-lg">Share Your Catalog</h3>
            
            {/* WhatsApp Share */}
            <Card className="bg-white shadow-card hover:shadow-warm transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-500 rounded-full p-2">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-earth-brown">Share via WhatsApp</h4>
                      <p className="text-muted-foreground text-sm">
                        Share directly with your contacts
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleWhatsAppShare}
                    variant="hero"
                    size="sm"
                  >
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Other Sharing */}
            <Card className="bg-white shadow-card hover:shadow-warm transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-warm rounded-full p-2">
                      <Share2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-earth-brown">Share via Other Apps</h4>
                      <p className="text-muted-foreground text-sm">
                        Copy link or share to social media
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleOtherShare}
                    variant="warm"
                    size="sm"
                  >
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Make Public */}
            <Card className="bg-white shadow-card hover:shadow-warm transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`rounded-full p-2 ${isPublic ? 'bg-green-500' : 'bg-gradient-primary'}`}>
                      {isPublic ? (
                        <CheckCircle className="h-5 w-5 text-white" />
                      ) : (
                        <Globe className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-earth-brown">
                        {isPublic ? "Visible to Community" : "Make Visible to All"}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {isPublic 
                          ? "Your catalog is now public in the community" 
                          : "Let everyone in the community discover your product"
                        }
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleMakePublic}
                    disabled={isPublic}
                    variant={isPublic ? "secondary" : "hero"}
                    size="sm"
                  >
                    {isPublic ? "Public" : "Make Public"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Link to="/" className="flex-1">
              <Button variant="outline" size="lg" className="w-full">
                Create Another
              </Button>
            </Link>
            <Link to="/explore" className="flex-1">
              <Button variant="hero" size="lg" className="w-full">
                View Community
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogGenerated;
