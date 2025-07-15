import { useState, useRef, useEffect } from "react";
import { Camera as CameraIcon, ArrowLeft, RotateCcw, Check, Image, SwitchCamera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const Camera = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  const startCamera = async () => {
    try {
      setIsCapturing(true);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      setStream(mediaStream);
      setHasPermission(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
      setIsCapturing(false);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setHasPermission(false);
      setIsCapturing(false);
      toast({
        title: "Camera Permission Required",
        description: "Please allow camera access to capture photos.",
        variant: "destructive",
      });
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
    
    setCapturedImage(imageDataUrl);
    
    // Stop the camera stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === "user" ? "environment" : "user");
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const proceedToDescription = () => {
    navigate("/description", { state: { image: capturedImage } });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-3">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-earth-brown">Capture Your Product</h1>
            <p className="text-muted-foreground">Take a clear photo of your product</p>
          </div>
        </div>

        {/* Camera Interface */}
        <Card className="bg-white shadow-warm">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Camera View Area */}
              <div className="relative bg-muted rounded-2xl overflow-hidden aspect-square flex items-center justify-center min-h-[400px]">
                {capturedImage ? (
                  <img
                    src={capturedImage}
                    alt="Captured product"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : hasPermission === false ? (
                  <div className="text-center space-y-4">
                    <div className="bg-destructive/10 rounded-full p-6 w-fit mx-auto">
                      <CameraIcon className="h-12 w-12 text-destructive" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-earth-brown">Camera Access Needed</h3>
                      <p className="text-muted-foreground text-sm max-w-xs">
                        Please allow camera permission to capture photos
                      </p>
                      <Button onClick={startCamera} variant="outline" size="sm">
                        Try Again
                      </Button>
                    </div>
                  </div>
                ) : stream ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <canvas ref={canvasRef} className="hidden" />
                    
                    {/* Camera Controls Overlay */}
                    <div className="absolute top-4 right-4">
                      <Button
                        onClick={switchCamera}
                        variant="ghost"
                        size="icon"
                        className="bg-black/20 hover:bg-black/40 text-white"
                      >
                        <SwitchCamera className="h-5 w-5" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="bg-gradient-primary rounded-full p-6 w-fit mx-auto">
                      <CameraIcon className="h-12 w-12 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-earth-brown">Initializing Camera...</h3>
                      <p className="text-muted-foreground text-sm max-w-xs">
                        Please wait while we access your camera
                      </p>
                    </div>
                  </div>
                )}
                
                {isCapturing && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      <p className="text-sm text-center mt-2">Starting camera...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {!capturedImage ? (
                  <Button
                    onClick={capturePhoto}
                    variant="create"
                    size="hero"
                    className="w-full"
                    disabled={!stream || isCapturing}
                  >
                    <CameraIcon className="h-6 w-6 mr-3" />
                    {!stream ? "Loading Camera..." : "Capture Photo"}
                  </Button>
                ) : (
                  <div className="flex space-x-3">
                    <Button
                      onClick={retakePhoto}
                      variant="outline"
                      size="lg"
                      className="flex-1"
                    >
                      <RotateCcw className="h-5 w-5 mr-2" />
                      Retake
                    </Button>
                    <Button
                      onClick={proceedToDescription}
                      variant="hero"
                      size="lg"
                      className="flex-1"
                    >
                      <Check className="h-5 w-5 mr-2" />
                      Continue
                    </Button>
                  </div>
                )}
              </div>

              {/* Tips */}
              <Card className="bg-cream border-warm-orange/20">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-earth-brown mb-2 flex items-center">
                    <Image className="h-4 w-4 mr-2" />
                    Photo Tips
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Ensure good lighting for best results</li>
                    <li>• Keep the product centered in the frame</li>
                    <li>• Use a clean, simple background</li>
                    <li>• Make sure all important details are visible</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Camera;