import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class StatCategory extends React.Component {

	constructor(props) {
	  super(props);

	}

	render() {
		if (this.props.content === false) {
			return <div className="stat-content debugger-blue"><div className="no-content">No stats on this player were found, please try again later</div></div>
		}
		else {
			return (
				<div className="stat-content debugger-blue">
					{this.props.content}
				</div>
			)
		}
	}
}