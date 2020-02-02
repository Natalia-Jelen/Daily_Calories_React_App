import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class MultipleAxisChart extends Component {	
	constructor(props) {
		super(props);
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
	
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	
	render() {
		const options = {
			theme: "light2",
			animationEnabled: true,
			title:{
				text: "Weight VS Goal"
			},
			axisX: {
				title: "Date time"
			},
			axisY: {
				title: "Weight [kg]",
				titleFontColor: "#6D78AD",
				lineColor: "#6D78AD",
				labelFontColor: "#6D78AD",
				tickLength: 0,
				includeZero: false,
				valueFormatString: "# ##0"
			},
			axisY2: {
				title: "Goal [kcal]",
				titleFontColor: "#51CDA0",
				lineColor: "#51CDA0",
				labelFontColor: "#51CDA0",
				tickLength: 0,
				includeZero: false,
				valueFormatString: "# ##0"
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [{
				type: "spline",
				name: "Weight",
				showInLegend: true,
                xValueFormatString: "DD MMM YYYY HH:MM",
				yValueFormatString: "# ##0 kg",
				dataPoints: this.props.weightData
			},
			{
				type: "spline",
				name: "Goal",
				axisYType: "secondary",
				showInLegend: true,
				xValueFormatString: "DD MMM YYYY HH:MM",
				yValueFormatString: "# ##0 kcal",
				dataPoints: this.props.goalData
			}]
		}
		
		return (
			<div className="MultipleAxisChart">
				<CanvasJSChart options = {options} onRef={ref => this.chart = ref} />
			</div>
		);
	}
}

export default MultipleAxisChart;