import { useState } from "react";
import { Menu, User, X, Home, MessageCircle, Grid3X3, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: MessageCircle, label: "Chat with AI", path: "/chat" },
    { icon: Grid3X3, label: "Explore Products", path: "/explore" },
    { icon: User, label: "Login", path: "/login" },
    { icon: FileText, label: "Terms & Conditions", path: "/terms" },
  ];

  return (
    <nav className="bg-gradient-subtle border-b border-border sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-gradient-subtle">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-earth-brown">Rural Catalog</h2>
                    <p className="text-muted-foreground">Share your products with the world</p>
                  </div>
                  
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 p-4 rounded-xl hover:bg-white/60 transition-all duration-300 group"
                    >
                      <item.icon className="h-5 w-5 text-primary group-hover:text-primary-glow transition-colors" />
                      <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            
            <Link to="/" className="text-xl font-bold text-earth-brown">
              Rural Catalog
            </Link>
          </div>

          {/* Login Button */}
          <div className="flex items-center space-x-2">
            <Link to="/login">
              <Button variant="hero" size="sm" className="shadow-soft">
                <User className="h-4 w-4 mr-1" />
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;