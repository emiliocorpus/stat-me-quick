import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class Result extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.handleClick = this.handleClick.bind(this)
	}

	handleClick(e) {
		e.preventDefault()
		this.props.transferClickedResult(this.props.data)
	}

	render() {
		return (
			<a href="#" onClick={this.handleClick} className="result-link">
				<div className="row search-result">
					<span>{this.props.data.full_name} | {this.props.data.pos} | {this.props.data.exp} | {this.props.data.team}</span>
				</div>
			</a>
		)
	}
}