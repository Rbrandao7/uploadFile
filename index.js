const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const multiparty = require('multiparty')
var serveStatic = require('serve-static')
const pathUtils = require('path');
const fs = require('fs');

const imgDir = pathUtils.resolve(__dirname,'img-upload');
if(!fs.existsSync(imgDir)) fs.mkdirSync(imgDir)


app.use(serveStatic('t', { 'index': ['index.html', 'index.htm'] }))

app.post('/api/uploadfile',(req,res)=>{
    const form = new multiparty.Form()
    form.parse(req, async (err,fields,files)=>{
        if(err) return res.status(500).send({error:'erro ao subir arquivo'})
        console.log(files.['files[]'][0])
        res.status(210).send({sucess:'upload complete'})
    })
})


app.listen(port,(e)=>{
    console.log('servidor rodando')
});

