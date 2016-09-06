import React, { PropTypes } from 'react';
import _ from 'lodash';
import FlipMove from 'react-flip-move';
import StatCategory from './StatCategory';


export default class SearchedPlayer extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	currentTab: "Quick Bio",
	  	tabClasses: {
	  		quickBio: "active",
	  		careerSummary: "",
	  		seasonStats: "",
	  	},
	  	quickBioContent: this.parseQuickBio(),
	  	careerSummaryContent: false,
	  	seasonStatsContent: false
	  };

	  this.handleTabChange = this.handleTabChange.bind(this)
	  this.displayContent = this.displayContent.bind(this)
	  this.parseQuickBio = this.parseQuickBio.bind(this)
	}

	parsePlayerPic() {
		var playerSource
		if (this.props.data.pictureSource !== "#") {
			playerSource = this.props.data.pictureSource
		}
		else {
			playerSource = "assets/images/defaultHeadshot.png"
		}
		return playerSource
	}

	parseQuickBio() {
		var tableRows =[]
		for (var i=0; i <this.props.data.quickBio.length; i++) {
			tableRows.push(<tr key={i}><td className="col-header">{this.props.data.quickBio[i][0].toUpperCase()}</td><td className="col-stat">{this.props.data.quickBio[i][1]}</td></tr>)
		}
		var content = <table className="table-stats table table-bordered table-striped"><tbody>{tableRows}</tbody></table>
		return <StatCategory content={content} key="quick-bio"/>
	}

	getMorePlayerStats() {
		$.ajax({
			url: '/moreplayerstats',
			type: 'get',
			dataType: 'json',
			data: {url: this.props.data.url, tab: this.state.currentTab},
		})
		.done(function(data) {
			if (this.state.currentTab === "Career Summary") {
				if (data.result.successful) {
					var headers = []
					for (var i=0;i<data.result.headers.length;i++) {
						var row = []
						for (var j=0;j<data.result.headers[i].length;j++) {
							row.push(<th key={j} colSpan={data.result.headers[i][j].colspan}>{data.result.headers[i][j].text}</th>)
						}
						headers.push(<tr key={i}>{row}</tr>)
					}
					var body = []
					for (var i=0;i<data.result.body.length;i++) {
						var row = []
						for (var j=0;j<data.result.body[i].length;j++) {
							row.push(<td key={j}>{data.result.body[i][j]}</td>)
						}
						body.push(<tr key={i}>{row}</tr>)
					}
					var foot = []	
					for (var i=0;i<data.result.foot.length;i++) {
						foot.push(<td key={i}>{data.result.foot[i]}</td>)
					}
					var table = <div className="table-responsive"><table className="table-stats table table-bordered table-striped">
									<thead>{headers}</thead>
									<tbody>{body}</tbody>
									<tfoot><tr>{foot}</tr></tfoot>
								</table></div>
					this.setState({
						careerSummaryContent: <StatCategory content={table} key="career-summary"/>
					})
				}
				else {
					this.setState({
						careerSummaryContent: <StatCategory content={false} key="career-summary"/>
					})
				}
				
			}
			else {
				if (data.result.successful) {
					var headers = []
					for (var i=0;i<data.result.headers.length;i++) {
						var row = []
						for (var j=0;j<data.result.headers[i].length;j++) {
							row.push(<th key={j} colSpan={data.result.headers[i][j].colspan}>{data.result.headers[i][j].text}</th>)
						}
						headers.push(<tr key={i}>{row}</tr>)
					}
					debugger
					var body = []
					for (var i=0;i<data.result.body.length;i++) {
						var row = []
						for (var j=0;j<data.result.body[i].length;j++) {
							row.push(<td key={j}>{data.result.body[i][j]}</td>)
						}
						body.push(<tr key={i}>{row}</tr>)
					}
					var foot = []	
					for (var i=0;i<data.result.foot.length;i++) {
						foot.push(<td key={i}>{data.result.foot[i]}</td>)
					}
					var table = <div className="table-responsive"><table className="table-stats table table-bordered table-striped">
									<thead>{headers}</thead>
									<tbody>{body}</tbody>
									<tfoot><tr>{foot}</tr></tfoot>
								</table></div>
					this.setState({
						seasonStatsContent: <StatCategory content={table} key="season-stats"/>
					})
				}
				else {
					this.setState({
						seasonStatsContent: <StatCategory content={false} key="season-stats"/>
					})
				}
				
				

			}
			console.log("success");
		}.bind(this))
		.fail(function(data) {
			console.log("error");
		}.bind(this))
		.always(function(data) {
			console.log("complete");
		}.bind(this));
	}

	handleTabChange(e) {
		e.preventDefault()
		switch(e.target.innerHTML) {
		    case "Quick Bio":
		        this.setState({
		        	currentTab: "Quick Bio",
		        	tabClasses: {
		        		quickBio: "active",
		        		careerSummary: "",
		        		seasonStats: "",
		        	}
		        })
		        break;
		    case "Career Summary":
		        this.setState({
		        	currentTab: "Career Summary",
		        	tabClasses: {
		        		quickBio: "",
		        		careerSummary: "active",
		        		seasonStats: "",
		        	}
		        })
		        break;
		    case "Season Stats":
		        this.setState({
		        	currentTab: "Season Stats",
		        	tabClasses: {
		        		quickBio: "",
		        		careerSummary: "",
		        		seasonStats: "active",
		        	}
		        })
		        break;
		    default:
		        break;
		}
	}

	displayContent() {
		var content
		switch(this.state.currentTab) {
			case "Quick Bio":
				content = this.state.quickBioContent
			    break;
			case "Career Summary":
				if (this.state.careerSummaryContent) {
					content = this.state.careerSummaryContent
				}
				else {
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
		var content = [this.displayContent()]

		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-4 player-bio-pic-container">

						<div className="player-name-container">
							<div>{this.props.data.fullName} | {this.props.data.position} | {this.props.data.team}</div>
						</div>
						<img src={this.parsePlayerPic()} className="searchedPlayerPic" />

						<div className="empty-banner">


						</div>
					</div>

					<div className="col-md-8">
						<ul className="nav nav-justfied nav-tabs">
						  <li role="presentation" className={this.state.tabClasses.quickBio}><a href="#" ref="quickBio" onClick={this.handleTabChange}>Quick Bio</a></li>
						  <li role="presentation" className={this.state.tabClasses.careerSummary}><a href="#" ref="careerSummary" onClick={this.handleTabChange}>Career Summary</a></li>
						  <li role="presentation" className={this.state.tabClasses.seasonStats}><a href="#" ref="stats" onClick={this.handleTabChange}>Season Stats</a></li>
						</ul>
						
						<div className="stat-content debugger-blue">
							<FlipMove enterAnimation="elevator" leaveAnimation="fade" >
								{content}	
							</FlipMove>
						</div>

					</div>
				</div>
			</div>
		)
	}
}