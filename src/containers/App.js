import React, { Component } from 'react';
import './App.css';

import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";

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
    let persons = null;
    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        click={(person) => this.deletePersonHandler(person.id)}
        changed={(event, person) => this.nameChangedHandler(event, person.id)}
      />;
    }

    return (
      <div className="App">
        <Cockpit
          state={this.state.showPersons}
          click={this.togglePersonsHandler}
        />
        {persons}
      </div>
    );
  }
}

export default App;
