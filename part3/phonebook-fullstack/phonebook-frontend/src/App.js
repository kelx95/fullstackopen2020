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
  const [operation, setOperation] = useState('')
  const [colorNotification, setColorNotification] = useState('')

  useEffect(()=>{
    personsService.getAll()
      .then(persons => setPersons(persons))
  }, [])
  
  const fiveSeconds = () => {
    setTimeout(() => {
      setOperation('')
    }, 5000) 
  }

  const informationAlreadyRemovedFromServer = (name) => {
    setColorNotification('redNotification')
    setOperation(`Information of ${name} has already been removed from server`)
    fiveSeconds()
    personsService.getAll()
      .then(persons => setPersons(persons))
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
          setOperation(`The number of ${returnedPerson.name} is changed`)
          fiveSeconds()     
        })
        .catch(err => {
          informationAlreadyRemovedFromServer(newName)
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
        setOperation(`Added ${returnedPerson.name}`)
        fiveSeconds()      
      })
      .catch(error => {
        setColorNotification('redNotification')
        //setOperation(`Information of ${name} has already been removed from server`)
        console.log(error.response.data.message)
        setOperation(`${error.response.data.message}`)
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
       setOperation(`Deleted ${name}`)
        fiveSeconds()   
      })
      .catch(err => {
        informationAlreadyRemovedFromServer(name)
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
      { operation && <Notification message={operation} colorNotification={colorNotification} />}
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
