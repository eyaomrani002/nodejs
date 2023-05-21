const express = require('express');
const router = express.Router();
const SCategorie=require("../models/scategorie")
// afficher la liste des categories.



router.get('/', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Par défaut, la page est 1
      const limit = parseInt(req.query.limit) || 10; // Par défaut, la limite est 10
      const sortField = req.query.sort || 'nomscategorie'; // Par défaut, le tri se fait par le champ "nomscategorie"
  
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const scategories = await Scategorie.find()
        .sort(sortField)
        .skip(startIndex)
        .limit(limit)
        .exec();
  
      res.status(200).json(scategories);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
  
/*

router.get('/', async (req, res, )=> {
try {
const scat = await SCategorie.find().populate("categorieID").exec();
res.status(200).json(scat);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
*/



// créer un nouvelle catégorie
router.post('/', async (req, res) => {
const { nomscategorie, imagescat,categorieID} = req.body;
const newSCategorie = new SCategorie({nomscategorie:nomscategorie, 
imagescat:imagescat,categorieID:categorieID })
try {
await newSCategorie.save();
res.status(200).json(newSCategorie );
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// chercher une sous catégorie 
router.get('/:scategorieId',async(req, res)=>{
    try {
    const scat = await SCategorie.findById(req.params.scategorieId);
    res.status(200).json(scat);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
    // modifier une catégorie
    router.put('/:scategorieId', async (req, res)=> {
    const { nomscategorie, imagescat,categorieID} = req.body;
    const id = req.params.scategorieId;
    try {
    const scat1 = { 
    nomscategorie:nomscategorie,imagescat:imagescat,categorieID:categorieID, _id:id };
    await SCategorie.findByIdAndUpdate(id, scat1);
    res.json(scat1);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
    // Supprimer une catégorie
    router.delete('/:scategorieId', async (req, res)=> {
    const id = req.params.scategorieId;
    await SCategorie.findByIdAndDelete(id);
    res.json({ message: "sous categorie deleted successfully." });
    });
    module.exports = router;