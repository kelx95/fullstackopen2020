import React from 'react'

const CountryDetails = ({ countries, handleSearchChange, weather }) =>
    (countries.length === 1)
        ? countries.map((country, k) =>
            <div key={k}>
                <h1>{country.name}</h1>
                <p>
                    {`capital ${country.capital}`}<br />
                    {`population ${country.population}`}
                </p>
                <h2>languages</h2>
                <ul>
                    {country.languages.map((language, k) => <li key={k}>{language.name}</li>)}
                </ul>
                <img
                    src={country.flag}
                    alt={country.name}
                    style={{ width: "70px", height: "50px" }}
                />
                { weather.map(weather => 
                <div key={weather.location.name}>
                    <h2>Weather in {weather.location.name}</h2>
                    <p><strong>temperature:</strong> {weather.current.temperature} Celcius</p>
                    <img
                    src={weather.current.weather_icons}
                    alt={weather.current.descriptions}
                />
                    <p><strong>wind:</strong> {weather.current.wind_speed} mph  {weather.current.wind_dir}</p>
                </div> )}
                
            </div>
        )
        : (countries.length <= 10)
            ? countries.map((country, k) =>
                <div
                    key={k}
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "baseline"
                    }}>
                    <p>{country.name}</p>
                    <button
                        onClick={() => handleSearchChange(country.name.toLowerCase())}
                    >show</button>
                </div>
            )
            : <p>Too many matches, specify another filter</p>

export default CountryDetails;


// import React from 'react'

// const CountryDetails = ({ countries, handleSearchChange, setNewSearch }) =>
//     (countries.length === 1)
//         ? countries.map((country, k) => {
//             return (
//                 <div key={k}>
//                     <h1>{country.name}</h1>
//                     <p>
//                         {`capital ${country.capital}`}<br />
//                         {`population ${country.population}`}
//                     </p>
//                     <h2>languages</h2>
//                     <ul>
//                         {
//                             country.languages.map((language, kk) => {
//                                 return (
//                                     <li key={kk}>{language.name}</li>
//                                 )
//                             })
//                         }
//                     </ul>
//                     <img
//                         src={country.flag}
//                         alt={country.name}
//                         style={{ width: "70px", height: "50px" }}
//                     />
//                 </div>
//             )
//         })
//         : (countries.length <= 10)
//             ? countries.map((country, kkk) => {
//                 return (
//                     <div
//                         key={kkk}
//                         style={{
//                             display: "flex",
//                             justifyContent: "flex-start",
//                             alignItems: "baseline"
//                         }}>
//                         <p>{country.name}</p>
//                         <button
//                             onClick={() => { 
//                                 handleSearchChange(country.name.toLowerCase())                             
//                             }}
//                         >show</button>
//                     </div>
//                 )
//             })
//             : <p>Too many matches, specify another filter</p>

// export default CountryDetails;