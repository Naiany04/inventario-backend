const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;
const setor = [
    {
        "id": 1,
        "nome": "Financeiro"
    },
    {
        "id": 2,
        "nome": "Gerencia"
    },
    {
        "id": 3,
        "nome": "noe"
    },
    {
        "id": 4,
        "nome": "idk"
    },
    {
        "id": 5,
        "nome": "Tesouraria"
    }

]


//para consultar todos os dados
router.get('/', (req, res, next) => {

    // res.status(200).send({
    //     mensagem: "aqui é a lista de Setores!!!",
    //     setor: setor
    // })
    mysql.getConnection((error, conn) => {
        conn.query(
            "select * from `setor`",
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(200).send({
                    mensagem: "aqui é a lista de Setores!!!",
                    setor: resultado
                    // usuario:usuario[1].nome
                })
            }
        )
    })

})
//para consultar um determinado cadastro
router.get('/:idsetor', (req, res, next) => {
    const id = req.params.idsetor;
    // let listasetor=setor.filter(value=>value.id==id);
    // res.status(200).send({
    //     mensagem: `aqui é a lista de Setores com id:${id}`,
    //     setor:listasetor
    mysql.getConnection((error, conn) => {
        conn.query(
            "select * from `setor` WHERE id=?", [id],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(200).send({
                    mensagem: "aqui é a lista de Setores!!!",
                    setor: resultado
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

    const setor = {
        nome: req.body.nome
    }
    if (setor.nome.length < 3) {
        msg.push({ mensagem: "campo com menos de 3 caracteres!" })
        i++;
    }

    if (i == 0) {
        //     res.status(201).send({
        //         mensagem:"Dados inseridos!",
        //         setorCriado:setor
        //     });
        // } else {
        //         res.status(400).send({
        //         mensagem:msg,
        //     })
        mysql.getConnection((error, conn) => {
            conn.query(
                "INSERT INTO `setor`(nome) values(?)",
                [setor.nome],
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
                        setor: resultado.insertId
                        // usuario:usuario[1].nome
                    })
                }
            )
        })
    }

}
)
//para alterar dados salvos no banco
router.patch('/', (req, res, next) => {
    let msg = [];
    let i = 0;
    const { id, nome } = req.body;
    const array_alterar = [{
        id: id,
        nome: nome
    }]
    let lista = setor.map(item => {
        // if(item==id){
        return (
            item.nome = nome
        )
    });
    if (nome.length < 3) {
        msg.push({ mensagem: "campo com menos de 3 caracteres!" })
        i++;
    }

    // if(responsavel.length==0){

    //         msg.push({mensagem:"Responsável válido!"})
    //         i++;
    // }
    if (i == 0) {
        //     res.status(201).send({
        //         mensagem:"Dados Alterados!",
        //         dados:dadosalterados
        //     });
        // } else {
        //         res.status(400).send({
        //         mensagem:msg
        //     })
        // }


        // res.status(201).send(
        //     {
        //         mensagem: "Dados alterados com sucesso!!!"
        //     }
        // )
        mysql.getConnection((error, conn) => {
            conn.query(
                "UPDATE `setor` set nome=? where id=?",
                [nome, id],
                (error, resultado, field) => {
                    conn.release();
                    if (error) {
                        return res.status(500).send({
                            error: error,
                            response: null
                        })
                    }
                    console.log(error);
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
})

//para apagar dados do banco
router.delete("/:id", (req, res, next) => {
    const { id } = req.params;
    // let dadosdeletados = setor.filter(value => value.id == id);
    // let listasetor = setor.filter(value => value.id != id);
    // res.status(201).send(
    //     {
    //         mensagem: "Dados deletados com sucesso",
    //         dadosnovos: listasetor,
    //         deletados: dadosdeletados
    //     }
    // )
    mysql.getConnection((error, conn) => {
        conn.query(
            `DELETE from setor WHERE id=${id}`,
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