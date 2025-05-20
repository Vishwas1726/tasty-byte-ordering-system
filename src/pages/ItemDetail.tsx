
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { menuItems } from '@/lib/mockData';
import { useCart } from '@/contexts/CartContext';
import MenuItemCard from '@/components/MenuItemCard';

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [relatedItems, setRelatedItems] = useState([]);
  
  const menuItem = menuItems.find(item => item.id === id);
  
  useEffect(() => {
    // If item not found, redirect to menu page
    if (!menuItem) {
      navigate('/menu');
      return;
    }
    
    // Get related items from same category
    const related = menuItems
      .filter(item => item.category === menuItem.category && item.id !== menuItem.id)
      .slice(0, 3);
    
    setRelatedItems(related);
  }, [menuItem, navigate, id]);
  
  if (!menuItem) {
    return null; // Will redirect in useEffect
  }
  
  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));
  
  const handleAddToCart = () => {
    addToCart(menuItem, quantity);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        ← Back
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <img 
            src={menuItem.image} 
            alt={menuItem.name} 
            className="w-full h-auto rounded-lg shadow-md object-cover aspect-square"
          />
          {menuItem.popular && (
            <Badge className="absolute top-4 right-4 bg-food text-white">Popular</Badge>
          )}
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{menuItem.name}</h1>
          <p className="text-2xl font-bold text-food mb-4">${menuItem.price.toFixed(2)}</p>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{menuItem.description}</p>
          </div>
          
          <Card className="p-4 mb-6">
            <div className="flex items-center mb-4">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="mx-4 w-8 text-center font-medium">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={incrementQuantity}
              >
                +
              </Button>
            </div>
            
            <Button 
              onClick={handleAddToCart} 
              className="w-full bg-food hover:bg-food-dark"
            >
              Add to Cart - ${(menuItem.price * quantity).toFixed(2)}
            </Button>
          </Card>
          
          {/* Additional details could go here */}
        </div>
      </div>
      
      {/* Related Items */}
      {relatedItems.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedItems.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
