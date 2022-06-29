const fs = require('fs')



try{
   fs.writeFileSync('./fyh.txt',new Date().toLocaleDateString())
} catch(err) {
    throw new Error ('error en la escritura '+ err)
}

try{
    const data = fs.readFileSync('./fyh.txt', 'utf-8')
    console.log(data)
} catch(err) {
    throw new Error ('error en la lectura '+ err)
}