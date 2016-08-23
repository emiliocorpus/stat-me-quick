import React, { PropTypes } from 'react';
import _ from 'lodash';


export default class NaviAndUI extends React.Component {

	handleSearch(e) {
		e.preventDefault()
		debugger
	}



	render() {
		return (
			<div className="row navigation-ui-container debugger-blue">
				<form className="navbar-form navbar-left" role="search" onSubmit={this.handleSearch}>
				  <div className="form-group">
				    <input type="text" className="form-control" placeholder="Search" />
				  </div>
				  <button type="submit" className="btn btn-default">Submit</button>
				</form>
			</div>
		)
	}
}


// things to do,
// 1. Seed database with names of every player.