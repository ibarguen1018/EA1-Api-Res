const mongo = require('mongoose');

const getConnection = async() => {

    try{
        const url = 'mongodb+srv://root:root@cluster0.lbjxeq9.mongodb.net/?retryWrites=true&w=majority';

        await mongo.connect(url);
        console.log('Conexion Exitosa');

    }catch (error){
        console.log('Error');
    }

}

module.exports={
    getConnection,
}