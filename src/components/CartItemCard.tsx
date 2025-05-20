
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CartItem } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Trash } from 'lucide-react';

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard = ({ item }: CartItemCardProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
      updateQuantity(item.id, newQuantity);
    }
  };
  
  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(item.id, newQuantity);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(item.id, newQuantity);
    } else {
      // If quantity is 1 and user presses minus, remove the item
      removeFromCart(item.id);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(item.id);
  };
  
  return (
    <div className="flex flex-col sm:flex-row border rounded-lg p-4 mb-4">
      <div className="sm:w-24 sm:h-24 mb-4 sm:mb-0 flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      
      <div className="flex-grow sm:ml-4">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-1">{item.description}</p>
          </div>
          
          <div className="mt-2 sm:mt-0 text-right">
            <p className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
            <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} each</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
          <div className="flex items-center mb-2 sm:mb-0">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full" 
              onClick={decrementQuantity}
            >
              -
            </Button>
            
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="h-8 w-16 text-center mx-2 border rounded-md"
            />
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full" 
              onClick={incrementQuantity}
            >
              +
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-500 hover:text-red-700 hover:bg-red-50" 
            onClick={handleRemove}
          >
            <Trash className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
