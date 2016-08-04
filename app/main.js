import 'stylesheets/main';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { HelloWorld } from 'components';

ReactDOM.render(
  <HelloWorld foo="bars" />,
  document.querySelector('.app')
);
