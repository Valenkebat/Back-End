const express = require('express')

const app = express()
const PORT = 8080


/** Usando REQ.PARAMS localhost:8080/api/sumar/4/5 */
app.get('/api/sumar/:numA/:numB', (req, res) => {
    const { numA, numB} = req.params
    if (isNaN(numA) || isNaN(numB)){
        return res.send({error: "Error el parametro ingresado no es un numero"})
    }
    
    return res.send({suma: Number(numA) + Number(numB) })
})

/** Usando REQ.QUERY  localhost:8080/api/sumar?numA=5&numB=62 */
app.get('/api/sumar', (req, res) => {
    const { numA, numB} = req.query
    if (isNaN(numA) || isNaN(numB)){
        return res.send({error: "Error el parametro ingresado no es un numero"})
    }
    
    return res.send({suma: Number(numA) + Number(numB) })
})

app.get('/api/sumar/:operacion', (req, res) => {
    const { operacion} = req.params
    
    return res.send({ operacion: eval(operacion)})
})


app.post('/api/', (req, res) => {
  
    res.send("Ok Post")
})

app.put('/api/', (req, res) => {
  
    res.send("Ok Put")
})

app.delete('/api/', (req, res) => {
  
    res.send("Ok delete")
})

const server = app.listen(PORT, () => {
    console.log('Servidor HTTP escuchando en el puerto ' + PORT)
})