import { useState } from "react";
import { ArrowLeft, Mic, MicOff, Sparkles, ArrowRight, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Description = () => {
  const [description, setDescription] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const capturedImage = location.state?.image;

  const startRecording = () => {
    setIsRecording(true);
    
    try {
      // Use Web Speech API directly
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onstart = () => {
          setIsRecording(true);
        };
        
        recognition.onresult = (event: any) => {
          let finalTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            }
          }
          
          if (finalTranscript) {
            setDescription(prev => prev + (prev ? " " : "") + finalTranscript);
          }
        };
        
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
          alert('Speech recognition failed. Please try again or type manually.');
        };
        
        recognition.onend = () => {
          setIsRecording(false);
        };
        
        recognition.start();
      } else {
        setIsRecording(false);
        alert('Speech recognition not supported in this browser. Please type manually.');
      }
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsRecording(false);
      alert('Could not start speech recognition. Please try again.');
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    // The recognition will automatically stop and trigger onend
  };

  const generateCatalog = () => {
    // Navigate to catalog generation page
    navigate("/catalog", { 
      state: { 
        image: capturedImage, 
        description: description 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link to="/camera">
            <Button variant="ghost" size="icon" className="mr-3">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-earth-brown">Describe Your Product</h1>
            <p className="text-muted-foreground">Add details to make your catalog attractive</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Product Image Preview */}
          {capturedImage && (
            <Card className="bg-white shadow-card">
              <CardContent className="p-4">
                <h3 className="font-semibold text-earth-brown mb-3">Your Product Photo</h3>
                <div className="aspect-square max-w-xs mx-auto">
                  <img
                    src={capturedImage}
                    alt="Product"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Description Input */}
          <Card className="bg-white shadow-warm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-earth-brown flex items-center">
                    <Type className="h-5 w-5 mr-2" />
                    Product Description
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={isRecording ? "destructive" : "hero"}
                      size="icon"
                      onClick={isRecording ? stopRecording : startRecording}
                      className="rounded-full"
                    >
                      {isRecording ? (
                        <MicOff className="h-4 w-4" />
                      ) : (
                        <Mic className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product... Tell customers what makes it special, its features, benefits, and why they should choose it."
                  className="min-h-[150px] resize-none rounded-xl border-2 focus:border-primary"
                  disabled={isRecording}
                />

                {isRecording && (
                  <Card className="bg-cream border-primary/20">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          {isRecording ? (
                            <>
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                            </>
                          ) : (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          )}
                        </div>
                        <span className="text-sm text-foreground">
                          {isRecording ? "Recording... Speak about your product" : "Converting speech to text..."}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="bg-cream border-warm-orange/20">
            <CardContent className="p-4">
              <h4 className="font-semibold text-earth-brown mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Description Tips
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Mention key features and benefits</li>
                <li>• Include size, color, or other specifications</li>
                <li>• Highlight what makes your product unique</li>
                <li>• Use the voice recorder for quick input</li>
              </ul>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Button
            onClick={generateCatalog}
            disabled={!description.trim() || isRecording}
            variant="create"
            size="hero"
            className="w-full"
          >
            <Sparkles className="h-6 w-6 mr-3" />
            Generate Catalog
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Description;