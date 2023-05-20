const express = require('express');
const router = express.Router();
const Article = require('../models/article');

// Afficher la liste des articles.
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().populate('scategorieID').exec();
    res.status(200).json(articles);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Créer un nouvel article.
router.post('/', async (req, res) => {
  const nouvelArticle = new Article(req.body);
  try {
    await nouvelArticle.save();
    res.status(200).json(nouvelArticle);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Chercher un article.
router.get('/:articleId', async (req, res) => {
  try {
    const article = await Article.findById(req.params.articleId);
    res.status(200).json(article);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Modifier un article.
router.put('/:articleId', async (req, res) => {
  const { reference, designation, prix, marque, qtestock, imageart, scategorieID } = req.body;
  const id = req.params.articleId;
  try {
    const updatedArticle = {
      reference: reference,
      designation: designation,
      prix: prix,
      marque: marque,
      qtestock: qtestock,
      imageart: imageart,
      scategorieID: scategorieID,
      _id: id
    };
    await Article.findByIdAndUpdate(id, updatedArticle);
    res.json(updatedArticle);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Supprimer un article.
router.delete('/:articleId', async (req, res) => {
  const id = req.params.articleId;
  try {
    await Article.findByIdAndDelete(id);
    res.json({ message: 'Article deleted successfully.' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
