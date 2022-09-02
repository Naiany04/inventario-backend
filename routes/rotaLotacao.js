const express = require('express');
const router = express.Router();
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

    res.status(200).send({
        mensagem: "aqui é a lista de Lotação!!!",
        lotacao: lotacao
    })

})
//para consultar um determinado cadastro
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    let listalotacao=lotacao.filter(value=>value.id==id);
    res.status(200).send({
        mensagem: `aqui é a lista de Lotação com id:${id}`,
        lotacao:listalotacao

    })

})
//para enviar dados para salvar no banco
router.post('/', (req, res, next) => {
    let msg=[];
    let i=0;

    const empresa = {
        nome: req.body.nome,
        responsavel: req.body.responsavel,
        contato: req.body.contato
    }
    if(lotacao.nome.length<3){
        msg.push({mensagem:"campo com menos de 3 caracteres!"})
        i++;
    }

    if(i==0){
        res.status(201).send({
            mensagem:"Dados inseridos!",
            lotacaoCriada:lotacao
        });
    } else {
            res.status(400).send({
            mensagem:msg,
        })
    }

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
        res.status(201).send({
            mensagem:"Dados Alterados!",
            dados:dadosalterados
        });
    } else {
            res.status(400).send({
            mensagem:msg
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
    let dadosdeletados=lotacao.filter(value=>value.id==id);
    let listalotacao=lotacao.filter(value=>value.id!=id);
    res.status(201).send(
        {
            mensagem: "Dados deletados com sucesso",
            dadosnovos:listalotacao,
            deletados:dadosdeletados
        }
    )
})

module.exports = router;