import React, { PropTypes } from 'react';
import _ from 'lodash';
import Result from './Result';

export default class SearchResult extends React.Component {

	constructor(props) {
	  super(props);

		this.createResults = this.createResults.bind(this)

	
	}

	createResults() {
		var searchResults = [];
		for (var i=0; i < this.props.data.length;i++) {
			searchResults.push(<Result key={i} data={this.props.data[i]} transferClickedResult={this.props.transferClickedResult} />)
		}
		return searchResults
	}




	render() {
		var searchComment;
		if (this.props.data.length == 1) {
			searchComment = "1 match found."
		}
		else {
			searchComment = this.props.data.length.toString() + " matches found."
		}

	
		return (
			<div className="row ">
				<div className="search-comment">{searchComment}</div>
				<div className="container-fluid result-tray">
						{this.createResults()}
				</div>
			</div>
		)
	}
}
