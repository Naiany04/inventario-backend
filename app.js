const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require("body-parser");
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const rotaUsuarios = require('./routes/rotaUsuario');
app.use("/usuario", rotaUsuarios);

app.use((req, res, next)=>{
    const erro = new Error("Não encontrado!");
    erro.sttaus(404);
    next(erro);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    return res.json({
        erro:{
            mensagem:error.mensagem
        }
    })
})

module.exports = app