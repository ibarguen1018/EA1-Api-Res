const {Router} = require('express');
const User = require('../models/User');
const {validatorUser} = require('../helpers/validator-user');

const router = Router();

router.post('/',async function  (req,res){
   
    try{
        const validator = validatorUser(req);
       if(validator.length>0){
           return res.status(400).send(validator);


       }
        console.log('Objeto recibico',req.body);
        let user = new User();

        const emailExists = await User.findOne({email : req.body.email });
        console.log(emailExists);
        if (emailExists){
            return res.status(400).send("Email ya existe");
            
        }

        user.name = req.body.name;
        user.email= req.body.email;
        user.state= req.body.state;
        user.creationDate= new Date();
        user.updateDate= new Date();
        user = await user.save();
        res.send(user);
    }catch (error){
        res.status(500).send('ocurrio un error');
        console.log(error);
    }
    
});

router.get('/',async function(req,res){
    try{
        const user = await User.find();
        res.send(user);
        

    }catch(error){
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }

});


router.put('/:userId',async function(req,res){
    try{
        const validator = validatorUser(req);
       if(validator.length>0){
           return res.status(400).send(validator);


       }
        let user = await User.findById(req.params.userId);
        if(!user){
           return  res.status(400).send("No se encontró un usuario con ese id");
        };

        const emailVerify = await User.findOne({email: req.body.email, _id:{ $ne: user._id}});
        if(emailVerify){
           return  res.status(400).send("El correo está siendo utilizado por otro usuario");
        }
        user.name = req.body.name;
        user.email= req.body.email;
        user.state= req.body.state;
        user.updateDate= new Date();
        user = await user.save();
        res.send(user);


    

    }catch(error){
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
        }

});
router.get('/:userId', async function(req, res){
    try{
        const userr = await User.findById(req.params.userId);

        if(!userr){
            return res.status(404).send('Ha ocurrido un erro');
        };
        res.send(userr);

    }catch(error){
        console.log(error)
    }
} )



module.exports= router;