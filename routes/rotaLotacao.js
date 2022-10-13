const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;
const lotacao = [
    {
        "id":1,
        "idemp":1,
        "idusu":1,
        "idpat":1,
        "idset":1,
        "lotacao":"2022_08_31"

    },
    {
        "id":2,
        "idem":1,
        "idusu":1,
        "idpat":1,
        "idset":1,
        "lotacao":"2022_08_31"
    },
    {
        "id":3,
        "idem":1,
        "idusu":1,
        "idpat":1,
        "idset":1,
        "lotacao":"2022_08_31"
    },
    {
        "id":4,
        "idem":1,
        "idusu":1,
        "idpat":1,
        "idset":1,
        "lotacao":"2022_08_31"
    },
    {
        "id":5,
        "idem":1,
        "idusu":1,
        "idpat":1,
        "idset":1,
        "lotacao":"2022_08_31"
    },
    
]


//para consultar todos os dados
router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            `SELECT lotacao.id,usuario.nome as 
            usuario,patrimonio.nome as patrimonio, 
            empresa.nome as empresa,setor.nome as setor, 
            lotacao.lotacao FROM lotacao 
            INNER JOIN usuario on lotacao.idusu=usuario.id 
            INNER JOIN empresa on lotacao.idemp=empresa.id 
            INNER JOIN patrimonio on lotacao.idpat=patrimonio.id 
            INNER JOIN setor on lotacao.idset=setor.id ORDER BY lotacao.id;`,
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(200).send({
                    mensagem: "aqui é a lista de lotação!!!",
                    lotacao: resultado
                    // usuario:usuario[1].nome
                })
            }
        )
    })


    // res.status(200).send({
    //     mensagem: "aqui é a lista de Lotação!!!",
    //     lotacao: lotacao
    // })

})
//para consultar um determinado cadastro
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    // let listalotacao=lotacao.filter(value=>value.id==id);
    // res.status(200).send({
    //     mensagem: `aqui é a lista de Lotação com id:${id}`,
    //     lotacao:listalotacao

    // })
    mysql.getConnection((error, conn) => {
        conn.query(
            `SELECT lotacao.id,usuario.nome as 
            usuario,patrimonio.nome as patrimonio, 
            empresa.nome as empresa,setor.nome as setor, 
            lotacao.lotacao FROM lotacao 
            INNER JOIN usuario on lotacao.idusu=usuario.id 
            INNER JOIN empresa on lotacao.idemp=empresa.id 
            INNER JOIN patrimonio on lotacao.idpat=patrimonio.id 
            INNER JOIN setor on lotacao.idset=setor.id WHERE id=?`,[id],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                res.status(200).send({
                    mensagem: "aqui é a lista de lotação!!!",
                    lotacao: resultado
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
  
    const lotacao = {
        idusu: req.body.idusu,
        idemp: req.body.idemp,
        idpat: req.body.idpat,
        idset: req.body.idset,
        lotacao: req.body.lotacao

    }
 
    mysql.getConnection((error, conn) => {
        conn.query(
            "INSERT INTO `lotacao`(idusu, idemp, idpat, idset, lotacao) values(?,?,?,?,?)",
            [lotacao.idusu, lotacao.idemp, lotacao.idpat, lotacao.idset, lotacao.lotacao],
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
                    lotacao: resultado.insertId
                    // usuario:usuario[1].nome
                })
            }
        )
    })
    }

)
//para alterar dados salvos no banco
router.patch('/', (req, res, next) => {
    let msg=[];
    let i=0;
    const { id, idemp, idusu, idset, idpat,  } = req.body;
    const array_alterar=[{
        id:id,
        idemp:idemp,
        idpat:idpat,
        idset:idset,
        idusu: idusu
    }]
    let lista=lotacao.map(item=>{

        return(
            item.empresa=empresa,
            item.setor=setor,
            item.responsavel=responsavel,
            item.datalotacao=datalotacao
            )
    });

    if(empresa.length==0){

            msg.push({mensagem:"Empresa válido!"})
            i++;
    }
    if(setor.length==0){

            msg.push({mensagem:"Setor válido!"})
            i++;
    }
    if(responsavel.length==0){

            msg.push({mensagem:"Responsável válido!"})
            i++;
    }
    if(datalotacao.length==0){

            msg.push({mensagem:"Data lotação válido!"})
            i++;
    }
    if(i==0){
    //     res.status(201).send({
    //         mensagem:"Dados Alterados!",
    //         dados:dadosalterados
    //     });
    // } else {
    //         res.status(400).send({
    //         mensagem:msg
    //     })
    mysql.getConnection((error, conn) => {
        conn.query(
            "UPDATE `lotacao` set idusu=?, idemp=?, idpat=?, idset=?, lotacao=? where id=?",
            [idusu, idemp, idpat, idset, lotacao],
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


    res.status(201).send(
        {
            mensagem: "Dados alterados com sucesso!!!"
        }
    )
})

//para apagar dados do banco
router.delete("/:id", (req, res, next) => {
    const { id } = req.params;
    // let dadosdeletados=lotacao.filter(value=>value.id==id);
    // let listalotacao=lotacao.filter(value=>value.id!=id);
    // res.status(201).send(
    //     {
    //         mensagem: "Dados deletados com sucesso",
    //         dadosnovos:listalotacao,
    //         deletados:dadosdeletados
    //     }
    // )
    mysql.getConnection((error, conn) => {
        conn.query(
            `DELETE from lotacao WHERE id=${id}`,
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