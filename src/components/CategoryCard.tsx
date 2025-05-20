
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Category } from '@/lib/types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/menu?category=${category.id}`}>
      <Card className="overflow-hidden food-card-hover h-full">
        <div className="relative h-40">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl">{category.name}</h3>
        </div>
        
        <CardContent className="p-4">
          <p className="text-gray-600 text-sm">{category.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
