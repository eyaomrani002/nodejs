const mongoose = require('mongoose')

const utilisateurSchema = mongoose.Schema({
    cin:{
        type:Number,
        required:true,
    },
    nom:{
        type:String,
        required:true,
    },
    prenom:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
})

const Utilisateur =mongoose.model('utilisateur',utilisateurSchema)//exporter le schema sous forme de modele 

module.exports =Utilisateur