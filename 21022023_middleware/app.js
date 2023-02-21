const express = require('express');
const app = express();
const PORT = 3000;

const logger = (req, res, next) => {
    console.log(req.originalUrl)
    return next();
}

const animalMiddleare = (req, res, next) => {
    next()
    console.log('i am animal middleware')
}

const employees = [
    { id: 1, name: 'Sarah', age: 30 },
    { id: 2, name: "Jhon", age: 20 }]

app.use(logger)
app.use('/employee/:id', (req, res, next) => {
    const id = req.params.id;
    for (const employee of employees) {
        if (employee.id == id) {
            req.employee = employee;
            return next();
        }
    }
    res.redirect('/login')
})

app.get('/login', (req, res) => {
    res.send('Login page')
})

app.get('/', (req, res) => {
    res.send('Welcome page')
})

app.get('/animal', animalMiddleare, (req, res) => {
    console.log('animal controller')
    res.send('Animal page')
})

app.get('/employee', (req, res) => {
    res.send('Employee page')
})

app.get('/employee/:id', (req, res) => {
    res.send(`Employee page with id ${req.employee.id} name: ${req.employee.name} and age: ${req.employee.age} `)
})


app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})