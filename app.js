const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require("body-parser");
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const rotaUsuarios = require('./routes/rotaUsuario');
const rotaEmpresa = require('./routes/rotaEmpresa');
const rotaPatrimonio = require('./routes/rotaPatrimonio');
const rotaLotacao = require('./routes/rotaLotacao');
const rotaSetor = require('./routes/rotaSetor');





app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Acces-Control-Allow-Header',
        'Origin, X Requerested-with, Content-Type, Accept, Authorization'
    );
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).send({});
    }
    next();
})

app.use("/usuario", rotaUsuarios);
app.use("/empresa", rotaEmpresa);
app.use("/patrimonio", rotaPatrimonio);
app.use("/lotacao", rotaLotacao);
app.use("/setor", rotaSetor);


app.use((req, res, next)=>{
    const erro = new Error("Não encontrado!");
    erro.status(404);
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