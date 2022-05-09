const fs = require('fs')

fs.promises.readFile('./info.txt','utf-8')
    .then(contenido => {
        console.log('lectura exitosa')
        const info = JSON.parse(contenido)
        console.log(info)

        const packageJsonObj = info.contenidoObj

        packageJsonObj.author = 'CoderHouse'

        fs.promises.writeFile('package.json.coder', JSON.stringify(packageJsonObj), null, 2)
        .then(() => { console.log('package.json.coder:  Escritura Exitosa' )})
        .catch(err =>{
            console.log('err :>> ', err);
        })

    })
    .catch(e =>{
        console.log('Error en lectura: ', e)
    })