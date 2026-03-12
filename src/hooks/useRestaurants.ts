import { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Restaurant, restaurants as initialData } from '@/data/restaurants';

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const restaurantsCollection = collection(db, 'restaurants');
        const q = query(restaurantsCollection);
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
          console.log('No restaurants found in Firestore. Seeding data...');
          // Seed the data if empty
          const seedPromises = initialData.map(async (res) => {
            const resRef = doc(db, 'restaurants', res.id);
            await setDoc(resRef, res);
          });
          await Promise.all(seedPromises);
          setRestaurants(initialData);
        } else {
          const data = snapshot.docs.map(doc => doc.data() as Restaurant);
          setRestaurants(data);
        }
      } catch (err: any) {
        console.error('Error fetching restaurants:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return { restaurants, loading, error };
};
