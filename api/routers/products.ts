import express from 'express';
import Product from '../models/Product';
import auth, { RequestWithUser } from '../middleware/auth';
import { ProductMutation } from '../types';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';
import fs from 'fs';

const productsRouter = express.Router();

productsRouter.post(
  '/',
  auth,
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {
      const productData: ProductMutation = {
        owner: req.user?.id,
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        image: req.file?.filename,
        price: req.body.price,
      };

      const product = new Product(productData);
      await product.save();
      return res.send(product);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(error);
      }
      next(error);
    }
  }
);

productsRouter.get('/', async (req, res, next) => {
  try {
    const category = req.query.category;

    if (category) {
      const productsByCategory = await Product.find(
        { category: category },
        { owner: 0, category: 0, description: 0 }
      );
      return res.send(productsByCategory);
    }

    const products = await Product.find(
      {},
      { owner: 0, category: 0, description: 0 }
    );

    return res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res.status(404).send({ error: 'Not Found' });
    }
    return res.send(product);
  } catch (error) {
    next(error);
  }
});

productsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    const id = req.params.id;

    const product = await Product.findOne({ _id: id, owner: req.user?.id });

    if (!product) {
      return res.sendStatus(403);
    }

    fs.unlink(`../api/public/${product.image}`, (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          console.error('File does not exist.');
        } else {
          throw err;
        }
      } else {
        console.log('File deleted!');
      }
    });

    await product.deleteOne();
    return res.send('Successful delete!');
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
