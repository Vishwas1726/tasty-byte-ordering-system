
import { useCart } from '@/contexts/CartContext';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from 'react-router-dom';

interface OrderSummaryProps {
  showCheckoutButton?: boolean;
}

const OrderSummary = ({ showCheckoutButton = true }: OrderSummaryProps) => {
  const { getCartTotal } = useCart();
  
  const subtotal = getCartTotal();
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;
  
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (5%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        {/* We could add more items like delivery fee here */}
        
        <Separator className="my-2" />
        
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      {showCheckoutButton && (
        <div className="mt-6">
          <Link to="/checkout">
            <Button className="w-full bg-food hover:bg-food-dark">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
