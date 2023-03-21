const {Router} = require('express');
const EquipmentStatus = require('../models/EquipmentStatus');
const {validatorBrandEquipments} = require('../helpers/validator-brand-equipments');

const router = Router();

router.post('/',async function(req,res){
    try{
        const validator = validatorBrandEquipments(req);
        if(validator.length>0){
            return res.status(400).send(validator);
        }
        let equipmentStatus =  EquipmentStatus();

        const existEquipmentStatus = await EquipmentStatus.findOne({name: req.body.name});
        if(existEquipmentStatus){
            return res.status(400).send("Estado de equipos ya existente");
        };

        equipmentStatus.name = req.body.name;
        equipmentStatus.state = req.body.state;
        equipmentStatus.creationDate = new Date();
        equipmentStatus.updateDate = new Date();

        equipmentStatus = await equipmentStatus.save();

        console.log(equipmentStatus);
        res.send(equipmentStatus);



    }catch(error){
        res.status(500).send("Ha ocurrido un error");
        console.log(error)
    }

});

router.get('/',async function(req,res){
    try{
        const equipmentStatus = await EquipmentStatus.find();
        
        res.send(equipmentStatus);

    }catch(error){
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }


});
router.put('/:equipmentStatusId',async function(req,res){
    try{
        const validator =  validatorBrandEquipments(req);
        if(validator.length>0){
            return res.status(400).send(validator);
        }
        let equipmentStatus = await EquipmentStatus.findById(req.params.equipmentStatusId);

        if(!equipmentStatus){
            res.status(400).send("Estado de equipo no encontrado");
        };
        equipmentStatus.name = req.body.name;
        equipmentStatus.state = req.body.state;
        equipmentStatus.updateDate = new Date();

        equipmentStatus = await equipmentStatus.save();

        console.log(equipmentStatus);
        res.send(equipmentStatus);


    }catch(error){
        console.log(error);
        res.status(500).send("Ha ocurrido un error");

    }

});
router.get('/:equipmentStatusId', async function(req, res){
    try{
        const statuss = await EquipmentStatus.findById(req.params.equipmentStatusId);

        if(!statuss){
            return res.status(404).send('Ha ocurrido un erro');
        };
        res.send(statuss);

    }catch(error){
        console.log(error)
    }
} )

module.exports= router;