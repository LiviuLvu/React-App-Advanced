import React, { Component } from 'react';
import './App.css';

import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {id:'0',  name: 'Dinamy', age:20},
      {id:'1', name: 'Coco', age:30}
    ],
    otherState: 'some other value',
    showPersons: false
  };

  nameChangedHandler = (event, id) => {
    let newPersons = [...this.state.persons];
    newPersons[id].name = event.target.value;
    this.setState({
      persons: newPersons
    })
  };

  deletePersonHandler = (i) => {
    const persons = [...this.state.persons];
    persons.splice(i, 1);
    this.setState({
      persons: persons
    })
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    });
  };

  render() {
    const btnCtrlDisplay = {
      padding: '20px',
      border: 'none',
      backgroundColor: 'green',
      color: '#FFF',
      fontSize: '18px'
    };

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map( (person) => {
            return (<Person
              click={() => this.deletePersonHandler(person.id)}
              changed={(event) => this.nameChangedHandler(event, person.id)}
              key={person.id}
              name={person.name}
              age={person.age} />
            )
          })}
        </div>
      );
      btnCtrlDisplay.backgroundColor = 'red';
    }

    return (
      <div className="App">
        <h1>React app</h1>
        <button
          style={btnCtrlDisplay}
          onClick={this.togglePersonsHandler}>Display Switch</button>
          {persons}
      </div>
    );
  }
}

export default App;
