const mongoose = require('mongoose')
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0-50oam.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
    //id: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Person = mongoose.model("Person", personSchema)
if (process.argv.length < 4) {
    Person.find({})
        .then(phonebooklist => {
            console.log(phonebooklist)
            let onScreen = 'phonebook:';
            phonebooklist.forEach(({name, number}) => onScreen += `\n${name} ${number}`);
            console.log(onScreen)
            mongoose.connection.close()
        })      
} 
else {
    const newPerson = new Person({
        name,
        number
        //id: (Math.floor(Math.random() * Date.now())).toString()
    })
    newPerson
        .save()
        .then(res => {
            console.log(`added ${res.name} nubmer ${res.number}`)
            return;            
        })
        .then(() => {
            mongoose.connection.close()
        })
    //to feed with data
    const persons = [{
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    },
    {
        name: "Dan Abramovvv",
        number: "43321"
    },
    {
        name: "kelment",
        number: "3232322"
    }
]
    //Person.insertMany(persons, function(error, docs) {});      
}