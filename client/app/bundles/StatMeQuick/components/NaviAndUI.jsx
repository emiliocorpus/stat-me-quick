import React, { PropTypes } from 'react';
import _ from 'lodash';
import SearchResult from './SearchResult';


export default class NaviAndUI extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	searchResult: []
	  };


	  this.handleChange = this.handleChange.bind(this)
	  this.handleClickedResult = this.handleClickedResult.bind(this)
	}

	handleSearch(e) {
		e.preventDefault()
	}

	handleChange(e) {
		e.preventDefault()
		if (e.target.value !== "") {
			$.ajax({
				url: '/search',
				type: 'get',
				dataType: 'json',
				data: {searchValue: e.target.value },
			})
			.done(function(data) {
				this.setState({
					searchResult: <SearchResult data={data.result} transferClickedResult={this.handleClickedResult}/>
				})
				console.log("success");
			}.bind(this))
			.fail(function(data) {
				console.log("error");
			}.bind(this))
			.always(function(data) {
				console.log("complete");
			}.bind(this));
		}
		else {
			this.setState({
				searchResult:[]
			})
		}
		
		
	}

	handleClickedResult(result) {
		$.ajax({
			url: '/findplayerstats',
			dataType: 'JSON',
			data: {position: result.pos, full_name: result.full_name},
		})
		.done(function(response) {
			console.log(response.success);
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		

	}



	render() {
		const searchResult = this.state.searchResult
		return (
			<div className="row navigation-ui-container debugger-blue">
				<form className="navbar-form navbar-left" role="search" onSubmit={this.handleSearch}>
				  <div className="input-group input-group-lg">
				    <input type="text" ref="search-bar" className="form-control" placeholder="Search" onChange={this.handleChange} />
				  </div>
				</form>

				<div className="container-fluid search-ui">
					{searchResult}
				</div>

			</div>
		)
	}
}


// things to do,
// 1. Seed database with names of every player.