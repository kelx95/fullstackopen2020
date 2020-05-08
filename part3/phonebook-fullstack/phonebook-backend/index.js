require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

//git subtree push --prefix part3/phonebook-fullstack/phonebook-backend heroku master
//initialize express app
const app = express()
//middlewares
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', function (req) {
    if (req.method !== 'POST') return ' '
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then((persons) => {
            //console.log(persons)
            res.json(persons.map(person => person.toJSON()))
        })
})

app.get('/info', (req, res) => {
    Person.find({})
        .then(persons => {
            const info = `Phonebook has info for ${persons.length} people 
            <br/><br/>
            ${new Date().toUTCString()}`
            res.send(info)
        })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById((req.params.id))
        .then(person => {
            if (person) {
                res.json(person.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            console.log('delete', result)
            if (result) {
                res.status(204).end()
            } else {
                res.status(404).end()
            }

        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (body.name === undefined) {
        return res.status(400).json({
            error: 'name missing..'
        })
    }
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save()
        .then(savedPerson => {
            console.log(`added ${savedPerson.name} nubmer ${savedPerson.number}`)
            res.json(savedPerson.toJSON())
        })
        .catch(error => {
            res.status(409).json({
                message: error.message
            })
        })
})

app.put('/api/persons/:id', (req, res, next) => {
    // if(req.body.name && req.body.number) {
    //     const updatedPerson = {
    //         name: req.body.name,
    //         number: req.body.number
    //     }
    //     Person.findByIdAndUpdate(req.params.id, updatedPerson)
    //     .then(returnedObject => {
    //         console.log(`Updated ${returnedObject.name}`)
    //         const toSend = {
    //             ...updatedPerson,
    //             id: returnedObject._doc._id
    //         }
    //         res.json(toSend)
    //     })
    // }
    const body = req.body
    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate()
    Person.findByIdAndUpdate(req.params.id, person, {
        new: true,
    })
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

const unkownEndpoint = (request, response) => {
    response.status(404).send({
        error: 'unkown endpoint'
    })
}
app.use(unkownEndpoint)
const errorHandler = (error, request, response, next) => {
    // eslint-disable-next-line eqeqeq
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({
            error: 'check your id...'
        })
    }
    next(error)
}
app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)