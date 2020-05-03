import React from 'react'

const Total = ({ parts }) =>
    <p style={{ fontWeight: "bold" }}>
        total of {
            parts.reduce((sum, course) => sum + course.exercises, 0)
        } exercises
    </p>

export default Total