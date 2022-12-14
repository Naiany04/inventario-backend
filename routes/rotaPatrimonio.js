const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;
const patrimonio = [
    {
        "id":1,
        "nome":"Lápis"
    },
    {
        "id":2,
        "nome":"Caneta"
    },
    {
        "id":3,
        "nome":"Livro"
    },
    {
        "id":4,
        "nome":"And books"
    },
    {
        "id":5,
        "nome":"And more books"
    }
    
]

//para consultar todos os dados
router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            "select * from `patrimonio`",
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(200).send({
                    mensagem: "aqui é a lista de patrimônio!!!",
                    patrimonio: resultado
                    // usuario:usuario[1].nome
                })
            }
        )
    })
    // res.status(200).send({
    //     mensagem: "aqui é a lista de Patrimônios!!!",
    //     patrimonio: patrimonio
    // })

})
//para consultar um determinado cadastro
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    // let listapatrimonio=patrimonio.filter(value=>value.id==id);
    // res.status(200).send({
    //     mensagem: `aqui é a lista de Patrimônios com id:${id}`,
    //     patrimonio:listapatrimonio

    // })
    mysql.getConnection((error, conn) => {
        conn.query(
            "select * from `patrimonio` WHERE id=?",[id],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(200).send({
                    mensagem: "aqui é a lista de patrimônio!!!",
                    patrimonio: resultado
                    // usuario:usuario[1].nome
                })
            }
        )
    })

})
//para enviar dados para salvar no banco
router.post('/', (req, res, next) => {
    let msg=[];
    let i=0;

    const patrimonio = {
        nome: req.body.nome
    }
    if(patrimonio.nome.length<3){
        msg.push({mensagem:"campo com menos de 3 caracteres!"})
        i++;
    }

    if(i==0){
    //     res.status(201).send({
    //         mensagem:"Dados inseridos!",
    //         patrimonioCriado:patrimonio
    //     });
    // } else {
    //         res.status(400).send({
    //         mensagem:msg,
    //     })
    mysql.getConnection((error, conn) => {
        conn.query(
            "INSERT INTO `patrimonio`(nome) values(?)",
            [patrimonio.nome],
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
                    patrimonio: resultado.insertId
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
    let msg=[];
    let i=0;
    const { id, nome } = req.body;
    const array_alterar=[{
        id:id,
        nome:nome
    }]

    let lista=patrimonio.map(item=>{
        // if(item==id){
        return(
            item.nome=nome
            )
    });
    if(nome.length<3){
        msg.push({mensagem:"campo com menos de 3 caracteres!"})
        i++;
    }

    // if(responsavel.length==0){

    //         msg.push({mensagem:"Responsável válido!"})
    //         i++;
    // }
    if(i==0){
//         res.status(201).send({
//             mensagem:"Dados Alterados!",
//             dados:dadosalterados
//         });
//     } else {
//             res.status(400).send({
//             mensagem:msg
//         })
//     }


//     res.status(201).send(
//         {
//             mensagem: "Dados alterados com sucesso!!!"
//         }
//     )
// })

        mysql.getConnection((error, conn) => {
            conn.query(
                "UPDATE `patrimonio` set nome=? where id=?",
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
    // let dadosdeletados=patrimonio.filter(value=>value.id==id);
    // let listapatrimonio=patrimonio.filter(value=>value.id!=id);
    // res.status(201).send(
    //     {
    //         mensagem: "Dados deletados com sucesso",
    //         dadosnovos:listapatrimonio,
    //         deletados:dadosdeletados
    //     }
    // )

    mysql.getConnection((error, conn) => {
        conn.query(
            `DELETE from patrimonio WHERE id=${id}`,
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