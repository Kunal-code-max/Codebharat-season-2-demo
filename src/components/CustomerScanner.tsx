
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Camera, Search, ShoppingCart, MapPin, Phone, Store, Share2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CustomerScannerProps {
  onBack: () => void;
}

export const CustomerScanner = ({ onBack }: CustomerScannerProps) => {
  const [scanResult, setScanResult] = useState(null);
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: ""
  });
  const [showOrderForm, setShowOrderForm] = useState(false);
  const { toast } = useToast();

  // Mock scan results for demonstration
  const mockScanResults = {
    product: {
      type: "product",
      id: 1,
      name: "Sample Product",
      description: "This is a sample product with great features and quality.",
      price: 29.99,
      stock: 50,
      category: "Electronics",
      shop: {
        name: "Tech Store",
        address: "123 Main Street, Springfield, IL 62701",
        phone: "+1 (555) 123-4567",
        category: "Electronics"
      }
    },
    shop: {
      type: "shop",
      name: "Tech Store",
      address: "123 Main Street, Springfield, IL 62701",
      phone: "+1 (555) 123-4567",
      category: "Electronics",
      description: "Your one-stop shop for all electronics and gadgets.",
      products: [
        { id: 1, name: "Sample Product", price: 29.99, stock: 50 },
        { id: 2, name: "Another Product", price: 19.99, stock: 25 },
        { id: 3, name: "Third Product", price: 39.99, stock: 30 }
      ]
    }
  };

  const handleScanDemo = (type: 'product' | 'shop') => {
    setScanResult(mockScanResults[type]);
    toast({
      title: "QR Code Scanned",
      description: `Successfully scanned ${type} QR code!`,
    });
  };

  const handleShareShop = (shopData: any) => {
    // Create a shareable web link
    const encodedData = encodeURIComponent(JSON.stringify(shopData));
    const webLink = `${window.location.origin}/?shop=${encodedData}`;
    
    navigator.clipboard.writeText(webLink);
    toast({
      title: "Link Copied!",
      description: "Shop link has been copied to clipboard. Share it with others!",
    });
  };

  const handleOpenWebView = (shopData: any) => {
    // Open the shop in web view within the same window
    const encodedData = encodeURIComponent(JSON.stringify(shopData));
    const webLink = `${window.location.origin}/?shop=${encodedData}`;
    window.open(webLink, '_blank');
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Order Placed Successfully!",
      description: "Your order has been sent to the shop owner. They will contact you soon.",
    });
    setShowOrderForm(false);
    setOrderForm({ name: "", phone: "", address: "", notes: "" });
  };

  const handleFormChange = (field: string, value: string) => {
    setOrderForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">QR Scanner</h1>
                <p className="text-sm text-gray-600">Scan to discover products</p>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!scanResult ? (
          /* Scanner Interface */
          <div className="max-w-md mx-auto space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Scan QR Code</CardTitle>
                <CardDescription>
                  Point your camera at a QR code to view product or shop details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Mock Camera View */}
                <div className="aspect-square bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="text-white text-center">
                    <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm opacity-75">Camera view would appear here</p>
                  </div>
                  
                  {/* Scanning overlay */}
                  <div className="absolute inset-4 border-2 border-white/50 rounded-lg">
                    <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-blue-400"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-blue-400"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-blue-400"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-blue-400"></div>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">
                    Position the QR code within the frame
                  </p>
                  <p className="text-xs text-gray-500">
                    Make sure the code is clearly visible and well-lit
                  </p>
                </div>

                {/* Demo Buttons */}
                <div className="space-y-3 pt-4 border-t">
                  <p className="text-sm font-medium text-gray-700 text-center">Try Demo Scans:</p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleScanDemo('product')}
                      variant="outline"
                      className="flex-1"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Demo Product
                    </Button>
                    <Button
                      onClick={() => handleScanDemo('shop')}
                      variant="outline"
                      className="flex-1"
                    >
                      <Store className="mr-2 h-4 w-4" />
                      Demo Shop
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : showOrderForm ? (
          /* Order Form */
          <div className="max-w-md mx-auto">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Place Your Order</CardTitle>
                <CardDescription>
                  Fill in your details to place an order for {scanResult.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={orderForm.name}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={orderForm.phone}
                      onChange={(e) => handleFormChange("phone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address</Label>
                    <Textarea
                      id="address"
                      value={orderForm.address}
                      onChange={(e) => handleFormChange("address", e.target.value)}
                      placeholder="123 Main Street, City, State, ZIP"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Special Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={orderForm.notes}
                      onChange={(e) => handleFormChange("notes", e.target.value)}
                      placeholder="Any special instructions or requests..."
                      rows={2}
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-green-600">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Place Order
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowOrderForm(false)}
                    >
                      Back
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Scan Results */
          <div className="max-w-2xl mx-auto space-y-6">
            {scanResult.type === 'product' ? (
              /* Product Details */
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{scanResult.name}</CardTitle>
                      <CardDescription className="mt-2">{scanResult.description}</CardDescription>
                    </div>
                    <Badge variant={scanResult.stock > 0 ? "default" : "destructive"}>
                      {scanResult.stock > 0 ? `${scanResult.stock} in stock` : "Out of stock"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-green-600">${scanResult.price}</span>
                    <Badge variant="outline">{scanResult.category}</Badge>
                  </div>

                  {/* Shop Information */}
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Store className="h-4 w-4" />
                      Shop Information
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <p className="font-medium">{scanResult.shop.name}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {scanResult.shop.address}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        {scanResult.shop.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowOrderForm(true)}
                      disabled={scanResult.stock === 0}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-green-600"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Order Now
                    </Button>
                    <Button variant="outline" onClick={() => setScanResult(null)}>
                      Scan Another
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* Shop Details */
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Store className="h-6 w-6" />
                    {scanResult.name}
                  </CardTitle>
                  <CardDescription>{scanResult.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      {scanResult.address}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      {scanResult.phone}
                    </p>
                    <Badge variant="outline">{scanResult.category}</Badge>
                  </div>

                  {/* Products List */}
                  <div>
                    <h3 className="font-semibold mb-3">Available Products</h3>
                    <div className="grid gap-3">
                      {scanResult.products.map(product => (
                        <div key={product.id} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-600">{product.stock} in stock</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">${product.price}</p>
                            <Button size="sm" variant="outline">
                              Order
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleOpenWebView(scanResult)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-green-600"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open in Browser
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleShareShop(scanResult)}
                      className="flex-1"
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Link
                    </Button>
                  </div>

                  <Button variant="outline" onClick={() => setScanResult(null)} className="w-full">
                    Scan Another Code
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
