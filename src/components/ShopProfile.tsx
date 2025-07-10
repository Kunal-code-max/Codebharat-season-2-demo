
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Store, MapPin, Phone, Mail, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShopProfileProps {
  shopData: any;
  setShopData: (data: any) => void;
}

export const ShopProfile = ({ shopData, setShopData }: ShopProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(shopData);
  const { toast } = useToast();

  const categories = [
    "General", "Electronics", "Clothing", "Food & Beverage", 
    "Health & Beauty", "Home & Garden", "Sports", "Books", "Toys"
  ];

  const handleSave = () => {
    setShopData(formData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your shop profile has been successfully updated.",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            Shop Profile
          </CardTitle>
          <CardDescription>
            Manage your shop information and settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <Store className="h-4 w-4" />
                Shop Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                disabled={!isEditing}
                className="transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange("category", value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Address
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="123 Main Street, City, State, ZIP"
              disabled={!isEditing}
              className="transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              disabled={!isEditing}
              className="transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Shop Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Tell customers about your shop..."
              disabled={!isEditing}
              rows={4}
              className="transition-all duration-200"
            />
          </div>

          <div className="flex gap-4">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="flex-1">
                Edit Profile
              </Button>
            ) : (
              <>
                <Button onClick={handleSave} className="flex-1">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFormData(shopData);
                    setIsEditing(false);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
