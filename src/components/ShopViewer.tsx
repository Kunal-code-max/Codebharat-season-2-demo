import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Store, Package, Phone, MapPin, Mail, ShoppingCart, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShopViewerProps {
  shopData: any;
  onBack?: () => void;
}

export const ShopViewer = ({ shopData, onBack }: ShopViewerProps) => {
  const [orderForm, setOrderForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    items: [] as any[],
    notes: ""
  });
  const [showOrderForm, setShowOrderForm] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (product: any) => {
    setOrderForm(prev => ({
      ...prev,
      items: [...prev.items.filter(item => item.id !== product.id), { ...product, quantity: 1 }]
    }));
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your order.`,
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setOrderForm(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== productId)
    }));
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setOrderForm(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    }));
  };

  const handleSubmitOrder = () => {
    if (!orderForm.customerName || !orderForm.phone || orderForm.items.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name, phone number, and select at least one item.",
        variant: "destructive"
      });
      return;
    }

    // Calculate total
    const total = orderForm.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    toast({
      title: "Order Submitted!",
      description: `Your order of $${total.toFixed(2)} has been sent to ${shopData.shopName}. They will contact you soon.`,
    });

    // Reset form
    setOrderForm({
      customerName: "",
      phone: "",
      email: "",
      address: "",
      items: [],
      notes: ""
    });
    setShowOrderForm(false);
  };

  const totalAmount = orderForm.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {onBack && (
                <Button onClick={onBack} variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <Store className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{shopData.shopName}</h1>
                <p className="text-sm text-gray-600">Shop Information</p>
              </div>
            </div>
            {orderForm.items.length > 0 && (
              <Button 
                onClick={() => setShowOrderForm(true)}
                className="bg-gradient-to-r from-blue-600 to-green-600"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Cart ({orderForm.items.length})
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Shop Information */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              {shopData.shopName}
            </CardTitle>
            <CardDescription>{shopData.description || "Welcome to our shop!"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{shopData.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{shopData.phone}</span>
                </div>
              </div>
              <div>
                <Badge className="mb-2">{shopData.category}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Package className="h-6 w-6" />
            Available Products
          </h2>

          {shopData.products && shopData.products.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shopData.products.map((product: any) => (
                <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-green-600">${product.price}</span>
                        <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Category: {product.category}</p>
                      {product.sku && (
                        <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                      )}
                      
                      {product.stock > 0 && (
                        <Button 
                          onClick={() => handleAddToCart(product)}
                          className="w-full bg-gradient-to-r from-blue-600 to-green-600"
                          disabled={orderForm.items.some(item => item.id === product.id)}
                        >
                          {orderForm.items.some(item => item.id === product.id) ? "Added to Cart" : "Add to Cart"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-0 shadow-lg">
              <CardContent className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Available</h3>
                <p className="text-gray-600">This shop hasn't added any products yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Place Your Order</CardTitle>
              <CardDescription>Fill in your details to complete the order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Items */}
              <div>
                <Label>Order Items:</Label>
                <div className="space-y-2 mt-2">
                  {orderForm.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div className="flex-1">
                        <span className="font-medium">{item.name}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span>{item.quantity}</span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="text-right font-bold text-lg">
                    Total: ${totalAmount.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-2">
                <Label htmlFor="customerName">Full Name *</Label>
                <Input
                  id="customerName"
                  value={orderForm.customerName}
                  onChange={(e) => setOrderForm(prev => ({ ...prev, customerName: e.target.value }))}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={orderForm.phone}
                  onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Your phone number"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={orderForm.email}
                  onChange={(e) => setOrderForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea
                  id="address"
                  value={orderForm.address}
                  onChange={(e) => setOrderForm(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Your delivery address"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={orderForm.notes}
                  onChange={(e) => setOrderForm(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any special instructions or notes"
                  rows={2}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowOrderForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmitOrder}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-green-600"
                >
                  Submit Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};