import React, { PropTypes } from 'react';
import _ from 'lodash';
import SearchResult from './SearchResult';
import SearchedPlayer from './SearchedPlayer';

export default class NaviAndUI extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	display: "search",
	  	searchResult: [],
	  	searchedPlayer: ""
	  };


	  this.handleChange = this.handleChange.bind(this)
	  this.handleClickedResult = this.handleClickedResult.bind(this)
	  this.handleRenderByState = this.handleRenderByState.bind(this)
	  this.backToSearch = this.backToSearch.bind(this)
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
			data: {data:result, link: result.link},
		})
		.done(function(response) {
			console.log("success");
			this.setState({
				display: "result",
				searchResult:[],
				searchedPlayer: response.data
			})

		}.bind(this))
		.fail(function() {
			console.log("error");
		}.bind(this))
		.always(function() {
			console.log("complete");
		}.bind(this));
	}

	backToSearch(e) {
		e.preventDefault()
		this.setState({
			display: "search",
			searchedPlayer: ""
		})
	}

	handleRenderByState() {
		var renderValue;
		if (this.state.display === "search") {
			const searchResult = this.state.searchResult
			renderValue = 
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
		}
		else {
			renderValue = 
				<div className="row debugger-blue">
					<div className="back-to-search">
						<a href="#" onClick={this.backToSearch}> &#8624; <br/> back to search</a>
					</div>
					<div className="container-fluid">
						<div className="row">
							<SearchedPlayer data={this.state.searchedPlayer} />
						</div>
					</div>
				</div>
		}
		return renderValue
	}

	render() {
		return this.handleRenderByState()
	}
}