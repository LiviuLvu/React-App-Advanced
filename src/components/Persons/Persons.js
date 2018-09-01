import React from 'react';
import Person from "./Person/Person";

const Persons = (props) => props.persons.map( (person) => {
    return (<Person
        click={(person) => props.click(person)}
        changed={(event) => props.changed(event, person)}
        key={person.id}
        name={person.name}
        age={person.age} />
    )
  });

export default Persons;