import React, { Component } from 'react';
import Chart from 'chart.js';
import colorsIndex from '../../style/chartjs/colorsIndex';

export default class ChartJS extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.buildChart();
}

  componentDidUpdate() {
      this.buildChart();
  }

  buildChart = () => {
    const myChartRef = this.chartRef.current.getContext("2d");
    /**
     * @param {Array} data
     * @param {Array} labels
     * @param {title} String
     * @param {type} String
     * string name of a colortheme or manually given Array of colors
     * @param {color} String
     */
    const { data, labels, title, type, color, bordercolor } = this.props;
    new Chart(myChartRef, {
        type: type,
        data: {
            //Bring in data
            labels: labels,
            datasets: [
                {
                    label: title,
                    data: data,
                    // line and radar type can only take one color
                    // can be theme name or your own Array, or default
                    backgroundColor: type !== 'line' && type !== 'radar' ? 
                    ( !Array.isArray(color) ? ( color ? colorsIndex[color] : colorsIndex['defaultColors'] ) : color ) : 
                    ( !Array.isArray(color) ? ( color ? colorsIndex[color][0] : colorsIndex['defaultColors'][0] ) : color[0] ),
                    borderColor: bordercolor,
                }
            ]
        },
        options: {
            //Customize chart options
            responsive: true,
            responsiveAnimationDuration: 0
        }
    });
  }

  render() {
    return (
      <canvas ref={this.chartRef} />
    );
  }
}