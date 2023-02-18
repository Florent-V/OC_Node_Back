const express = require('express');
const mongoose = require('mongoose');
const Thing = require('./models/thing');
const Product = require('./models/product');
const app = express();

mongoose
  .connect('mongodb+srv://Florent:qApJwaqykkLDOiTb@openclassroomdb.m7qcpaq.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
      useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.get('/api/stuff', (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});

app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});


app.get('/api/products', (req, res, next) => {
  Product.find()
    .then( products => res.status(200).json({ products: products }))
    .catch(error => res.status(400).json({ error }));
})

app.get('/api/products/:id', (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then(product => res.status(200).json({ product: product }))
    .catch(error => res.status(400).json({ error }));
})

app.post('/api/products', (req, res, next) => {
  delete req.body._id;
  const product = new Product({
    ...req.body
  });
  product.save()
    .then( () => res.status(201).json({ product: product }))
    .catch(error => res.status(400).json({ error }));
});


app.put('/api/products/:id', (req, res, next) => {
  Product.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
    .then(product => res.status(200).json({ message: 'Produit modifié !'}))
    .catch(error => res.status(400).json({ error }));
})

app.delete('/api/products/:id', (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then( () => res.status(200).json({ messahe: "Produit Supprimé !"}))
    .catch(error => res.status(400).json({ error }));
})


module.exports = app;