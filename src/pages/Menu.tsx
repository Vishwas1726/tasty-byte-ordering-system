
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories, menuItems } from '@/lib/mockData';
import MenuItemCard from '@/components/MenuItemCard';
import { Search, Carrot } from 'lucide-react';

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [showOnlyVeg, setShowOnlyVeg] = useState(false);

  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (category) {
      setSelectedCategory(category);
    }
    
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  useEffect(() => {
    // Filter menu items based on category and search query
    let items = menuItems;
    
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );
    }
    
    if (showOnlyVeg) {
      items = items.filter(item => item.isVeg);
    }
    
    setFilteredItems(items);
    
    // Update search params
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (searchQuery) params.set('search', searchQuery);
    setSearchParams(params);
    
  }, [selectedCategory, searchQuery, showOnlyVeg, setSearchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchParams({ category });
  };

  const toggleVegFilter = () => {
    setShowOnlyVeg(!showOnlyVeg);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Menu</h1>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex-grow">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>
        <Button 
          onClick={toggleVegFilter}
          variant={showOnlyVeg ? "default" : "outline"}
          className={`flex items-center gap-2 ${showOnlyVeg ? 'bg-green-500 hover:bg-green-600' : 'border-green-500 text-green-500 hover:bg-green-50'}`}
        >
          <Carrot className="h-5 w-5" />
          Veg Only
        </Button>
      </div>
      
      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="mb-8">
        <TabsList className="w-full overflow-x-auto flex-nowrap whitespace-nowrap">
          <TabsTrigger value="all">All Items</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id}>{category.name}</TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={selectedCategory} className="mt-6">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map(item => (
                <MenuItemCard key={item.id} item={item} showOnlyVeg={showOnlyVeg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No items found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
              <Button onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setShowOnlyVeg(false);
                setSearchParams({});
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Menu;
