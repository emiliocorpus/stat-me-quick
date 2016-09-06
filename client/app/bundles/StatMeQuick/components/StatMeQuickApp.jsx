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
          
            <div className="title-container">
              <span className="title-stat">Stat</span> <span className="title-me">Me</span> <span className="title-quick">Quick</span>
            </div>
        </div>

        <NaviAndUI />


        
      </div>
    );
  }
}
