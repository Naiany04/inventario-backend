const express = require('express');
const app = express();

app.use("/listausuarios",(req, res, next)=>{
    res.status(200).send({
        mensagem:"aqui é a lista de usuários!!!",
        nome: "Naiany"
    })
});
app.use((req, res, next)=>{
    const erro = new Error("Não encontrado!");
    erro.sttaus(404);
    next(erro);
});
app.use((error, req, resp, next)=>{
    res.status(error.status || 500);
    return res.json({
        erro:{
            mensagem:mensagem.mensagem
        }
    })
})
// app.use("/listapatrimonio",(req, res, next)=>{
//     res.status(200).send({
//         mensagem:"aqui é a lista de patrimonio!!!",
//         nome: "Naiany"
//     })
// });
// app.use("/somar",(req, res, next)=>{
//     const a=2;
//     const b=5;
//     let total=0;
//     total=a+b;
//     console.log(total);
//         res.status(200).send(
//             {resultado:total}
//         )
// });
// app.use("/resultado",(req, res, next)=>{
//     const a=2;
//     const b=5;
//     const c=8;
//     const d=10;
//     let media=0;
//     let situacao="";
//     let total=0;
//     total=a+b+c+d;
//     media=total/4;
//     if(media>7){
//         situacao="Reprovado"
//     } else{
//         situacao="Aprovado"
//     }
//         res.status(200).send(
//             {
//                 nome:"NAIANY",
//                 nota1:a,
//                 nota2:b,
//                 nota3:c,
//                 nota4:d,

//                 resultado:total,
//                 media:media,
//                 situacao:situacao
//             }
//         )
// });

module.exports = app