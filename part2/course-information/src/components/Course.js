import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({ course }) =>
    <div>
        <h1>Web development curriculum</h1>
        {course.map((course, i) =>
            (
                <div key={i}>
                    <Header name={course.name} />
                    <Content parts={course.parts} />
                    <Total parts={course.parts} />
                </div>
            )
        )}
    </div>

export default Course


