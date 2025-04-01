const userModel = require('../models/user.model')
const userServices = require('../services/user.services');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res , next) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
         
    }


    console.log(req.body);
    
    const { fullname, email, password } = req.body;

// Corrected spelling: `hashPasssword` → `hashedPassword`
const hashedPassword = await userModel.hashPassword(password);

const user = await userServices.createUser({
    firstname: fullname.firstname, // Corrected spelling: `firestname` → `firstname`
    lastname: fullname.lastname,   // Corrected spelling: `firestname` → `lastname`
    email,
    password: hashedPassword
});

// Corrected spelling: `genrateAuthToken` → `generateAuthToken`
const token = user.generateAuthToken();

res.status(201).json({ token, user });


}