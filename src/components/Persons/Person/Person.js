import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Person.css';
import Aux from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/WithClass';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
  constructor() {
    super();
    this.inputElement = React.createRef();
  }
  static contextType = AuthContext;
  componentDidMount() {
    this.inputElement.current.focus();
  }
  // const rndm = Math.random();
  // if(rndm > 0.7) {
  //     throw new Error('Something went wrong');
  // }
  render() {
    console.log('Person.js rendering...');
    return (
      <Aux>
        {this.context.authenticated ? (
          <p>Authenticated!</p>
        ) : (
          <p>Please Log In</p>
        )}
        <p onClick={this.props.click}>
          I am {this.props.name} and I am {this.props.age} years old
        </p>
        <p>{this.props.children}</p>
        {/* <input type="text" ref = {(inputEl) => {this.inputElement = inputEl}} onChange={this.props.onchanged} value={this.props.name} /> */}
        <input
          type="text"
          ref={this.inputElement}
          onChange={this.props.onchanged}
          value={this.props.name}
        />
      </Aux>
    );
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default withClass(Person, classes.Person);
