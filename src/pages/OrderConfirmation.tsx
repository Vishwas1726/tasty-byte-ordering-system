
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';
import { useOrder } from '@/contexts/OrderContext';

const OrderConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrderById } = useOrder();
  const order = getOrderById(id || '');
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <p className="mb-8">We couldn't find the order you're looking for.</p>
        <Link to="/menu">
          <Button>Return to Menu</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-6">Thank you for your order</p>
        
        <div className="bg-gray-50 p-4 rounded-md mb-8">
          <p className="text-gray-700 mb-1">Order ID: <span className="font-medium">{order.id}</span></p>
          <p className="text-gray-700">Order Date: <span className="font-medium">
            {new Date(order.createdAt).toLocaleString()}
          </span></p>
        </div>
        
        <div className="text-left mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center">
                  <span className="font-medium mr-2">{item.quantity}x</span>
                  <span>{item.name}</span>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            
            <div className="flex justify-between items-center pt-2 font-bold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="text-left mb-8">
          <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
          
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {order.contactDetails.name}</p>
            <p><span className="font-medium">Phone:</span> {order.contactDetails.phone}</p>
            <p><span className="font-medium">Address:</span> {order.contactDetails.address}</p>
            {order.contactDetails.notes && (
              <p><span className="font-medium">Notes:</span> {order.contactDetails.notes}</p>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/orders">
            <Button variant="outline">
              View All Orders
            </Button>
          </Link>
          <Link to="/menu">
            <Button className="bg-food hover:bg-food-dark">
              Order Again
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
