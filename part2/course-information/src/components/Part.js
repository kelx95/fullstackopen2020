import React from 'react'

const Part = ({ parts }) => (
    parts.map((p) =>
        <p key={p.id}>{p.name} {p.exercises}</p>
    )
)
export default Part
