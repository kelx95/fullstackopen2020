const express = require('express')
const morgan = require('morgan')

//initialize express app
const app = express()
//middlewares
app.use(express.json())
morgan.token('body', function(req) {
    if (req.method !== 'POST') return ' ' 
    return JSON.stringify(req.body)
  })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const persons = [{
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "Dan Abramovvv",
        "number": "43321",
        "id": 5
    },
    {
        "name": "kelment",
        "number": "3232322",
        "id": 6
    }
]

app.get("/api/persons", (req, res) => {
    res.send(JSON.stringify(persons))
})

app.get("/info", (req, res) => {
    const info = `Phone book has info for ${persons.length} people 
      <br/><br/>
      ${new Date().toUTCString()}`
    res.send(info)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const founded = persons.find(person => person.id == id)
    if (founded) {
        res.json(founded)
    } else {
        res.status(404).end()
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const founded = persons.find(person => person.id == id)
    if (founded) {
        //console.log(founded);
        //console.log(persons)
        //console.log(persons.indexOf(founded))
        persons.splice(persons.indexOf(founded), 1)
        //console.log(persons)
        res.status(204).end()
    } else {
        res.status(404).end()
    }
})

const generateId = () => 
    parseInt(Math.random() * 100000000, 10)
  
app.post("/api/persons", (req, res) => {
    if(req.body.name && req.body.number){
        //console.log(req.body.name)
        const checkName = persons.find(person => person.name === req.body.name)
        //console.log(checkName)
        if(checkName===undefined){
            const newPerson = {
                name: req.body.name,
                number: req.body.number,
                id: generateId()
            }
            //console.log(newPerson)
            persons.push(newPerson)
            res.json(newPerson)
            //console.log(persons)
        }else {
            res.status(400).json({
                error: "name must be uinque"
            })
        }
    } else {
        res.status(400).json({
            error: "name or number is missing"
        })
    }
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)