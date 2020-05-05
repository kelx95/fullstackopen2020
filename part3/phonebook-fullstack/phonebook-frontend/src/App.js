import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

//npx json-server --port 3001 --watch db.json - to start fake rest api
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successfulOperation, setSuccessfulOperation] = useState('')
  const [colorNotification, setColorNotification] = useState('')

  useEffect(()=>{
    personsService.getAll()
      .then(persons => setPersons(persons))
  }, [])
  
  const fiveSeconds = () => {
    setTimeout(() => {
      setSuccessfulOperation('')
    }, 5000) 
  }
  const handleClickSubmit = (event) => {
    const personIsFound = [...persons].find(person => person.name === newName);
    console.log("found name object", personIsFound)
    if(personIsFound){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)){
        console.log(personIsFound)
        personsService.updatePeson(personIsFound.id, {
          ...personIsFound,
          number: newNumber
        })
        .then(returnedPerson => {
          console.log("update",returnedPerson);
         setPersons(persons.map(person => person.id !== returnedPerson.id 
          ? person 
          : returnedPerson))
          console.log(persons)
          setColorNotification('greenNotification')
          setSuccessfulOperation(`The number of ${returnedPerson.name} is changed`)
          fiveSeconds()     
        })
        .catch(err => {
          setColorNotification('redNotification')
          setSuccessfulOperation(`Information of ${newName} has already been removed from server`)
          fiveSeconds()
          personsService.getAll()
            .then(persons => setPersons(persons))
        })
      } 
    } else {
      personsService.create({
        name: newName,
        number: newNumber
      })
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setColorNotification('greenNotification')
        setSuccessfulOperation(`Added ${returnedPerson.name}`)
        fiveSeconds()      
      })
    } 
    event.preventDefault();
  }

  const handleClickDelete = (event, passedPerson) => {
    const id =passedPerson.id;
    const name = passedPerson.name;
    if(window.confirm(`Delete ${name} ?`)){
      personsService
      .deletePerson(id)
      .then(() => {
       setPersons(persons.filter(person => person.id !== id))
       setColorNotification('redNotification')
        setSuccessfulOperation(`Deleted ${name}`)
        fiveSeconds()   
      })
      .catch(err => {
        setColorNotification('redNotification')
        setSuccessfulOperation(`Information of ${name} has already been removed from server`)
        fiveSeconds()
        personsService.getAll()
          .then(persons => setPersons(persons))
      })
    } 
    event.preventDefault();
  }

  const handleOnChangeFilter = filter => setNewFilter(filter)
  const handleOnChangeNewName = name => setNewName(name)
  const handleOnChangeNewNumber = number => setNewNumber(number)
  
  console.log(persons)
  return (
    <div>
      <h2>Phonebook</h2>
      { successfulOperation && <Notification message={successfulOperation} colorNotification={colorNotification} />}
      <Filter filter={handleOnChangeFilter} />
      <h2>add a new</h2>
      <PersonForm
        submitOnClick={handleClickSubmit}
        name={newName}
        number={newNumber}
        setName={handleOnChangeNewName}
        setNumber={handleOnChangeNewNumber}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        newFilter={newFilter} 
        handleClickDelete={handleClickDelete}
      />
    </div>
  )
}
export default App


// import React, { useState } from 'react'

// const App = () => {
//   const [persons, setPersons] = useState([
//     { name: 'Arto Hellas', number: '040-123456' },
//     { name: 'Ada Lovelace', number: '39-44-5323523' },
//     { name: 'Dan Abramov', number: '12-43-234345' },
//     { name: 'Mary Poppendieck', number: '39-23-6423122' }
//   ])

//   const [newName, setNewName] = useState('')
//   const [newNumber, setNewNumber] = useState('')
//   const [newFilter, setNewFilter] = useState('')

//   const handleClick = (event) => {
//     const issInArray = [...persons].find(person => person.name === newName);
//     issInArray ? alert(`${newName} is already added to phonebook`)
//       : setPersons(persons.concat({
//         name: newName,
//         number: newNumber
//       }))
//     event.preventDefault();
//   }
//   return (
//     <div>
//       <h2>Phonebook</h2>
//       filter shown with <input
//         type="text"
//         name="filterName"
//         onChange={(event) => setNewFilter(event.target.value) }
//       />
//       <br />
//       <h2>add a new</h2>
//       <form>
//         <div>
//           name: <input
//             type="text"
//             placeholder="Enter your name"
//             name="newName"
//             value={newName}
//             onChange={(event) => setNewName(event.target.value)}
//             required
//           />
//         </div>
//         <div>
//           number: <input
//             type="tel"
//             placeholder="39-44-5323523"
//             name="newNumber"
//             value={newNumber}
//             onChange={(event) => setNewNumber(event.target.value)}
//             pattern="[0-9]{2}-[0-9]{2}-[0-9]{7}"
//             required
//           />
//         </div>
//         <div>
//           <button
//             type="submit"
//             onClick={(event) => handleClick(event)}>
//             add
//           </button>
//         </div>
//       </form>
//       <h2>Numbers</h2>
//     {persons.map(person =>
//       (person.name.toLowerCase().startsWith(newFilter.toLowerCase()))
//       ?<p key={person.name}>{person.name} {person.number}</p>
//       :null
//       )}
//     </div>
//   )
// }
// export default App