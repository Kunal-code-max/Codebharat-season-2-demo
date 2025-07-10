import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Download, Store, Package, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QRCodeGeneratorProps {
  shop: any;
  products: any[];
}

export const QRCodeGenerator = ({ shop, products }: QRCodeGeneratorProps) => {
  const [generatedQRs, setGeneratedQRs] = useState<{[key: string]: string}>({});
  const [copiedIds, setCopiedIds] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();

  const generateShopQRData = (shopData: any) => {
    const shopInfo = {
      type: "shop",
      shopId: shopData.id || "shop123",
      shopName: shopData.name,
      address: shopData.address,
      phone: shopData.phone,
      category: shopData.category,
      description: shopData.description,
      products: products.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        description: p.description,
        stock: p.stock,
        category: p.category
      }))
    };

    // Create a web link with encoded data
    const encodedData = encodeURIComponent(JSON.stringify(shopInfo));
    const webLink = `${window.location.origin}/?shop=${encodedData}`;
    
    return `${webLink}\n\nShop: ${shopData.name}\nAddress: ${shopData.address}\nPhone: ${shopData.phone}`;
  };

  const generateProductQRData = (product: any, shopData: any) => {
    return JSON.stringify({
      type: "product",
      productId: product.id,
      productName: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
      category: product.category,
      sku: product.sku,
      shop: {
        name: shopData.name,
        address: shopData.address,
        phone: shopData.phone,
        category: shopData.category
      }
    });
  };

  const generateQRCode = async (type: 'shop' | 'product', data: any) => {
    let qrData;
    
    if (type === 'shop') {
      qrData = generateShopQRData(data);
    } else {
      qrData = generateProductQRData(data, shop);
    }
    
    // Using a QR code API service with the JSON data
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
    
    const key = `${type}-${data.id || 'shop'}`;
    setGeneratedQRs(prev => ({
      ...prev,
      [key]: qrCodeUrl
    }));

    toast({
      title: "QR Code Generated",
      description: `QR code for ${type === 'shop' ? shop.name : data.name} has been created with complete ${type} information.`,
    });
  };

  const downloadQRCode = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${filename}-qr-code.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      
      toast({
        title: "Downloaded",
        description: "QR code has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download QR code. Please try again.",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIds(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedIds(prev => ({ ...prev, [id]: false }));
      }, 2000);
      
      toast({
        title: "Copied",
        description: "QR code link copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive"
      });
    }
  };

  const shopQRKey = 'shop-shop';
  const shopQRUrl = generatedQRs[shopQRKey];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">QR Code Generator</h2>
        <p className="text-gray-600">Generate QR codes containing complete shop and product information</p>
      </div>

      {/* Shop QR Code */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            Shop QR Code
          </CardTitle>
          <CardDescription>
            Generate a master QR code with your shop details and all products - customers will see everything when they scan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{shop.name}</h4>
                <p className="text-sm text-gray-600 mb-1">{shop.address}</p>
                <p className="text-sm text-gray-600 mb-2">{shop.phone}</p>
                <Badge className="mb-2">{shop.category}</Badge>
                <p className="text-xs text-gray-500">
                  Will include all {products.length} products in QR code
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => generateQRCode('shop', { id: 'shop123', ...shop })}
                  className="bg-gradient-to-r from-blue-600 to-green-600"
                >
                  <QrCode className="mr-2 h-4 w-4" />
                  Generate Master Shop QR
                </Button>
                
                {shopQRUrl && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => downloadQRCode(shopQRUrl, shop.name)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => copyToClipboard(shopQRUrl, 'shop')}
                    >
                      {copiedIds['shop'] ? (
                        <Check className="mr-2 h-4 w-4" />
                      ) : (
                        <Copy className="mr-2 h-4 w-4" />
                      )}
                      {copiedIds['shop'] ? 'Copied!' : 'Copy Link'}
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            {shopQRUrl && (
              <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300">
                <img 
                  src={shopQRUrl} 
                  alt="Shop QR Code" 
                  className="w-48 h-48 object-contain"
                />
                <p className="text-xs text-gray-500 text-center mt-2">Master Shop QR Code</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

    </div>
  );
};
