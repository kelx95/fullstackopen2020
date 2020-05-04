import React from 'react'

const PersonForm = ({ name, setName, number, setNumber, submitOnClick }) => {
    return (
        <form>
            <div>
                name: <input
                    type="text"
                    placeholder="Enter your name"
                    name="newName"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
            </div>
            <div>
                number: <input
                    type="tel"
                    placeholder="39-44-5323523"
                    name="newNumber"
                    value={number}
                    onChange={(event) => setNumber(event.target.value)}
                    pattern="[0-9]{2}-[0-9]{2}-[0-9]{7}"
                    required
                />
            </div>
            <div>
                <button
                    type="submit"
                    name="submit"
                    onClick={(event) => {
                        submitOnClick(event)
                        setNumber('');
                        setName('');
                    }}>
                    add
          </button>
            </div>
        </form>
    )
}
export default PersonForm