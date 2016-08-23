import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class Result extends React.Component {
	render() {
		return (
			<a href="#">
				<div className="row search-result">
					<span>{this.props.data.full_name}</span> | <span>{this.props.data.pos}</span> | <span>{this.props.data.exp}</span> | <span>{this.props.data.school}</span>
				</div>
			</a>
		)
	}
}