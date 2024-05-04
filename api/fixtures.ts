import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Product from './models/Product';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (error) {
    console.log(`Collection ${collectionName} is missing. Skipping drop...`);
  }
};

const collections: string[] = ['users', 'products'];

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;
  const date = new Date();

  for (const collection of collections) {
    await dropCollection(db, collection);
  }

  const [user1, user2, user3] = await User.create(
    {
      username: 'Admin',
      password: 'starboy1234',
      displayName: 'Dennis',
      phoneNumber: '+996779510201',
      token: crypto.randomUUID(),
    },
    {
      username: 'millie',
      password: 'millie2024',
      displayName: 'Millie Watches',
      phoneNumber: '+996220228949',
      token: crypto.randomUUID(),
    },
    {
      username: 'will',
      password: 'test123',
      displayName: 'William Buyers',
      phoneNumber: '+996550556974',
      token: crypto.randomUUID(),
    }
  );

  const [product1, product2, product3] = await Product.create(
    {
      owner: user1._id,
      category: 'cars',
      title: 'Toyota Camry 70',
      description: 'This is my car, selling for anyone',
      image: 'toyota.webp',
      price: '25800',
    },
    {
      owner: user3._id,
      category: 'smartphones',
      title: 'Iphone 15 Pro Max',
      description: 'I really need money, pls buy',
      image: 'iphone.jpg',
      price: '999',
    },
    {
      owner: user2._id,
      category: 'clothes',
      title: 'Dress',
      description: 'New dress, selling because I did not like it',
      image: 'dress.webp',
      price: '150',
    }
  );

  await db.close();
};

void run().catch(console.error);
