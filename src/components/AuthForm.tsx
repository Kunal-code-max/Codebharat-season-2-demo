
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Mail, Lock, User, Phone, MapPin, Store } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthFormProps {
  mode: "login" | "register";
  userType?: "customer" | "shopkeeper";
  onAuth: (user: any) => void;
}

export const AuthForm = ({ mode, userType: propUserType, onAuth }: AuthFormProps) => {
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<"customer" | "shopkeeper">(propUserType || "customer");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    shopName: "",
    address: "",
    shopCategory: "General"
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate authentication
    setTimeout(() => {
      const userData = {
        id: Date.now(),
        email: formData.email,
        name: formData.name || formData.email.split("@")[0],
        phone: formData.phone,
        userType: userType,
        ...(userType === "shopkeeper" && {
          shopName: formData.shopName,
          address: formData.address,
          shopCategory: formData.shopCategory
        })
      };

      onAuth(userData);
      setLoading(false);
      
      toast({
        title: `Welcome ${userType === "shopkeeper" ? "Shop Owner" : "Customer"}!`,
        description: `You've successfully ${mode === "login" ? "signed in" : "registered"}.`,
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {mode === "login" ? "Sign In" : "Create Account"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {mode === "register" && (
          <Tabs value={userType} onValueChange={(value) => setUserType(value as "customer" | "shopkeeper")} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customer">
                <User className="mr-2 h-4 w-4" />
                Customer
              </TabsTrigger>
              <TabsTrigger value="shopkeeper">
                <Store className="mr-2 h-4 w-4" />
                Shop Owner
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {mode === "register" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {userType === "shopkeeper" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="shopName" className="flex items-center gap-2">
                      <Store className="h-4 w-4" />
                      Shop Name
                    </Label>
                    <Input
                      id="shopName"
                      name="shopName"
                      value={formData.shopName}
                      onChange={handleChange}
                      placeholder="My Awesome Shop"
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Shop Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main Street, City, State"
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}
            </>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-200"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === "login" ? "Signing In..." : "Creating Account..."}
              </>
            ) : (
              mode === "login" ? "Sign In" : "Create Account"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
