
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, QrCode, Store, Scan, UserPlus, LogIn, User } from "lucide-react";
import { AuthForm } from "@/components/AuthForm";
import { ShopDashboard } from "@/components/ShopDashboard";
import { CustomerScanner } from "@/components/CustomerScanner";
import { CustomerDashboard } from "@/components/CustomerDashboard";
import { ShopViewer } from "@/components/ShopViewer";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [user, setUser] = useState(null);
  const [activeView, setActiveView] = useState("home");
  const [shopData, setShopData] = useState(null);
  const { toast } = useToast();

  // Check for shop parameter in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shopParam = urlParams.get('shop');
    
    if (shopParam) {
      try {
        const decodedShopData = JSON.parse(decodeURIComponent(shopParam));
        setShopData(decodedShopData);
        setActiveView("shop-viewer");
      } catch (error) {
        console.error('Error parsing shop data:', error);
        toast({
          title: "Invalid Link",
          description: "The shop link appears to be corrupted. Please try scanning the QR code again.",
          variant: "destructive"
        });
      }
    }
  }, [toast]);

  const handleAuth = (userData) => {
    setUser(userData);
    if (userData.userType === "shopkeeper") {
      setActiveView("shop-dashboard");
    } else {
      setActiveView("customer-dashboard");
    }
    toast({
      title: "Welcome to ScanCart!",
      description: `You're now logged in as a ${userData.userType}.`,
    });
  };

  const handleLogout = () => {
    setUser(null);
    setActiveView("home");
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  if (activeView === "shop-dashboard" && user?.userType === "shopkeeper") {
    return <ShopDashboard user={user} onLogout={handleLogout} />;
  }

  if (activeView === "customer-dashboard" && user?.userType === "customer") {
    return <CustomerDashboard user={user} onLogout={handleLogout} />;
  }

  if (activeView === "scanner") {
    return <CustomerScanner onBack={() => setActiveView("home")} />;
  }

  if (activeView === "shop-viewer" && shopData) {
    return <ShopViewer shopData={shopData} onBack={() => setActiveView("home")} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  ScanCart
                </h1>
                <p className="text-sm text-gray-600">Smart QR Shopping Solution</p>
              </div>
            </div>
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user.name} ({user.userType})
                </span>
                <Button onClick={handleLogout} variant="outline">
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeView === "home" && (
          <>
            {/* Hero Section */}
            <section className="text-center mb-12">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                  Bridge Your Shop to the
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    {" "}Digital World
                  </span>
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Generate QR codes for your products and shop. Let customers scan, browse, and order with ease.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => setActiveView("scanner")}
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  >
                    <Scan className="mr-2 h-5 w-5" />
                    Scan QR Code
                  </Button>
                </div>
              </div>
            </section>

            {/* Features Grid */}
            <section className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Store className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Manage Your Shop</CardTitle>
                  <CardDescription>
                    Create your shop profile and add products with detailed information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Shop profile management</li>
                    <li>• Product catalog</li>
                    <li>• Inventory tracking</li>
                    <li>• Order management</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <QrCode className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>Generate QR Codes</CardTitle>
                  <CardDescription>
                    Create unique QR codes for each product and your shop
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Product QR codes</li>
                    <li>• Shop QR codes</li>
                    <li>• Secure encoding</li>
                    <li>• Print-ready formats</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Scan className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle>Easy Scanning</CardTitle>
                  <CardDescription>
                    Customers can scan and order directly from their phones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Camera scanning</li>
                    <li>• Product details</li>
                    <li>• Order placement</li>
                    <li>• Contact information</li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Auth Section */}
            <section className="max-w-md mx-auto">
              <Tabs defaultValue="customer-login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="customer-login">
                    <User className="mr-2 h-4 w-4" />
                    Customer
                  </TabsTrigger>
                  <TabsTrigger value="shopkeeper-login">
                    <Store className="mr-2 h-4 w-4" />
                    Shop Owner
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="customer-login">
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="login">
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </TabsTrigger>
                      <TabsTrigger value="register">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Register
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                      <AuthForm mode="login" userType="customer" onAuth={handleAuth} />
                    </TabsContent>
                    <TabsContent value="register">
                      <AuthForm mode="register" userType="customer" onAuth={handleAuth} />
                    </TabsContent>
                  </Tabs>
                </TabsContent>
                <TabsContent value="shopkeeper-login">
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="login">
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </TabsTrigger>
                      <TabsTrigger value="register">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Register
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                      <AuthForm mode="login" userType="shopkeeper" onAuth={handleAuth} />
                    </TabsContent>
                    <TabsContent value="register">
                      <AuthForm mode="register" userType="shopkeeper" onAuth={handleAuth} />
                    </TabsContent>
                  </Tabs>
                </TabsContent>
              </Tabs>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
