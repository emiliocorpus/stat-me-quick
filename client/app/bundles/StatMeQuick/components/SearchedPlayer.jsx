import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class SearchedPlayer extends React.Component {


	parseQuickBio() {
		var tableRows =[]
		for (var i=0; i <this.props.data.quickBio.length; i++) {
			tableRows.push(<tr><td>{this.props.data.quickBio[i][0]}</td><td>{this.props.data.quickBio[i][1]}</td></tr>)
		}
		return <table><tbody>{tableRows}</tbody></table>
	}

	render() {
		return (
			<div className="container-fluid">
				<img src={this.props.data.pictureSource} className="searchedPlayerPic" />
				<br/>
				{this.parseQuickBio()}
			</div>
		)
	}
}