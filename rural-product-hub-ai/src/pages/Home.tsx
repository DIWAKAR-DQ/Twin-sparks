import { Plus, Grid3X3, Camera, Users, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ChatWithAIBar from "@/components/ChatWithAIBar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      {/* Chat with AI Bar */}
      <ChatWithAIBar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-earth-brown mb-4">
            Share Your Products with the World
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create beautiful catalogs for your products and connect with customers in your community
          </p>
        </div>

        {/* Main Action Buttons */}
        <div className="space-y-6">
          {/* Create New Catalog - Main CTA */}
          <Card className="bg-white shadow-warm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-2 border-primary/10">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-primary rounded-full blur-lg opacity-30 animate-pulse"></div>
                  <div className="relative bg-gradient-primary rounded-full p-6">
                    <Plus className="h-12 w-12 text-white" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-earth-brown">Create New Catalog</h2>
                  <p className="text-muted-foreground text-lg">
                    Take a photo of your product and let AI help you create a beautiful catalog
                  </p>
                </div>
                
                <Link to="/camera" className="w-full max-w-md">
                  <Button variant="create" size="hero" className="w-full group">
                    <Camera className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                    Start Creating
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Explore Products */}
          <Card className="bg-white shadow-card hover:shadow-warm transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-warm rounded-full p-3">
                    <Grid3X3 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-earth-brown">Explore Products</h3>
                    <p className="text-muted-foreground">
                      Discover amazing products from your community
                    </p>
                  </div>
                </div>
                
                <Link to="/explore">
                  <Button variant="warm" size="lg" className="group">
                    Explore
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-white shadow-card hover:shadow-warm transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-primary rounded-full p-4 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-earth-brown mb-2">Easy Photo Capture</h3>
              <p className="text-muted-foreground text-sm">
                Simply take a photo of your product with your phone
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-card hover:shadow-warm transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-warm rounded-full p-4 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-earth-brown mb-2">AI-Powered</h3>
              <p className="text-muted-foreground text-sm">
                Let AI help you create professional product descriptions
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-card hover:shadow-warm transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <div className="bg-soft-green rounded-full p-4 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-earth-brown mb-2">Community Sharing</h3>
              <p className="text-muted-foreground text-sm">
                Share with neighbors and reach new customers
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;