import React, { Component } from 'react';

export default class HelloWorld extends Component {
  handleClick() {
    alert('Click');
  }
  render() {
    return (
      <div onClick={this.handleClick}>Hello World</div>
    )
  }
}
