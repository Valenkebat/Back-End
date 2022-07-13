const args = process.argv


process.on('exit', code => {
    if (code){
        console.log(`exit with code ${code}`)
    } else {
        console.log('exit...')
    }
})

process.on('uncaughtException', error => {
    console.log(error)
    switch(error.description){
        case 'input empity': return process.exit(-4)
        case 'type error': return process.exit(-5)
        default: return process.exit()
    }
})

function validator(nums){
    if(nums.length == 0){
        throw {
            description: 'input empty'
        }
    }

    for(let num of nums){
        let val = Number(num)
        if(isNaN(val)){
            throw{
                description: 'type error',
                numbers: nums,
                types: nums.map(n => isNaN(n) ? typeof n : 'number')
            }
        }
    }
}

function avg(nums){
    let total = 0
    for (const num of nums) {
        const val = Number(num)
        total += val
    }
    return total / nums.length
}

const nums = args.slice(2)
validator(nums)
const avgC = avg(nums)
const max = Math.max(...nums)
const min = Math.min(...nums)
const exe = process.execPath.split('/').pop()
const pid = process.pid

const datos = {
    nums,
    avgC,
    max,
    min,
    exe,
    pid
}

console.log(datos)