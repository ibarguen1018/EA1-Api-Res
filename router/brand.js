const {Router} = require('express');
const Brand = require('../models/Brand');
const router = Router();
const {validatorBrandEquipments} = require('../helpers/validator-brand-equipments');


router.post('/', async function(req,res){
    try{
        const validator =  validatorBrandEquipments(req);
       if(validator.length>0){
           return res.status(400).send(validator);
       }
        let brand = new Brand();

        const existBrand = await Brand.findOne({name: req.body.name});
        if(existBrand){
            return res.status(400).send("Marca ya existente");
        }

        brand.name = req.body.name;
        brand.state = req.body.state;
        brand.creationDate = new Date();
        brand.updateDate = new Date();

        brand = await brand.save();
        res.send(brand);
    }catch(error){
        res.status(500).send("Ha ocurrido un error");
        console.log(error);
    }

});
router.get('/', async function(req,res){
    try{
        const brand = await Brand.find();
        res.send(brand);

    }catch(error){
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }

});
router.put('/:idBrand', async function(req,res){
    try{
        const validator =  await validatorBrandEquipments(req);
       if(validator.length>0){
           return res.status(400).send(validator);
       }
        let brand = await Brand.findById(req.params.idBrand);
       

        if(!brand){
            res.status(400).send("Marca no encontrada");
        };

        brand.name = req.body.name;
        brand.state = req.body.state;
        brand.updateDate = new Date();

        brand = await brand.save();
        res.send(brand);



    }catch(error){
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }

});
router.get('/:brandId', async function(req, res){
    try{
        const brandi = await Brand.findById(req.params.brandId);

        if(!brandi){
            return res.status(404).send('Ha ocurrido un erro');
        };
        res.send(brandi);

    }catch(error){
        console.log(error)
    }
} )



module.exports= router;