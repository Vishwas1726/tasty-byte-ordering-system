
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MenuItem } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = () => {
    addToCart(item, 1);
  };
  
  return (
    <Card 
      className={`overflow-hidden food-card-hover ${isHovered ? 'shadow-lg' : 'shadow'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Link to={`/menu/${item.id}`}>
          <img 
            src={item.image} 
            alt={item.name} 
            className="h-48 w-full object-cover transition-transform duration-300 ease-in-out"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
        </Link>
        {item.popular && (
          <Badge className="absolute top-2 right-2 bg-food text-white">Popular</Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/menu/${item.id}`} className="group">
            <h3 className="font-medium text-lg group-hover:text-food transition-colors">{item.name}</h3>
          </Link>
          <span className="font-bold text-food">${item.price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
        
        <Button onClick={handleAddToCart} className="w-full bg-food hover:bg-food-dark">
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
