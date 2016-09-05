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
		        	currentTabe: "Season Stats",
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
						  <li role="presentation" className={this.state.tabClasses.careerSummary}><a href="#" ref="careerSummary" onClick={this.handleTabChange}>Season Summary</a></li>
						  <li role="presentation" className={this.state.tabClasses.seasonStats}><a href="#" ref="stats" onClick={this.handleTabChange}>Stats</a></li>
						</ul>
						
						<StatCategory data={this.props.data} currentTab={this.state.currentTab} />

					</div>
				</div>
			</div>
		)
	}
}