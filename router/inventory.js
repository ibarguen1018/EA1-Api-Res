const { Router } = require('express');
const Inventory = require('../models/Inventory');
const { validatorInvenotory } = require('../helpers/validator-inventory');

const router = Router();

router.post('/', async function (req, res) {
    try {
        const validator = validatorInvenotory(req);
        if (validator.length > 0) {
            return res.status(400).send(validator);
        }
        let inventory = new Inventory();

        const inventoryExist = await Inventory.findOne({ serial: req.body.serial });

        if (inventoryExist) {
            return res.status(400).send("Ya existe un inventario asociado a  ese serial");
        };

        inventory.serial = req.body.serial;
        inventory.model = req.body.model;
        inventory.description = req.body.description;
        inventory.image = req.body.image;
        inventory.price = req.body.price;
        inventory.user = req.body.user;
        inventory.brand = req.body.brand;
        inventory.equipmentStatus = req.body.equipmentStatus;
        inventory.equipmentType = req.body.equipmentType;
        inventory.creationDate = new Date();
        inventory.updateDate = new Date();

        inventory = await inventory.save();
        res.send(inventory);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }

});
router.get('/', async function (req, res) {
    try {
        const inventory = await Inventory.find().populate([
            {
                path: 'user'
            },
            {
                path: 'brand'

            },
            {
                path: 'equipmentStatus'

            },
            {
                path:'equipmentType'

            }


        ]);
        res.send(inventory);
        

    } catch (error) {
        console.log(error);
        res.status(400).send("Ha ocurrido un error");
    }
});
router.put('/:inventoryId', async function (req, res) {
    try {
        const validator = validatorInvenotory(req);
        if (validator.length > 0) {
            return res.status(400).send(validator);
        }

        let inventory = await Inventory.findById(req.params.inventoryId);
        if (!inventory) {
            return res.status(400).send("no existe un inventario con ese id");
        }

        const serialExist = await Inventory.findOne({ serial: req.body.serial, _id: { $ne: inventory._id } });
        console.log(serialExist);
        if (serialExist) {
            return res.status(400).send("Ya existe un inventario asociado a  ese serial");
        };
        inventory.serial = req.body.serial;
        inventory.model = req.body.model;
        inventory.description = req.body.description;
        inventory.image = req.body.image;
        inventory.price = req.body.price;
        inventory.user = req.body.user;
        inventory.brand = req.body.brand;
        inventory.equipmentStatus = req.body.equipmentStatus;
        inventory.equipmentType = req.body.equipmentType;
        inventory.updateDate = new Date();

        inventory = await inventory.save();
        res.send(inventory);


    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
        ;
    }


});

router.get('/:inventoryId', async function(req, res){
    try{
        const inventor = await Inventory.findById(req.params.inventoryId);

        if(!inventor){
            return res.status(404).send('Ha ocurrido un erro');
        };
        res.send(inventor);

    }catch(error){
        console.log(error)
    }
} )



module.exports = router;