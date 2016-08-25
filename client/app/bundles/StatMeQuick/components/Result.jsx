import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class Result extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.handleClick = this.handleClick.bind(this)
	}

	handleClick(e) {
		e.preventDefault()
		debugger
		this.props.transferClickedResult(this.props.data)
	}

	render() {
		return (
			<a href="#" onClick={this.handleClick}>
				<div className="row search-result">
					<span>{this.props.data.full_name}</span> | <span>{this.props.data.pos}</span> | <span>{this.props.data.exp}</span> | <span>{this.props.data.school}</span>
				</div>
			</a>
		)
	}
}