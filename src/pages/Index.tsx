
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { categories, menuItems } from '@/lib/mockData';
import MenuItemCard from '@/components/MenuItemCard';
import CategoryCard from '@/components/CategoryCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const Index = () => {
  const [popularItems, setPopularItems] = useState(menuItems.filter(item => item.popular));

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1565299507177-b0ac66763828" 
            alt="Delicious food" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        </div>
        <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Delicious Food <br /> <span className="text-food">Delivered to You</span>
          </h1>
          <p className="text-white text-lg md:text-xl max-w-xl mb-8">
            Experience the finest cuisine with our selection of mouth-watering dishes prepared by expert chefs using the freshest ingredients.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/menu">
              <Button size="lg" className="bg-food hover:bg-food-dark">
                View Menu
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Most Popular <span className="text-food">Dishes</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularItems.map(item => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/menu">
            <Button size="lg" className="bg-food hover:bg-food-dark">
              View All Menu Items
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Browse by <span className="text-food">Category</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">What Our <span className="text-food">Customers Say</span></h2>
        <Carousel className="w-full">
          <CarouselContent>
            {[
              {
                name: "Sarah Johnson",
                text: "The best food I've ever had! The flavors are amazing and the service is excellent. I'll definitely be ordering again.",
                rating: 5
              },
              {
                name: "Michael Chen",
                text: "I ordered for a family dinner and everyone was impressed. The food arrived hot and was absolutely delicious!",
                rating: 5
              },
              {
                name: "Jessica Williams",
                text: "Great quality ingredients and generous portions. The online ordering process was so easy and convenient.",
                rating: 4
              }
            ].map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-2xl ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                    ))}
                  </div>
                  <p className="italic text-gray-600 flex-grow">"{testimonial.text}"</p>
                  <p className="mt-4 font-semibold">- {testimonial.name}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-1/2" />
          <CarouselNext className="right-0 translate-x-1/2" />
        </Carousel>
      </section>

      {/* CTA Section */}
      <section className="bg-food py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Order?</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Place your order now and enjoy our delicious food delivered right to your doorstep.
          </p>
          <Link to="/menu">
            <Button size="lg" variant="secondary" className="bg-white text-food hover:bg-gray-100">
              Order Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
