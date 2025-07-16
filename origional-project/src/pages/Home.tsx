import { Link } from 'react-router-dom';
import { Plus, MessageCircle, Package, Camera, Sparkles, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* AI Chat Bar */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/ai-chat">
            <div className="flex items-center justify-center gap-3 p-4 bg-white/50 backdrop-blur rounded-2xl hover:bg-white/70 transition-all duration-300 cursor-pointer group">
              <MessageCircle className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-lg font-semibold text-foreground">Chat with AI Assistant</span>
              <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
            </div>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gradient leading-tight">
              Create Beautiful Product Catalogs
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your products into stunning catalogs with AI. Simply take a photo, 
              describe your product, and let our AI create professional listings for you.
            </p>
          </div>

          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/camera" className="group">
              <div className="flex items-center gap-4 btn-hero group-hover:shadow-2xl">
                <div className="icon-btn-large bg-white/20">
                  <Plus className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold">Create New Catalog</div>
                  <div className="text-sm opacity-90">Start with a photo</div>
                </div>
              </div>
            </Link>
            
            <Link to="/explore">
              <Button className="btn-secondary-hero">
                <Package className="w-5 h-5 mr-2" />
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="card-interactive group">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center group-hover:scale-110 transition-transform">
                <Camera className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Smart Photo Capture</h3>
              <p className="text-muted-foreground">
                Take a photo of your product and our AI will automatically enhance and optimize it for your catalog.
              </p>
            </CardContent>
          </Card>

          <Card className="card-interactive group">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-secondary to-[hsl(35_100%_65%)] flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Voice Description</h3>
              <p className="text-muted-foreground">
                Speak naturally about your product and our AI will convert it into professional descriptions.
              </p>
            </CardContent>
          </Card>

          <Card className="card-interactive group">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">AI Generation</h3>
              <p className="text-muted-foreground">
                Generate beautiful, professional catalogs automatically with pricing, features, and marketing copy.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary/5 to-secondary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-gradient">1000+</div>
              <div className="text-lg text-muted-foreground">Catalogs Created</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-gradient">500+</div>
              <div className="text-lg text-muted-foreground">Happy Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-gradient">50+</div>
              <div className="text-lg text-muted-foreground">Rural Communities</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient">
            Ready to showcase your products?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of rural entrepreneurs who are growing their businesses with beautiful product catalogs.
          </p>
          <Link to="/camera">
            <Button className="btn-hero animate-float">
              <Plus className="w-6 h-6 mr-2" />
              Start Creating Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}