
import { Category, MenuItem, Order, User } from './types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58',
    description: 'Delicious starters to whet your appetite'
  },
  {
    id: '2',
    name: 'Main Course',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b',
    description: 'Hearty and satisfying dishes'
  },
  {
    id: '3',
    name: 'Desserts',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
    description: 'Sweet treats to finish your meal'
  },
  {
    id: '4',
    name: 'Drinks',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e',
    description: 'Refreshing beverages'
  }
];

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Crispy Calamari',
    description: 'Tender calamari lightly fried with our special seasoning, served with marinara sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1640719028782-8230f1bdc53d',
    category: '1',
    popular: true
  },
  {
    id: '2',
    name: 'Bruschetta',
    description: 'Grilled bread rubbed with garlic and topped with olive oil, salt, tomato, and basil',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f',
    category: '1',
  },
  {
    id: '3',
    name: 'Spinach Artichoke Dip',
    description: 'Creamy blend of spinach, artichoke hearts, and cheeses, served with tortilla chips',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
    category: '1',
  },
  {
    id: '4',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon fillet grilled to perfection, served with seasonal vegetables',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
    category: '2',
    popular: true
  },
  {
    id: '5',
    name: 'Beef Tenderloin',
    description: 'Premium cut beef tenderloin steak cooked to your liking, served with mashed potatoes',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828',
    category: '2',
    popular: true
  },
  {
    id: '6',
    name: 'Vegetable Pasta',
    description: 'Fresh pasta with sautéed seasonal vegetables in a light cream sauce',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77',
    category: '2',
  },
  {
    id: '7',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c',
    category: '3',
    popular: true
  },
  {
    id: '8',
    name: 'New York Cheesecake',
    description: 'Creamy classic cheesecake with a graham cracker crust and berry compote',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad',
    category: '3',
  },
  {
    id: '9',
    name: 'Tiramisu',
    description: 'Italian dessert made with coffee-soaked ladyfingers and mascarpone cream',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1611329695518-1763319eeb38',
    category: '3',
  },
  {
    id: '10',
    name: 'Craft Beer',
    description: 'Selection of local craft beers',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9',
    category: '4',
  },
  {
    id: '11',
    name: 'Wine',
    description: 'Curated selection of red and white wines',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3',
    category: '4',
  },
  {
    id: '12',
    name: 'Specialty Coffee',
    description: 'Premium coffee prepared by our skilled baristas',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    category: '4',
  }
];

// Mock users with admin and regular customer
export const users: User[] = [
  {
    id: '1',
    email: 'admin@restaurant.com',
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'customer@example.com',
    name: 'John Doe',
    role: 'customer'
  }
];

// Mock orders
export const orders: Order[] = [
  {
    id: '1',
    userId: '2',
    items: [
      {...menuItems[0], quantity: 1},
      {...menuItems[3], quantity: 2}
    ],
    total: 62.97,
    status: 'completed',
    createdAt: '2023-09-15T10:30:00Z',
    contactDetails: {
      name: 'John Doe',
      phone: '555-123-4567',
      address: '123 Main St, City',
    }
  },
  {
    id: '2',
    userId: '2',
    items: [
      {...menuItems[5], quantity: 1},
      {...menuItems[7], quantity: 1}
    ],
    total: 26.98,
    status: 'pending',
    createdAt: '2023-09-16T18:45:00Z',
    contactDetails: {
      name: 'John Doe',
      phone: '555-123-4567',
      address: '123 Main St, City',
      notes: 'Please deliver quickly'
    }
  }
];
