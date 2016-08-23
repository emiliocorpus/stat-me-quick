import React, { PropTypes } from 'react';
import _ from 'lodash';


export default class NaviAndUI extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	handleSearch(e) {
		e.preventDefault()
	}

	handleChange(e) {
		e.preventDefault()
		$.ajax({
			url: '/search',
			type: 'get',
			dataType: 'json',
			data: {searchValue: e.target.value },
		})
		.done(function(data) {
			debugger
			console.log("success");
		})
		.fail(function(data) {
			debugger
			console.log("error");
		})
		.always(function(data) {
			debugger
			console.log("complete");
		});
		
	}



	render() {
		return (
			<div className="row navigation-ui-container debugger-blue">
				<form className="navbar-form navbar-left" role="search" onSubmit={this.handleSearch}>
				  <div className="form-group">
				    <input type="text" ref="search-bar" className="form-control" placeholder="Search" onChange={this.handleChange} />
				  </div>
				</form>
			</div>
		)
	}
}


// things to do,
// 1. Seed database with names of every player.