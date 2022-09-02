const express = require('express');
const router = express.Router();
const empresa = [
    {
        "id":1,
        "nome":"CSM",
        "responsável":"Carlos",
        "contato":"0000-0000"

    },
    {
        "id":2,
        "nome":"PHT",
        "responsável":"Pedro",
        "contato":"0000-0000"
    },
    {
        "id":3,
        "nome":"JNS",
        "responsável":"Joaoneto",
        "contato":"0000-0000"
    },
    {
        "id":4,
        "nome":"Ray",
        "responsável":"Raysamuel",
        "contato":"0000-0000"
    },
    {
        "id":5,
        "nome":"Nay",
        "responsável":"Naiany",
        "contato":"0000-0000"
    }
    
]


//para consultar todos os dados
router.get('/', (req, res, next) => {

    res.status(200).send({
        mensagem: "aqui é a lista de Empresas!!!",
        empresa: empresa
    })

})
//para consultar um determinado cadastro
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    let listaempresa=empresa.filter(value=>value.id==id);
    res.status(200).send({
        mensagem: `aqui é a lista de Empresas com id:${id}`,
        empresa:listaempresa

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
    if(empresa.nome.length<3){
        msg.push({mensagem:"campo com menos de 3 caracteres!"})
        i++;
    }

    if(i==0){
        res.status(201).send({
            mensagem:"Dados inseridos!",
            empresaCriada:empresa
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
    const { id, nome, responsavel, contato } = req.body;
    const array_alterar=[{
        id:id,
        nome:nome,
        responsavel:responsavel,
        contato:contato
    }]
    let lista=empresa.map(item=>{

        return(
            item.nome=nome,
            item.responsavel=responsavel,
            item.contato=contato
            )
    });
    if(nome.length<2){
        msg.push({mensagem:"campo com menos de 2 caracteres!"})
        i++;
    }

    if(responsavel.length==0){

            msg.push({mensagem:"Responsável válido!"})
            i++;
    }
    if(contato.length==0){

            msg.push({mensagem:"Contato válido!"})
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
    let dadosdeletados=empresa.filter(value=>value.id==id);
    let listaempresa=empresa.filter(value=>value.id!=id);
    res.status(201).send(
        {
            mensagem: "Dados deletados com sucesso",
            dadosnovos:listaempresa,
            deletados:dadosdeletados
        }
    )
})

module.exports = router;