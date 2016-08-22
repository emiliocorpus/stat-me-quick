// HelloWorldWidget is an arbitrary name for any "dumb" component. We do not recommend suffixing
// all your dump component names with Widget.

import React, { PropTypes } from 'react';

// Simple example of a React "dumb" component
export default class StatMeQuickApp extends React.Component {
  static propTypes = {
    // If you have lots of data or action properties, you should consider grouping them by
    // passing two properties: "data" and "actions".

  };

  // React will automatically provide us with the event `e`
  handleChange(e) {
    const name = e.target.value;
    this.props.updateName(name);
  }

  render() {
    return (
      <div className="row">
        <h3>
          Hello, emilio!
        </h3>
        <hr />

      </div>
    );
  }
}
