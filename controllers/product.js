// in controllers/products.js

const Product = require("../models/product");

const createProduct = (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock,
  });
  product
    .save()
    .then(() => {
      res.status(201).json({ product: product });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

const getOneProduct = (req, res, next) => {
  Product.findOne({
    _id: req.params.id,
  })
    .then((product) => {
      res.status(200).json({ product: product });
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

const modifyProduct = (req, res, next) => {
  const product = new Product({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock,
  });
  Product.updateOne({ _id: req.params.id }, product)
    .then(() => {
      res.status(201).json({ message: "Produit modifié !" });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

const deleteProduct = (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "Produit Supprimé !" });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

const getAllProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.status(200).json({ products: products });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

module.exports = {
  createProduct,
  getOneProduct,
  modifyProduct,
  deleteProduct,
  getAllProducts,
};
