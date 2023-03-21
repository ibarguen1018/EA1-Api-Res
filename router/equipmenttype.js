const {Router} = require('express');
const EquipmentType = require('../models/EquipmentType');
const {validatorBrandEquipments} = require('../helpers/validator-brand-equipments');

const router = Router();

router.post('/', async function(req,res){
    try{
        const validator =  validatorBrandEquipments(req);
        if(validator.length>0){
            return res.status(400).send(validator);
        }
        let equipmentType = new EquipmentType();

        let existEquipmentType = await EquipmentType.findOne({name : req.body.name});

        if(existEquipmentType){
            return res.status(400).send("Tipo de equipo ya existente")
        }
        equipmentType.name = req.body.name;
        equipmentType.state = req.body.state;
        equipmentType.creationDate = new Date();
        equipmentType.updateDate = new Date();

        equipmentType =  await equipmentType.save();

        console.log(equipmentType);
        res.send(equipmentType);
    }catch(error){
        res.status(500).send("Ha ocurrido un error");
        console.log(error);

    };
});
router.get('/',async function(req,res){
    try{
        let existEquipmentType = await EquipmentType.find();
        if(!existEquipmentType){
            return res.status(400).send("No se enncontraron tipos de equipos")
        }
        res.send(existEquipmentType);

    }catch(error){
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }

});

router.put('/:equipmentTypeId',async function(req,res){
    try{
        const validator =  validatorBrandEquipments(req);
        if(validator.length>0){
            return res.status(400).send(validator);
        }
        let existEquipmentType = await EquipmentType.findById(req.params.equipmentTypeId);
        if(!existEquipmentType){
            return res.status(400).send("No se encontró ese tipo de equipo")
        }
        existEquipmentType.name = req.body.name;
        existEquipmentType.state = req.body.state;
        existEquipmentType.updateDate = new Date();

        existEquipmentType =  await existEquipmentType.save();

        console.log(existEquipmentType);
        res.send(existEquipmentType);

    }catch(error){
        console.log(error);
        res.status(500).send("Hubo un error");

    }
    

});
router.get('/:equipmentTypeId', async function(req, res){
    try{
        const types = await EquipmentType.findById(req.params.equipmentTypeId);

        if(!types){
            return res.status(404).send('Ha ocurrido un erro');
        };
        res.send(types);

    }catch(error){
        console.log(error)
    }
} )



module.exports= router;