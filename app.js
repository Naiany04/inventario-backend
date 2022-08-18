const express = require('express');
const app = express();

app.use("/listausuarios",(req, res, next)=>{
    console.log("passei aqui")
    res.status(200).send({
        mensagem:"deu certo!!!",
        nome: "Naiany"
    })
});

module.exports = app