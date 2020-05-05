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

morgan.token('body', function(req) {
    if (req.method !== 'POST') return ' ' 
    return JSON.stringify(req.body)
  })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get("/api/persons", (req, res) => {
    Person.find({})
        .then((persons) => {
            //console.log(persons)
            res.json(persons.map(person => person.toJSON()))
        })
})

app.get("/info", (req, res) => {
    Person.find({})
        .then(persons => {
            const info = `Phonebook has info for ${persons.length} people 
            <br/><br/>
            ${new Date().toUTCString()}`
            res.send(info)
        })
})

app.get("/api/persons/:id", (req, res) => {
    Person.find({_id: req.params.id})
        .then(person => person.length == 1 ? res.json(person) : res.status(404).end)  
})

app.delete("/api/persons/:id", (req, res) => {
    Person.findByIdAndDelete({_id: req.params.id})
    .then((result) => {
        console.log("Deleted this object", result)
        res.status(204).end()      
    })
})

app.post("/api/persons", (req, res) => {
    if(req.body.name && req.body.number){
        const newPerson = new Person({
            name: req.body.name,
            number: req.body.number
        })
        newPerson.save()
        .then(newPerson => {
            console.log(`added ${newPerson.name} nubmer ${newPerson.number}`)
            res.json(newPerson)          
        })
    }
})

app.put("/api/persons/:id", (req, res) => {
    if(req.body.name && req.body.number) {
        const updatedPerson = {
            name: req.body.name,
            number: req.body.number 
        }
        Person.findByIdAndUpdate(req.params.id, updatedPerson)
        .then(returnedObject => {
            console.log(`Updated ${returnedObject.name}`)
            const toSend = {
                ...updatedPerson,
                id: returnedObject._doc._id
            }
            res.json(toSend)
        })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

// const generateId = () => 
//     parseInt(Math.random() * 100000000, 10)
  
// app.post("/api/persons", (req, res) => {
//     if(req.body.name && req.body.number){
//         //console.log(req.body.name)
//         const checkName = persons.find(person => person.name === req.body.name)
//         //console.log(checkName)
//         if(checkName===undefined){
//             const newPerson = {
//                 name: req.body.name,
//                 number: req.body.number,
//                 id: generateId()
//             }
//             //console.log(newPerson)
//             persons.push(newPerson)
//             res.json(newPerson)
//             //console.log(persons)
//         }else {
//             res.status(400).json({
//                 error: "name must be uinque"
//             })
//         }
//     } else {
//         res.status(400).json({
//             error: "name or number is missing"
//         })
//     }
// })
