import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class StatCategory extends React.Component {

	constructor(props) {
	  super(props);

	}

	render() {
		
		return (
			<div className="stat-content debugger-blue">
				{this.props.content}
			</div>
		)
	}
}