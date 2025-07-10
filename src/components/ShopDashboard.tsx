
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store, Package, QrCode, BarChart3, Settings, Plus } from "lucide-react";
import { ShopProfile } from "@/components/ShopProfile";
import { ProductManager } from "@/components/ProductManager";
import { QRCodeGenerator } from "@/components/QRCodeGenerator";
import { OrdersView } from "@/components/OrdersView";

interface ShopDashboardProps {
  user: any;
  onLogout: () => void;
}

export const ShopDashboard = ({ user, onLogout }: ShopDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [shopData, setShopData] = useState({
    name: user.shopName || "My Shop",
    address: user.address || "",
    phone: user.phone || "",
    category: "General",
    description: ""
  });
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Sample Product",
      description: "This is a sample product to get you started",
      price: 29.99,
      stock: 50,
      category: "Electronics",
      sku: "SP001"
    }
  ]);

  const stats = {
    totalProducts: products.length,
    totalOrders: 12,
    revenue: 1247.50,
    lowStock: products.filter(p => p.stock < 10).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <Store className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{shopData.name}</h1>
                <p className="text-sm text-gray-600">Shop Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <Button onClick={onLogout} variant="outline">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="qrcodes" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              QR Codes
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{stats.totalProducts}</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.totalOrders}</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">${stats.revenue}</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Low Stock Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{stats.lowStock}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Products</CardTitle>
                  <CardDescription>Your latest added products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.slice(0, 3).map(product => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">${product.price}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks to manage your shop</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => setActiveTab("products")}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Product
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => setActiveTab("qrcodes")}
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    Generate QR Codes
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => setActiveTab("profile")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Update Shop Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products">
            <ProductManager products={products} setProducts={setProducts} />
          </TabsContent>

          <TabsContent value="qrcodes">
            <QRCodeGenerator shop={shopData} products={products} />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersView />
          </TabsContent>

          <TabsContent value="profile">
            <ShopProfile shopData={shopData} setShopData={setShopData} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
