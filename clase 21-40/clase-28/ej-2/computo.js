const calculo = () => {
    let sum = 0
    for (let i = 0; i < 6e9; i++) {
        sum += i
    }
    return sum
}

process.on('exit', (code) => {
    console.log(`exit with code ${code}`)
})

process.on('message', msg => {
    console.log(`worker #${process.pid} iniciando su tarea`)
    const sum = calculo()
    process.send(sum)
    console.log(`worker #${process.pid} finalizó su tarea`)
    process.exit()
})

process.send('ready')