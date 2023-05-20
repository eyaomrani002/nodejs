const express = require('express');
const mongoose = require('mongoose');
const Utilisateur = require('./models/utilisateur');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const router = express.Router();

const router1= require ('./router')


const app = express();
const secretKey = '123';


app.use('/api',router1)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/bonjour', (req, res) => {
  res.send('salut');
});

// Afficher utilisateurs
app.get('/utilisateurs', async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find({});
    res.send(utilisateurs);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

// Ajouter utilisateur
app.post('/ajouter_utilisateur', async (req, res) => {
  try {
    let new_utilisateur = new Utilisateur({
      cin: req.body.cin,
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
    });
    await new_utilisateur.save();
    res.send('effectuer avec succés !');
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

// Supprimer utilisateur
app.delete('/delete/:id', async (req, res) => {
  try {
    await Utilisateur.findByIdAndDelete({ _id: req.params.id });
    res.send('Supprimé avec succès!');
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

// Mise à jour
app.put('/maj/:id', async (req, res) => {
  try {
    await Utilisateur.findByIdAndUpdate({ _id: req.params.id }, { email: req.body.email });
    res.send('Mise à jour avec succès!');
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

// Login
const createToken = (req, res, next) => {
  const user = { username: req.body.username };
  jwt.sign(user, secretKey, (err, token) => {
    if (err) {
      return res.json({ err: err });
    }
    res.json({ token: token });
  });
};

app.post('/login', createToken, (req, res) => {
  // Your callback logic for the '/login' route
});

mongoose
  .connect('mongodb+srv://ayaomrani002:ayaomrani002@cluster0.yzld214.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.use('/', router);
    app.listen(3001, () => console.log('Server is running on port 3001'));
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

/*

const express = require('express');
const mongoose = require('mongoose');
const Utilisateur = require('./models/utilisateur');
const bodyParser =require("body-parser");
const jwt =require("jsonwebtoken");//lorsque l'utilisateur faire la login
const router = express.Router();



const app = express();

let secretKey=123
//let secretCode=121215

app.use (bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());





app.get("/bonjour",(req,res)=>{
    res.send("salut");
});


//afficher utilisateur
app.get('/utilisateurs', async (req, res) => {
    try {
      const utilisateurs = await Utilisateur.find({}); // Await the result of the query
      res.send(utilisateurs);
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  });


//ajouter utilisateur
app.post('/ajouter_utilisateur', async (req, res) => {
    try{
        let new_utilisateur =new Utilisateur ({
            cin:req.body.cin,
            nom:req.body.nom,
            prenom:req.body.prenom,
            email:req.body.email,
        });
        await new_utilisateur.save()
    res.send('effectuer avec succés !')

    }catch(err)
    {
        console.log(err);
    }
   

    });

  
//supprimer utilisateur

app.delete('/delete/:id', async (req, res) => {
    try {
        await Utilisateur.findByIdAndDelete({ _id: req.params.id });
          res.send("Supprimé avec succès!");
        } catch (err) {
          res.send(err);
    }
});


//mise a jour 
app.put('/maj/:id',async(req,res)=>{
    try{
        await Utilisateur.findByIdAndUpdate({_id:req.params.id},{
            email :req.body.email
        })
        res.send("mise a jour avec succes !")
    }
    catch(err){
        res.send(err)
    }
})   


const data= [{
    film:'titanic',
    year:1991
},
{
    film:"silence",
    year:2016
},
];


//
app.get('/data/:id',(req,res)=>{
    if(req.params.id == secretCode){
    res.json(data)
}
else {
    res.json({err:"vous n'etes pas autorise a effectuer cette tacher verifier votre code "})
}

    //res.json(data);
});

//


//login

function createToken(req, res, next) {
    const user = { username: req.body.username };
    jwt.sign(user, secretKey, (err, token) => {
      if (err) {
        return res.json({ err: err });
      }
      res.json({ token: token });
    });
  }
  
  app.post('/login', createToken, (req, res) => {
    // Your callback logic for the '/login' route
  });
router.get('/:num1/:num2', (req, res) => {
    res.send("Addition: " + (parseInt(req.params.num1) + parseInt(req.params.num2)));
});

mongoose
.connect('mongodb+srv://ayaomrani002:ayaomrani002@cluster0.yzld214.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.use('/', router);
    app.listen(3001, () => console.log("base de donne est connecter "));
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });




//

const express = require('express')

const mongoose=require("mongoose")
const app = express()
const router =express.Router()//router rempoin  yhezk lbarcha blayes 
//
router.get('/monastir', (req, res) => {
    res.send("monastir")
})

router.get('/tunis', (req, res) => {
    res.send("tunis")
})

router.get('/:drink',(req,res)=>{
    res.send("vous avez demander : "+`${req.params.drink}`)
})

//

//calculatruce 


router.get('/:num1/:num2',(req,res)=>{
    res.send("addition "+`${parseInt(req.params.num1)+parseInt(req.params.num2)}`)


})

mongoose
.connect('mongodb+srv://eya:<ayaomrani002>@cluster0.gqyayaj.mongodb.net/?retryWrites=true&w=majority',(err,done)=>{//representer l'errer et done representer le traitement 
if(err){
    console .log(err)
}
if(done){
    console.log('base de donne connecter avec succes ')
}
})

app.use('/',router)

app.listen(3001,()=>console.log("serveur bien marche"))


//mongodb+srv://eya:<password>@cluster0.gqyayaj.mongodb.net/?retryWrites=true&w=majority
//
*/