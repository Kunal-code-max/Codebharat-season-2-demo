
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Scan, History, ShoppingBag } from "lucide-react";
import { CustomerScanner } from "@/components/CustomerScanner";

interface CustomerDashboardProps {
  user: any;
  onLogout: () => void;
}

export const CustomerDashboard = ({ user, onLogout }: CustomerDashboardProps) => {
  const [activeView, setActiveView] = useState("dashboard");

  if (activeView === "scanner") {
    return <CustomerScanner onBack={() => setActiveView("dashboard")} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Customer Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={onLogout} variant="outline">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Scan */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scan className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>Scan QR Code</CardTitle>
              <CardDescription>
                Scan shop or product QR codes to view details and place orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setActiveView("scanner")}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600"
              >
                <Scan className="mr-2 h-4 w-4" />
                Start Scanning
              </Button>
            </CardContent>
          </Card>

          {/* Order History */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <History className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View your past orders and track current ones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-gray-500">
                <p>No orders yet</p>
                <p className="text-sm mt-2">Start scanning to place your first order!</p>
              </div>
            </CardContent>
          </Card>

          {/* Profile */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Manage your account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">
                <strong>Name:</strong> {user.name}
              </div>
              <div className="text-sm">
                <strong>Email:</strong> {user.email}
              </div>
              <div className="text-sm">
                <strong>Phone:</strong> {user.phone}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
