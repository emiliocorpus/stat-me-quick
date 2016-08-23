import React, { PropTypes } from 'react';
import _ from 'lodash';
import NaviAndUI from './NaviAndUI'

export default class StatMeQuickApp extends React.Component {
  static propTypes = {



  };

  handleChange(e) {
    const name = e.target.value;
    this.props.updateName(name);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row head debugger-red">
          <h3>
            Stat Me Quick
          </h3>
        </div>

        <NaviAndUI />

      </div>
    );
  }
}
