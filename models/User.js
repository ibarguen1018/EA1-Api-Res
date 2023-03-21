const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    state:{
        type:String,
        required:true,
        enum:[
            'Active',
            'Inactive'
        ]
    },
    creationDate:{
        type:Date,
        required:true
    },
    updateDate:{
        type:Date,
        required:true
    }


});

module.exports =model('User',UserSchema)