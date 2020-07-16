const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const multiparty = require('multiparty')


app.post('/api/uploadfile',(req,res)=>{
    const form = new multiparty.Form()
    form.parse(req,(err,fields,files)=>{
        if(err) return res.status(500).send({error:'erro ao subir arquivo'})
        console.log(files)
    })
})


app.listen(port,(e)=>{
    console.log('servidor rodando')
});

