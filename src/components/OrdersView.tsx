
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingBag, Calendar, Phone, MapPin, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react";

export const OrdersView = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Mock orders data
  const orders = [
    {
      id: 1,
      customerName: "John Doe",
      customerPhone: "+1 (555) 123-4567",
      customerAddress: "123 Oak Street, Springfield, IL 62701",
      items: [
        { name: "Sample Product", quantity: 2, price: 29.99 }
      ],
      total: 59.98,
      status: "pending",
      date: "2024-01-15T10:30:00Z",
      notes: "Please deliver after 2 PM"
    },
    {
      id: 2,
      customerName: "Jane Smith",
      customerPhone: "+1 (555) 987-6543",
      customerAddress: "456 Pine Avenue, Springfield, IL 62702",
      items: [
        { name: "Sample Product", quantity: 1, price: 29.99 }
      ],
      total: 29.99,
      status: "completed",
      date: "2024-01-14T14:15:00Z",
      notes: ""
    },
    {
      id: 3,
      customerName: "Mike Johnson",
      customerPhone: "+1 (555) 456-7890",
      customerAddress: "789 Elm Drive, Springfield, IL 62703",
      items: [
        { name: "Sample Product", quantity: 3, price: 29.99 }
      ],
      total: 89.97,
      status: "processing",
      date: "2024-01-15T16:45:00Z",
      notes: "Customer prefers contactless delivery"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "processing":
        return <AlertCircle className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "processing":
        return "default";
      case "completed":
        return "default";
      default:
        return "secondary";
    }
  };

  const filteredOrders = filterStatus === "all" 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Orders Management</h2>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-xl font-bold">{orders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-bold">{orders.filter(o => o.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Processing</p>
                <p className="text-xl font-bold">{orders.filter(o => o.status === 'processing').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-bold">{orders.filter(o => o.status === 'completed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <div className="grid gap-4">
        {filteredOrders.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ShoppingBag className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Found</h3>
              <p className="text-gray-600 text-center">
                {filterStatus === "all" 
                  ? "You haven't received any orders yet. Share your QR codes to start getting orders!"
                  : `No orders with status "${filterStatus}" found.`
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map(order => (
            <Card key={order.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(order.date)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold mb-2">Customer Information</h4>
                      <div className="space-y-1 text-sm">
                        <p className="font-medium">{order.customerName}</p>
                        <p className="flex items-center gap-2 text-gray-600">
                          <Phone className="h-3 w-3" />
                          {order.customerPhone}
                        </p>
                        <p className="flex items-start gap-2 text-gray-600">
                          <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          {order.customerAddress}
                        </p>
                      </div>
                    </div>
                    
                    {order.notes && (
                      <div>
                        <h4 className="font-semibold mb-1">Special Notes</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          {order.notes}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold mb-2">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                            <span>{item.name} x{item.quantity}</span>
                            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center font-semibold">
                        <span>Total</span>
                        <span className="text-lg text-green-600">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="mr-2 h-3 w-3" />
                        View Details
                      </Button>
                      {order.status === "pending" && (
                        <Button size="sm" className="flex-1">
                          Mark Processing
                        </Button>
                      )}
                      {order.status === "processing" && (
                        <Button size="sm" className="flex-1">
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
