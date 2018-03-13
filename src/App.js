import React, { Component } from 'react';
import logo from './logo.svg';
import classes from './App.css';
import Person from './Components/Person';
import './Components/Person.css';
import Radium, { StyleRoot } from 'radium';

class App extends Component {

  state = {
    persons: [
      { id: 0, name: 'Max', age: 28 },
      { id: 1, name: 'Ciera', age: 25 },
      { id: 2, name: 'Bryce', age: 26 }
    ],
    showPersons: false
  }

  switchNameHandler = (newName) => {
    this.setState ({
      persons: [
        { name: newName, age: 28 },
        { name: 'Ciera', age: 25 },
        { name: 'Bryce', age: 36 }
      ]
    })
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({
      persons: persons
    });
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState ({
      persons: persons
    });
  }

  togglePersonHandler = () => {
    let doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    });
  }
  

  render() {
    const style = {
      backgroundColor: 'white',
      border: '1px solid blue',
      padding: '8px',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

   let persons = null;

   if (this.state.showPersons) {
     persons = (
       <div>
         {this.state.persons.map((person, index) => {
           return <Person 
           click = {() => this.deletePersonHandler(index)}
           name = {person.name} 
           age = {person.age}
           key = {person.id}
           changed = {(event) => this.nameChangedHandler(event, person.id)} />
         })
         }
       </div>
     )
     style.backgroundColor = 'red';
     style[':hover'] = {
       backgroundColor: 'salmon',
       color: 'black'
     }
   }

   const classes = [];
   if (this.state.persons.length <= 2) {
     classes.push('red');
   }
   if (this.state.persons.length <= 1) {
     classes.push('bold');
   }

    
    return (
      <StyleRoot>
        <div className={classes.App}>
          <h1>Hi, I'm a React App</h1>
          <p className = {classes.join(' ')}>This is really working!</p>
          <button 
          style = {style}
          onClick = {this.togglePersonHandler}> Switch Name </button>
          {persons}
        {/* {
          this.state.showPersons === true ?
            <div>
              <Person 
                name = {this.state.persons[0].name} 
                age = {this.state.persons[0].age}>My hobbies: Coding </Person>
              <Person 
                name = {this.state.persons[1].name} 
                age = {this.state.persons[1].age}
                click = {this.switchNameHandler}
                changed = {this.nameChangedHandler} />
              <Person 
                name = {this.state.persons[2].name} 
                age = {this.state.persons[2].age} />
              </div> : null } */}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
