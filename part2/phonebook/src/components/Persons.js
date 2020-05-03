import React from 'react'

const Persons = ({ persons, newFilter, handleClickDelete }) => persons
    .map(person =>
        (person.name.toLowerCase().startsWith(newFilter.toLowerCase()))
            ? <div key={person.id}>
                <p
                    style={{ display: 'inline-block' }}
                >
                    {person.name} {person.number}
                </p>&nbsp;
                <button onClick={(event) => handleClickDelete(event, person)}>delete</button>
            </div>
            : null
    )
export default Persons