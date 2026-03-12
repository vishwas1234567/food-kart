export interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  cuisine: string;
  deliveryTime: string;
  menu: FoodItem[];
}

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Burger King',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072&auto=format&fit=crop',
    rating: 4.5,
    cuisine: 'Burgers, Fast Food',
    deliveryTime: '20-25 mins',
    menu: [
      {
        id: '101',
        name: 'Whopper Junior',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop',
        description: 'A flame-grilled beef patty topped with tomatoes, fresh lettuce, and mayo.',
        rating: 4.2
      },
      {
        id: '102',
        name: 'Crispy Chicken Burger',
        price: 10.50,
        image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=1974&auto=format&fit=crop',
        description: 'Our crispy white-meat chicken patty with shredded lettuce and creamy mayo.',
        rating: 4.5
      },
      {
        id: '103',
        name: 'Bacon Cheese Burger',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=2071&auto=format&fit=crop',
        description: 'Smoky bacon, melted American cheese, and our signature beef patty.',
        rating: 4.7
      },
      {
        id: '104',
        name: 'Onion Rings (L)',
        price: 4.99,
        image: '/images/onion_rings.png',
        description: 'Golden-brown, crispy onion rings fried to perfection.',
        rating: 4.4
      }
    ]
  },
  {
    id: '2',
    name: 'Pizza Hut',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop',
    rating: 4.2,
    cuisine: 'Pizza, Italian',
    deliveryTime: '30-40 mins',
    menu: [
      {
        id: '201',
        name: 'Margherita Pizza',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2070&auto=format&fit=crop',
        description: 'Classic cheese and tomato pizza with fresh basil.',
        rating: 4.8
      },
      {
        id: '202',
        name: 'Pepperoni Feast',
        price: 18.50,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1780&auto=format&fit=crop',
        description: 'A classic favorite with generous helpings of spicy pepperoni.',
        rating: 4.7
      },
      {
        id: '203',
        name: 'Veggie Supreme',
        price: 17.99,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop',
        description: 'Loaded with mushrooms, peppers, onions, and sweetcorn.',
        rating: 4.6
      },
      {
        id: '204',
        name: 'Garlic Breadsticks',
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=1888&auto=format&fit=crop',
        description: 'Warm, buttery breadsticks seasoned with garlic and herbs.',
        rating: 4.5
      }
    ]
  },
  {
    id: '3',
    name: 'KFC',
    image: '/images/kfc_restaurant.png',
    rating: 4.3,
    cuisine: 'Fried Chicken, American',
    deliveryTime: '25-30 mins',
    menu: [
      {
        id: '401',
        name: '8pc Chicken Bucket',
        price: 24.99,
        image: '/images/kfc_bucket.png',
        description: 'A bucket of our famous original recipe fried chicken.',
        rating: 4.6
      },
      {
        id: '402',
        name: 'Zinger Burger',
        price: 9.50,
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop',
        description: 'A spicy, crispy chicken fillet topped with lettuce and mayo.',
        rating: 4.7
      },
      {
        id: '403',
        name: 'Popcorn Chicken (M)',
        price: 6.99,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=2070&auto=format&fit=crop',
        description: 'Bite-sized pieces of crispy, seasoned chicken.',
        rating: 4.4
      },
      {
        id: '404',
        name: 'French Fries (L)',
        price: 3.99,
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1887&auto=format&fit=crop',
        description: 'Golden, crispy fries with just the right amount of salt.',
        rating: 4.3
      }
    ]
  },
  {
    id: '4',
    name: 'Subway',
    image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?q=80&w=2070&auto=format&fit=crop',
    rating: 4.4,
    cuisine: 'Sandwiches, Healthy',
    deliveryTime: '20-25 mins',
    menu: [
      {
        id: '501',
        name: 'Italian B.M.T.',
        price: 11.50,
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=1925&auto=format&fit=crop',
        description: 'Genoa salami, spicy pepperoni, and Black Forest ham.',
        rating: 4.8
      },
      {
        id: '502',
        name: 'Tuna Sub',
        price: 10.99,
        image: 'https://images.unsplash.com/photo-1559466273-d95e72debaf8?q=80&w=1888&auto=format&fit=crop',
        description: 'Classic flaked tuna mixed with creamy mayo.',
        rating: 4.5
      },
      {
        id: '503',
        name: 'Veggie Delite',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1592415499556-74fcb9f18667?q=80&w=1964&auto=format&fit=crop',
        description: 'Fresh vegetables on your choice of freshly baked bread.',
        rating: 4.6
      },
      {
        id: '504',
        name: 'Turkey Breast',
        price: 11.99,
        image: 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3?q=80&w=1925&auto=format&fit=crop',
        description: 'Lean turkey breast on a freshly baked hero.',
        rating: 4.7
      }
    ]
  },
  {
    id: '5',
    name: 'Healthy Bowls',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop',
    rating: 4.7,
    cuisine: 'Salads, Organic',
    deliveryTime: '15-20 mins',
    menu: [
      {
        id: '601',
        name: 'Quinoa Buddha Bowl',
        price: 16.50,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop',
        description: 'Superfood quinoa with avocado, chickpeas, and lemon tahini dressing.',
        rating: 4.9
      },
      {
        id: '602',
        name: 'Grilled Salmon Salad',
        price: 22.99,
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1887&auto=format&fit=crop',
        description: 'Fresh Atlantic salmon on a bed of garden greens.',
        rating: 4.8
      },
      {
        id: '603',
        name: 'Acaí Power Bowl',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=2070&auto=format&fit=crop',
        description: 'Organic acaí topped with fresh fruit and artisan granola.',
        rating: 4.7
      },
      {
        id: '604',
        name: 'Chicken Caesar Salad',
        price: 14.50,
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=2070&auto=format&fit=crop',
        description: 'Crispy romaine lettuce, parmesan cheese, and herb-grilled chicken.',
        rating: 4.8
      }
    ]
  },
  {
    id: '6',
    name: 'Sushi Master',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop',
    rating: 4.9,
    cuisine: 'Japanese, Sushi',
    deliveryTime: '30-40 mins',
    menu: [
      {
        id: '701',
        name: 'Salmon Nigiri (6pc)',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?q=80&w=2070&auto=format&fit=crop',
        description: 'Fresh slices of premium salmon over vinegared rice.',
        rating: 4.9
      },
      {
        id: '702',
        name: 'California Roll',
        price: 15.50,
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1887&auto=format&fit=crop',
        description: 'Crab meat, avocado, and cucumber rolled with sesame seeds.',
        rating: 4.7
      },
      {
        id: '703',
        name: 'Shrimp Tempura',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=2050&auto=format&fit=crop',
        description: 'Jumbo shrimp battered and fried to a crisp perfection.',
        rating: 4.8
      },
      {
        id: '704',
        name: 'Miso Soup',
        price: 4.50,
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop',
        description: 'Traditional Japanese soup with tofu, seaweed, and scallions.',
        rating: 4.6
      }
    ]
  },
  {
    id: '7',
    name: 'Dessert Heaven',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1964&auto=format&fit=crop',
    rating: 4.8,
    cuisine: 'Cakes, Ice Cream',
    deliveryTime: '15-20 mins',
    menu: [
      {
        id: '801',
        name: 'Chocolate Lava Cake',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=2070&auto=format&fit=crop',
        description: 'Warm chocolate cake with a molten chocolate center.',
        rating: 4.9
      },
      {
        id: '802',
        name: 'Strawberry Cheesecake',
        price: 12.50,
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1965&auto=format&fit=crop',
        description: 'Creamy New York style cheesecake with fresh strawberries.',
        rating: 4.8
      },
      {
        id: '803',
        name: 'Gourmet Macarons (6pc)',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?q=80&w=1959&auto=format&fit=crop',
        description: 'Exquisite French macarons in assorted flavors.',
        rating: 4.7
      },
      {
        id: '804',
        name: 'Vanilla Sundae',
        price: 7.50,
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1964&auto=format&fit=crop',
        description: 'Smooth vanilla bean ice cream with your choice of toppings.',
        rating: 4.6
      }
    ]
  }
];
