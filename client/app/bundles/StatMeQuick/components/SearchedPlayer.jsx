import React, { PropTypes } from 'react';
import _ from 'lodash';
import FlipMove from 'react-flip-move';


export default class SearchedPlayer extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	currentTab: "quickBio",
	  	tabClasses: {
	  		quickBio: "active",
	  		seasonSummary: "",
	  		stats: "",
	  	}
	  };

	  this.handleTabChange = this.handleTabChange.bind(this)
	}

	parseQuickBio() {
		var tableRows =[]
		for (var i=0; i <this.props.data.quickBio.length; i++) {
			tableRows.push(<tr key={i}><td className="col-header">{this.props.data.quickBio[i][0].toUpperCase()}</td><td className="col-stat">{this.props.data.quickBio[i][1]}</td></tr>)
		}
		return <table className="table-stats"><tbody>{tableRows}</tbody></table>
	}

	parsePlayerPic() {
		var playerSource
		debugger
		if (this.props.data.pictureSource !== "#") {
			playerSource = this.props.data.pictureSource
		}
		else {
			playerSource = "assets/images/defaultHeadshot.png"
		}
		return playerSource
	}

	handleTabChange(e) {
		e.preventDefault()
		switch(e.target.innerHTML) {
		    case "Quick Bio":
		        this.setState({
		        	currenTab: "Quick Bio",
		        	tabClasses: {
		        		quickBio: "active",
		        		seasonSummary: "",
		        		stats: "",
		        	}
		        })
		        break;
		    case "Season Summary":
		        this.setState({
		        	currentTab: "Season Summary",
		        	tabClasses: {
		        		quickBio: "",
		        		seasonSummary: "active",
		        		stats: "",
		        	}
		        })
		        break;
		    case "Stats":
		        this.setState({
		        	currentTabe: "Stats",
		        	tabClasses: {
		        		quickBio: "",
		        		seasonSummary: "",
		        		stats: "active",
		        	}
		        })
		        break;
		    default:
		        break;
		}
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-4 player-bio-pic-container">

						<div className="player-name-container">
							<h3>{this.props.data.fullName} | {this.props.data.position} | {this.props.data.team}</h3>
						</div>
						<img src={this.parsePlayerPic()} className="searchedPlayerPic" />
					</div>

					<div className="col-md-8">
						<ul className="nav nav-tabs">
						  <li role="presentation" className={this.state.tabClasses.quickBio}><a href="#" ref="quickBio" onClick={this.handleTabChange}>Quick Bio</a></li>
						  <li role="presentation" className={this.state.tabClasses.seasonSummary}><a href="#" ref="seasonSummary" onClick={this.handleTabChange}>Season Summary</a></li>
						  <li role="presentation" className={this.state.tabClasses.stats}><a href="#" ref="stats" onClick={this.handleTabChange}>Stats</a></li>
						</ul>
						<div className="stat-content debugger-blue">
							{this.parseQuickBio()}
						</div>

					</div>
				</div>
			</div>
		)
	}
}