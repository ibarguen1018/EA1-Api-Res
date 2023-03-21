const validatorUser = (req) =>{
    const validators = [];
   if(!req.body.name){
       validators.push("Debe ingresar un nombre");

   };
   if(!req.body.state){
    validators.push("Debe ingresar un estado");

    if(!req.body.email){
        validators.push("Es necesario un email");
    }

};
return validators;

};


module.exports={
    validatorUser,
}