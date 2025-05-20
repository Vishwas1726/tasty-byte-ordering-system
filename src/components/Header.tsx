
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Menu, User, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const cartItemCount = getCartCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-bold text-2xl text-food-dark">
            Delicious<span className="text-food">Eats</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-food font-medium">
              Home
            </Link>
            <Link to="/menu" className="text-gray-700 hover:text-food font-medium">
              Menu
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-food font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-food font-medium">
              Contact
            </Link>
          </nav>

          {/* Search, Cart, User Section */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 pl-9"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </form>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-food text-white">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {user ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Account</SheetTitle>
                  </SheetHeader>
                  <div className="py-6 space-y-4">
                    <div className="font-medium">Hello, {user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                    
                    <div className="space-y-2">
                      <SheetClose asChild>
                        <Link to="/profile" className="block w-full">
                          <Button variant="outline" className="w-full justify-start">
                            Profile
                          </Button>
                        </Link>
                      </SheetClose>
                      
                      <SheetClose asChild>
                        <Link to="/orders" className="block w-full">
                          <Button variant="outline" className="w-full justify-start">
                            My Orders
                          </Button>
                        </Link>
                      </SheetClose>
                      
                      {user.role === 'admin' && (
                        <SheetClose asChild>
                          <Link to="/admin" className="block w-full">
                            <Button variant="outline" className="w-full justify-start">
                              Admin Panel
                            </Button>
                          </Link>
                        </SheetClose>
                      )}
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button variant="default" onClick={logout} className="w-full">
                        Logout
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ) : (
              <Link to="/login">
                <Button variant="default" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-food text-white">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </form>
            
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-700 hover:text-food py-2" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/menu" className="text-gray-700 hover:text-food py-2" onClick={() => setMobileMenuOpen(false)}>
                Menu
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-food py-2" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-food py-2" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              
              {user ? (
                <>
                  <Link to="/profile" className="text-gray-700 hover:text-food py-2" onClick={() => setMobileMenuOpen(false)}>
                    Profile
                  </Link>
                  <Link to="/orders" className="text-gray-700 hover:text-food py-2" onClick={() => setMobileMenuOpen(false)}>
                    My Orders
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="text-gray-700 hover:text-food py-2" onClick={() => setMobileMenuOpen(false)}>
                      Admin Panel
                    </Link>
                  )}
                  <Button variant="default" onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }} className="w-full mt-2">
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="default" className="w-full">
                    Login
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
