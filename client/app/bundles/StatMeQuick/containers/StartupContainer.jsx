import React, { PropTypes } from 'react';
import StatMeQuickApp from '../components/StatMeQuickApp';

// Simple example of a React "smart" component
export default class StartupContainer extends React.Component {
  static propTypes = {


  };

  constructor(props, context) {
    super(props, context);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
  }


  render() {
    return (
      <div className="container-fluid">
        <StatMeQuickApp />
      </div>
    );
  }
}
