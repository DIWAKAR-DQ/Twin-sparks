import { ArrowLeft, Shield, Users, Eye, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-3">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-earth-brown">Terms & Conditions</h1>
            <p className="text-muted-foreground">Last updated: December 2024</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Introduction */}
          <Card className="bg-white shadow-card">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-primary rounded-full p-3 flex-shrink-0">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-earth-brown mb-3">Welcome to Rural Catalog</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By using our Rural Catalog platform, you agree to these terms and conditions. 
                    Our mission is to empower rural communities by providing a simple platform to 
                    showcase and share their products with the world.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card className="bg-white shadow-card">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-warm rounded-full p-3 flex-shrink-0">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-earth-brown mb-3">User Responsibilities</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Provide accurate and truthful information about your products
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Respect other community members and their products
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Do not post inappropriate, offensive, or misleading content
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Ensure you have rights to all images and content you upload
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Follow local laws and regulations for selling products
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Data */}
          <Card className="bg-white shadow-card">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-soft-green rounded-full p-3 flex-shrink-0">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-earth-brown mb-3">Privacy & Data Protection</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      We are committed to protecting your privacy and personal information. 
                      Here's how we handle your data:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-soft-green rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Product images and descriptions you share are visible to the community
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-soft-green rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Personal contact information is never shared without your consent
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-soft-green rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        You can delete your content and account at any time
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-soft-green rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        We use AI to help improve catalog descriptions, but your data remains secure
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Usage */}
          <Card className="bg-white shadow-card">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-warm-orange rounded-full p-3 flex-shrink-0">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-earth-brown mb-3">Platform Usage Guidelines</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      To maintain a safe and welcoming community, please follow these guidelines:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-earth-brown text-sm">✅ Allowed</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Genuine product listings</li>
                          <li>• Helpful product descriptions</li>
                          <li>• Community interactions</li>
                          <li>• Sharing via social media</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-earth-brown text-sm">❌ Not Allowed</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Spam or fake listings</li>
                          <li>• Inappropriate content</li>
                          <li>• Misleading information</li>
                          <li>• Harassment of users</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Support */}
          <Card className="bg-cream border-warm-orange/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-earth-brown mb-3">Questions or Concerns?</h3>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these terms or need support, 
                we're here to help our rural community members.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/chat">
                  <Button variant="hero" size="sm">
                    Chat with AI Support
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  Contact Community Manager
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Agreement */}
          <Card className="bg-white shadow-card">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-4">
                By using Rural Catalog, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms & Conditions.
              </p>
              <Link to="/">
                <Button variant="hero" size="lg">
                  I Understand & Agree
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;