const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 3600,
    });
}

router.post('/register', async(req, res) => {
    const {email} = req.body;
    try {
        if (await User.findOne({email}))
            return res.status(400).send({error: 'Usuario ja existente'});

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({
            user,
            token: generateToken({id:user.id}),
        });
    }    
    catch (err){
        return res.status(400).send({error: 'Falha no registro'}, err);
    }
});

router.post('/authenticate', async(req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email}).select('+password');

    if(!user)
        return res.status(400).send({error: 'Usuario nao encontrado'});

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({error: 'Senha incorreta'});

    user.password = undefined;

    const token = 

    res.send({
        user, 
        token: generateToken({id:user.id}),
    });
});

module.exports = app => app.use('/auth', router);