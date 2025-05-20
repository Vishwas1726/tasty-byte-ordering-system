
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from '@/contexts/CartContext';
import { useOrder } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import CartItemCard from '@/components/CartItemCard';
import OrderSummary from '@/components/OrderSummary';
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { placeOrder } = useOrder();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactDetails, setContactDetails] = useState({
    name: user?.name || '',
    phone: '',
    address: '',
    notes: ''
  });
  
  // Redirect if cart is empty
  if (cartItems.length === 0) {
    navigate('/menu');
    return null;
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactDetails.name || !contactDetails.phone || !contactDetails.address) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      setIsSubmitting(true);
      const orderId = await placeOrder(cartItems, getCartTotal(), contactDetails);
      clearCart();
      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      toast.error("An error occurred while placing your order");
      console.error("Order placement error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name *</label>
                  <Input
                    id="name"
                    name="name"
                    value={contactDetails.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number *</label>
                  <Input
                    id="phone"
                    name="phone"
                    value={contactDetails.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-1">Delivery Address *</label>
                  <Input
                    id="address"
                    name="address"
                    value={contactDetails.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium mb-1">Order Notes</label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={contactDetails.notes}
                    onChange={handleChange}
                    placeholder="Special instructions, allergies, etc."
                    className="resize-none"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Items</h2>
              
              <div className="space-y-4">
                {cartItems.map(item => (
                  <CartItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
            
            <div className="lg:hidden">
              <OrderSummary showCheckoutButton={false} />
            </div>
            
            <div className="mt-6">
              <Button 
                type="submit" 
                className="w-full bg-food hover:bg-food-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Placing Order...' : 'Place Order'}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="hidden lg:block">
          <OrderSummary showCheckoutButton={false} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
