import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class StatCategory extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	currentTab: this.props.currentTab,
	  	careerSummaryContent: false,
	  	seasonStatsContent: false
	  };

	  this.parseQuickBio = this.parseQuickBio.bind(this)
	  this.displayContent = this.displayContent.bind(this)
	  this.getMorePlayerStats = this.getMorePlayerStats.bind(this)
	}

	parseQuickBio() {
		var tableRows =[]
		for (var i=0; i <this.props.data.quickBio.length; i++) {
			tableRows.push(<tr key={i}><td className="col-header">{this.props.data.quickBio[i][0].toUpperCase()}</td><td className="col-stat">{this.props.data.quickBio[i][1]}</td></tr>)
		}
		return <table className="table-stats"><tbody>{tableRows}</tbody></table>
	}

	getMorePlayerStats() {
		$.ajax({
			url: '/moreplayerstats',
			type: 'get',
			dataType: 'json',
			data: {url: this.props.data.url, tab: this.state.currentTab},
		})
		.done(function(data) {
			debugger
			console.log("success");
		}.bind(this))
		.fail(function(data) {
			console.log("error");
		}.bind(this))
		.always(function(data) {
			console.log("complete");
		}.bind(this));
	}



	displayContent() {
		var content
		switch(this.state.currentTab) {
			case "Quick Bio":
			    content = this.parseQuickBio()
			    break;
			case "Career Summary":

				if (this.state.careerSummaryContent) {
					content = this.state.careerSummaryContent
				}
				else {
					debugger
					content = this.getMorePlayerStats()
				}
			    
			    break;
			case "Season Stats":

				if (this.state.seasonStatsContent) {
					content = this.state.seasonStatsContent
				}
				else {
					content = this.getMorePlayerStats()
				}
			    
			    break;
			default:
			    break;
		}
		return content
	}


	render() {
		var content = this.displayContent()
		debugger
		return (
			<div className="stat-content debugger-blue">
				{content}
			</div>
		)
	}
}