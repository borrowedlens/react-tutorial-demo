import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
  state = {};
  static getDerivedStateFromProps(props, state) {
    console.log('[Persons.js getDerivedStateFromProps]');
    return state;
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("[Persons.js shouldComponentUpdate]");
  //   return ( nextProps.persons !== this.props.persons || nextProps.authenticated !== this.props.authenticated );
  // }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js getSnapshotBeforeUpdate]');
    return { message: 'Snapshot :)' };
  }
  componentDidUpdate(prevProps, prevState, Snapshot) {
    console.log('[Persons.js componentDidUpdate]');
    console.log(Snapshot);
  }
  render() {
    console.log('Persons.js rendering...');
    return this.props.persons.map((person, index) => (
      <Person
        click={() => this.props.clicked(index)}
        name={person.name}
        age={person.age}
        onchanged={event => this.props.changed(event, person.id)}
        key={person.id}
      />
    ));
  }
}

export default Persons;
