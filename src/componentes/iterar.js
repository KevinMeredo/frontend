const obj = { Dia: '22/09/2023' }
console.log(obj)

obj && Object.entries(obj).
    forEach(([key, value]) => {
        console.log(key)
    })
