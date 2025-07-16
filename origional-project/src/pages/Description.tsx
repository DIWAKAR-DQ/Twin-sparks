import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Type, Zap, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function Description() {
  const [description, setDescription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Get captured image from localStorage
    const image = localStorage.getItem('capturedProductImage');
    if (!image) {
      toast({
        title: "No image found",
        description: "Please capture a product image first.",
        variant: "destructive",
      });
      navigate('/camera');
      return;
    }
    setCapturedImage(image);

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setDescription(prev => {
          const newText = prev + transcript;
          return newText;
        });
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        toast({
          title: "Voice recognition error",
          description: "There was an issue with voice recognition. Please try typing instead.",
          variant: "destructive",
        });
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [navigate, toast]);

  const startRecording = () => {
    if (!recognition) {
      toast({
        title: "Voice not supported",
        description: "Voice recognition is not supported in your browser. Please type your description.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsRecording(true);
      setDescription(''); // Clear previous text
      recognition.start();
      toast({
        title: "Listening...",
        description: "Speak clearly about your product. Tap stop when finished.",
      });
    } catch (error) {
      console.error('Error starting recognition:', error);
      setIsRecording(false);
      toast({
        title: "Recording failed",
        description: "Could not start voice recording. Please try again.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (recognition && isRecording) {
      recognition.stop();
      setIsRecording(false);
      toast({
        title: "Recording stopped",
        description: "Your voice description has been captured.",
      });
    }
  };

  const generateCatalog = async () => {
    if (!description.trim()) {
      toast({
        title: "Description required",
        description: "Please add a description of your product before generating the catalog.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Store the description for the catalog generation page
      localStorage.setItem('productDescription', description);
      
      toast({
        title: "Generating catalog...",
        description: "Our AI is creating your professional catalog.",
      });

      // Navigate to catalog generation
      navigate('/generate-catalog');
    } catch (error) {
      console.error('Error generating catalog:', error);
      toast({
        title: "Generation failed",
        description: "Failed to generate catalog. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    navigate('/camera');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gradient">Describe Your Product</h1>
          <p className="text-muted-foreground">
            Tell us about your product - you can type or speak naturally
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Image */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg">Your Product Photo</CardTitle>
            </CardHeader>
            <CardContent>
              {capturedImage && (
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={capturedImage}
                    alt="Captured product"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Description Input */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="w-5 h-5" />
                Product Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Text Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Describe your product (name, features, price, etc.)
                </label>
                <Textarea
                  ref={textareaRef}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Example: Handmade cotton saree, beautiful blue color with golden border, perfect for special occasions, price 2500 rupees, made with pure cotton, traditional design..."
                  className="min-h-32 resize-none"
                  disabled={isRecording}
                />
              </div>

              {/* Voice Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Or speak about your product
                  </span>
                  {isRecording && (
                    <div className="flex items-center gap-2 text-red-500">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-xs">Recording...</span>
                    </div>
                  )}
                </div>
                
                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  variant={isRecording ? "destructive" : "outline"}
                  className="w-full"
                  disabled={isLoading}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-5 h-5 mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="w-5 h-5 mr-2" />
                      Start Voice Description
                    </>
                  )}
                </Button>
              </div>

              {/* Character Count */}
              <div className="text-xs text-muted-foreground text-right">
                {description.length} characters
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={goBack} size="lg" disabled={isLoading}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Camera
          </Button>
          
          <Button 
            onClick={generateCatalog} 
            disabled={!description.trim() || isLoading}
            className="btn-hero"
          >
            {isLoading ? (
              <>
                <Zap className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Generate Catalog
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Tips */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2 text-primary">💡 Tips for better catalogs:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Include product name, features, and price</li>
              <li>• Mention materials, colors, and sizes</li>
              <li>• Add any special qualities or benefits</li>
              <li>• Include target audience or use cases</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}