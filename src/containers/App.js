import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/WithClass';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';
// import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] Constructor');
  }
  state = {
    persons: [
      { id: '0', name: 'Vivek', age: 30 },
      { id: '1', name: 'Aneesh', age: 29 },
      { id: '2', name: 'Pooda', age: 29 }
    ],
    someOtherState: 'Some Other State',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  };
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }
  // switchHandler = newName => {
  //   // console.log('button clicked!');
  //   this.setState({
  //     persons: [
  //       { name: "Vivek", age: 30 },
  //       { name: newName, age: 29 },
  //       { name: "Pooda", age: 29 }
  //     ]
  //   });
  // };
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(person => {
      return person.id === id;
    });
    const persons = [...this.state.persons];
    persons[personIndex].name = event.target.value;

    this.setState((prevState, props) => ({
      persons: persons,
      changeCounter: prevState.changeCounter + 1
    }));
    // var personIndex = null;
    // this.state.persons.forEach((person, index) => {
    //   if(person.id === id) {
    //     personIndex = index;
    //   }
    // });
    // const persons = [...this.state.persons];
    // persons[personIndex].name = event.target.value;
    // this.setState({
    //   persons: persons
    // });
    // this.setState({
    //   persons: [
    //     { name: 'Vivek', age: '30' },
    //     { name: event.target.value, age: '29' },
    //     { name: 'Pooda', age: '29' }
    //   ]
    // })
  };
  deletePersonHandler = personIndex => {
    // const personArray = this.state.persons;
    // const personArray = this.state.persons.slice();
    const personArray = [...this.state.persons];
    personArray.splice(personIndex, 1);
    this.setState({ persons: personArray });
  };
  togglePersonHandler = () => {
    const showDiv = this.state.showPersons;
    this.setState({
      showPersons: !showDiv
    });
  };
  authenticationHandler = () => {
    this.setState({
      authenticated: true
    });
  };
  render() {
    // const style = {
    //   backgroundColor: "green",
    //   color: "#fff",
    //   padding: "10px",
    //   border: "1px solid #ccc",
    //   cursor: "pointer"
    // };
    let persons = null;
    // let assignedClasses = [];
    // if (this.state.persons.length <= 2) {
    //   assignedClasses.push(classes.red);
    // }
    // if (this.state.persons.length <= 1) {
    //   assignedClasses.push(classes.bold);
    // }
    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
            authenticated={this.state.authenticated}
          />
          {/* <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
          <Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchHandler.bind(this, 'Balu')} onchanged={this.nameChangedHandler}>My Hobbies: Urakkam </Person>
          <Person name={this.state.persons[2].name} age={this.state.persons[2].age} /> */}
        </div>
      );
    }
    return (
      <Aux>
        <button
          onClick={() =>
            this.setState({ showCockpit: !this.state.showCockpit })
          }
        >
          Toggle Cockpit
        </button>
        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated,
            login: this.authenticationHandler
          }}
        >
          {this.state.showCockpit ? (
            <Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonHandler}
              // login={this.authenticationHandler}
            />
          ) : null}
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'))
  }
}
export default withClass(App, classes.App);

// const [personState, setPersonState] = useState({
//   persons: [
//     { name: 'Vivek', age: '30' },
//     { name: 'Aneesh', age: '29' },
//     { name: 'Pooda', age: '29' }
//   ]
// });
// const [otherState, setOtherState] = useState('Some other value')
// console.log(personState, otherState);
// const switchHandler = () => {
//   // console.log('button clicked!');
//   setPersonState({
//     persons: [
//       { name: 'Vivek', age: '30' },
//       { name: 'Punjiri', age: '29' },
//       { name: 'Pooda', age: '29' }
//     ]
//   })
// }
// return (
//   <div className="App">
//     <h1>Hi, I'm a React App</h1>
//     <p>This is really working!</p>
//     <button onClick={switchHandler}>Switch Names</button>
//     <Person name={personState.persons[0].name} age={personState.persons[0].age} />
//     <Person name={personState.persons[1].name} age={personState.persons[1].age}>My Hobbies: Urakkam </Person>
//     <Person name={personState.persons[2].name} age={personState.persons[2].age} />
//   </div>
// );
