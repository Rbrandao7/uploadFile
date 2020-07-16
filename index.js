const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const multiparty = require('multiparty')
var serveStatic = require('serve-static')

app.use(serveStatic('t', { 'index': ['index.html', 'index.htm'] }))

app.post('/api/uploadfile',(req,res)=>{
    const form = new multiparty.Form()
    form.parse(req,(err,fields,files)=>{
        if(err) return res.status(500).send({error:'erro ao subir arquivo'})
        console.log(files)
        res.status(210).send({sucess:'upload complete'})
    })
})


app.listen(port,(e)=>{
    console.log('servidor rodando')
});

