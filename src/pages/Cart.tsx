
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useCart } from '@/contexts/CartContext';
import CartItemCard from '@/components/CartItemCard';
import OrderSummary from '@/components/OrderSummary';

const Cart = () => {
  const { cartItems, clearCart, getCartTotal } = useCart();
  const isEmpty = cartItems.length === 0;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      {isEmpty ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Add some delicious items to get started</p>
          <Link to="/menu">
            <Button className="bg-food hover:bg-food-dark">
              Browse Menu
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </h2>
              <Button variant="ghost" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
            
            <div className="space-y-4">
              {cartItems.map(item => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
          
          <div>
            <OrderSummary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
