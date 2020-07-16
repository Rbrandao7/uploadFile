const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const multiparty = require('multiparty')
const pathUtils = require('path');
const fs = require('fs');
var crypto = require('crypto');
crypto.randomBytes(10, function (erro, resultado /*buffer*/) {
  if (erro) {throw erro;}
  console.log('Uma string aleatória de %d bytes: %s', resultado .length, resultado);
});

const imgDir = pathUtils.resolve(__dirname,'img-upload');
if(!fs.existsSync(imgDir)) fs.mkdirSync(imgDir)

app.use(express.static(__dirname));

app.post('/api/uploadfile',(req,res)=>{
    const form = new multiparty.Form()
    form.parse(req, (err,fields,files)=>{
        if(err) return res.status(500).send({error:'erro ao subir arquivo'})
        const image = files['files[]'][0];
        const timeStamp = Date.now();
        const dir = imgDir 
        const path = dir + '/'+timeStamp+'-'+image.originalFilename
        fs.mkdirSync(dir)
        console.log(image.path)
        console.log(path)
        fs.copyFileSync(image.path,path,(e)=>{console.log('arquivo salvo')})

        console.log()
        res.status(210).send({sucess:'upload complete',urlImage:'http://ufile-com.umbler.net/img-upload/'+timeStamp+'-'+image.originalFilename})
    })
})


app.listen(port,(e)=>{
    console.log('servidor rodando')
});

