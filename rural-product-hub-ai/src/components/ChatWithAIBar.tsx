import { MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ChatWithAIBar = () => {
  return (
    <Card className="bg-gradient-primary text-white p-4 rounded-2xl shadow-warm mx-4 my-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-full">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Need Help Creating Your Catalog?</h3>
            <p className="text-white/90 text-sm">Chat with our AI assistant for guidance</p>
          </div>
        </div>
        
        <Link to="/chat">
          <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white transition-all duration-300">
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat Now
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default ChatWithAIBar;