import React from 'react'

const SearchInput = ({ handleSearchChange }) => {
    return (
        <div>
            find countries <input
                type="text"
                name="search"
                placeholder="search a country"
                onChange={(event) => handleSearchChange(event.target.value)}
            />
        </div>
    )
}
export default SearchInput