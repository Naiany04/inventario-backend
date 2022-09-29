const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;
const usuario = [
    {
        "id": 1,
        "nome": "Carlos",
        "email": "sousamacedo18@gmail.com",
        "senha": "123"
    },
    {
        "id": 2,
        "nome": "Pedro",
        "email": "pedro@gmail.com",
        "senha": "321"
    },
    {
        "id": 3,
        "nome": "João Neto",
        "email": "joaoneto@gmail.com",
        "senha": "123"
    },
    {
        "id": 4,
        "nome": "Iarly",
        "email": "iarly@gmail.com",
        "senha": "123"
    },
    {
        "id": 5,
        "nome": "Maria Eduarda",
        "email": "mariaeduarda@gmail.com",
        "senha": "123"
    },
    {
        "id": 6,
        "nome": "Filipe",
        "email": "filipe@gmail.com",
        "senha": "123"
    },
    {
        "id": 7,
        "nome": "Ray",
        "email": "ray@gmail.com",
        "senha": "123"
    },
    {
        "id": 8,
        "nome": "Max",
        "email": "max@gmail.com",
        "senha": "123"
    },
    {
        "id": 9,
        "nome": "Gabriela",
        "email": "gabriela@gmail.com",
        "senha": "123"
    },
    {
        "id": 10,
        "nome": "Nay",
        "email": "Nay@gmail.com",
        "senha": "28"
    }

]

function validacaoEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

//para consultar todos os dados
router.get('/', (req, res, next) => {


    mysql.getConnection((error, conn) => {
        conn.query(
            "select * from `usuario`",
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(200).send({
                    mensagem: "aqui é a lista de usuários!!!",
                    usuario: resultado
                    // usuario:usuario[1].nome
                })
            }
        )
    })


})
//para consultar um determinado cadastro
router.get('/:id', (req, res, next) => {
    const id = req.params.id;


    mysql.getConnection((error, conn) => {
        conn.query(
            "select * from `usuario` WHERE id=?",[id],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(200).send({
                    mensagem: "aqui é a lista de usuários!!!",
                    usuario: resultado
                    // usuario:usuario[1].nome
                })
            }
        )
    })


})
//para enviar dados para salvar no banco
router.post('/', (req, res, next) => {
    let msg = [];
    let i = 0;

    const usuario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    }
    if (usuario.nome.length < 3) {
        msg.push({ mensagem: "campo com menos de 3 caracteres!" })
        i++;
    }

    if (validacaoEmail(usuario.email) == false) {

        msg.push({ mensagem: "Email inválido!" })
        i++;
    }
    if (usuario.senha.length == 0) {

        msg.push({ mensagem: "senha inválida!" })
        i++;
    }



    if (i == 0) {
        mysql.getConnection((error, conn) => {
            conn.query(
                "INSERT INTO `usuario`(nome, email, senha) values(?,?,?)",
                [usuario.nome, usuario.email, usuario.senha],
                (error, resultado, field) => {
                    conn.release();
                    if (error) {
                        return res.status(500).send({
                            error: error,
                            response: null
                        })
                    }
                    res.status(201).send({
                        mensagem: "Cadastro criado com sucesso",
                        usuario: resultado.insertId
                        // usuario:usuario[1].nome
                    })
                }
            )
        })
    }



}
);
//para alterar dados salvos no banco
router.patch('/', (req, res, next) => {
    let msg = [];
    let i = 0;
    const { id, nome, email, senha } = req.body;
    const array_alterar = [{
        id: id,
        nome: nome,
        email: email,
        senha: senha
    }]
    let lista = usuario.map(item => {
        // if(item==id){
        return (
            item.nome = nome,
            item.email = email,
            item.senha = senha
        )
    });
    if (nome.length < 3) {
        msg.push({ mensagem: "campo com menos de 3 caracteres!" })
        i++;
    }

    if (validacaoEmail(email) == false) {

        msg.push({ mensagem: "Email inválido!" })
        i++;
    }
    if (senha.length == 0) {

        msg.push({ mensagem: "senha inválida!" })
        i++;
    }


    if (i == 0) {
        mysql.getConnection((error, conn) => {
            conn.query(
                "UPDATE `usuario` set nome=?, email=?, senha=? where id=?",
                [nome, email, senha, id],
                (error, resultado, field) => {
                    conn.release();
                    if (error) {
                        return res.status(500).send({
                            error: error,
                            response: null
                        })
                    }
                    res.status(201).send({
                        mensagem: "Cadastro alterado com sucesso",
                    })
                }
            )
        })
    } else {
        res.status(400).send({
            mensagem: msg
        })
    }


    res.status(201).send(
        {
            mensagem: "Dados alterados com sucesso!!!"
        }
    )
})

//para apagar dados do banco
router.delete("/:id", (req, res, next) => {
    const { id } = req.params;
    // let dadosdeletados = usuario.filter(value => value.id == id);
    // let listausuario = usuario.filter(value => value.id != id);



    mysql.getConnection((error, conn) => {
        conn.query(
            `DELETE from usuario WHERE id=${id}`,
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(200).send({
                    mensagem: "Cadastro deletado com sucesso!!!",
                })
            }
        )
    })



})

module.exports = router;