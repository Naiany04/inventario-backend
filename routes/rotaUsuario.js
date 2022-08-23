const express = require('express');
// const { response } = require('../app');
const router = express.Router();

//para consultar todos os dados
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: "aqui é a lista de usuários!!!",
        nome: "Naiany"
    })

})
//para consultar um determinado cadastro
router.get('/:id', (req, res, next) => {

    const {id} = req.params.id;
    res.status(200).send({
        mensagem: `aqui é a lista de usuários com id:${id}`,
        nome: "Naiany"
    })

})
//para enviar dados para salvar no banco
router.post('/', (req, res, next) => {

    const usuario={
    nome : req.body.nome,
    email : req.body.email,
    senha : req.body.senha
    }
    res.status(201).send({
        mensagem:"Dados Inseridos!",
        usuarioCriado:usuario
    })
})

module.exports = router;