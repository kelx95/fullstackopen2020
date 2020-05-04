import React from 'react'

const Filter = ({ filter }) => {
    return (
        <div>
            filter shown with <input
                type="text"
                name="filterName"
                onChange={(event) => filter(event.target.value)}
            />
            <br />
        </div>
    )
}

export default Filter;