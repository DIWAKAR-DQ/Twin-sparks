import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera as CameraIcon, RotateCcw, Check, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function Camera() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const startCamera = useCallback(async () => {
    try {
      setIsLoading(true);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Prefer back camera on mobile
        }
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
      
      toast({
        title: "Camera ready!",
        description: "Position your product and tap capture when ready.",
      });
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas dimensions to video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to base64
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageDataUrl);

    // Stop camera stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }

    toast({
      title: "Photo captured!",
      description: "Great shot! You can retake or continue to add description.",
    });
  }, [stream, toast]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  const proceedToDescription = useCallback(() => {
    if (capturedImage) {
      // Store image in localStorage for the next page
      localStorage.setItem('capturedProductImage', capturedImage);
      navigate('/description');
    }
  }, [capturedImage, navigate]);

  const handleCancel = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    navigate('/');
  }, [stream, navigate]);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gradient">Capture Your Product</h1>
          <p className="text-muted-foreground">
            Take a clear photo of your product to create an amazing catalog
          </p>
        </div>

        {/* Camera Container */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden">
              {!stream && !capturedImage && (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                    <CameraIcon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold">Ready to capture?</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll need camera permission to take photos
                    </p>
                  </div>
                  <Button 
                    onClick={startCamera}
                    disabled={isLoading}
                    className="btn-hero"
                  >
                    {isLoading ? (
                      <>
                        <Zap className="w-5 h-5 mr-2 animate-spin" />
                        Starting Camera...
                      </>
                    ) : (
                      <>
                        <CameraIcon className="w-5 h-5 mr-2" />
                        Start Camera
                      </>
                    )}
                  </Button>
                </div>
              )}

              {stream && !capturedImage && (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                />
              )}

              {capturedImage && (
                <img
                  src={capturedImage}
                  alt="Captured product"
                  className="w-full h-full object-cover"
                />
              )}

              {/* Camera overlay */}
              {stream && !capturedImage && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-4 border-2 border-white/50 rounded-lg">
                    <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-white rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-white rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-white rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-white rounded-br-lg"></div>
                  </div>
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                    Position your product in the frame
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          {stream && !capturedImage && (
            <>
              <Button variant="outline" onClick={handleCancel} size="lg">
                <X className="w-5 h-5 mr-2" />
                Cancel
              </Button>
              <Button onClick={capturePhoto} className="btn-hero">
                <CameraIcon className="w-6 h-6 mr-2" />
                Capture Photo
              </Button>
            </>
          )}

          {capturedImage && (
            <>
              <Button variant="outline" onClick={retakePhoto} size="lg">
                <RotateCcw className="w-5 h-5 mr-2" />
                Retake
              </Button>
              <Button onClick={proceedToDescription} className="btn-hero">
                <Check className="w-5 h-5 mr-2" />
                Continue
              </Button>
            </>
          )}

          {!stream && !capturedImage && (
            <Button variant="outline" onClick={handleCancel} size="lg">
              <X className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          )}
        </div>

        {/* Hidden canvas for image capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}