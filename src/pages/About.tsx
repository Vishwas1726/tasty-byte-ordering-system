
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen">
      <div className="relative h-80 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d" 
          alt="Restaurant interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            About DeliciousEats
          </h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-6">
              Founded in 2010, DeliciousEats has been serving exceptional cuisine to our community for over a decade. What started as a small family-owned restaurant has grown into a beloved culinary destination known for our commitment to quality ingredients, authentic flavors, and outstanding service.
            </p>
            
            <p className="text-lg mb-6">
              Our chef, with over 20 years of experience in fine dining, brings passion and creativity to every dish. We source our ingredients from local farmers and suppliers whenever possible, ensuring freshness and supporting our community.
            </p>
            
            <p className="text-lg mb-12">
              Whether you're joining us for a special celebration or ordering your favorite comfort food for delivery, we put the same care and attention into every meal we prepare. Our mission is simple: to create delicious food that brings people together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg">
                To create exceptional dining experiences through delicious food, warm hospitality, and a commitment to quality that keeps our customers coming back.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <ul className="list-disc pl-5 text-lg space-y-2">
                <li>Quality ingredients without compromise</li>
                <li>Authentic recipes with creative touches</li>
                <li>Warm, attentive service</li>
                <li>Community engagement and support</li>
                <li>Sustainability in our practices</li>
              </ul>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Chef Michael Rodriguez",
                  role: "Executive Chef",
                  image: "https://images.unsplash.com/photo-1583394838336-acd977736f90",
                },
                {
                  name: "Sarah Johnson",
                  role: "Restaurant Manager",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
                },
                {
                  name: "David Chen",
                  role: "Head of Customer Experience",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
                }
              ].map((person, index) => (
                <div key={index} className="text-center">
                  <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src={person.image} 
                      alt={person.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{person.name}</h3>
                  <p className="text-gray-600">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/contact">
              <Button size="lg" className="bg-food hover:bg-food-dark">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
