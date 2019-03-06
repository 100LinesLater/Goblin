import React from 'react';
import { LineChart, Line, ReferenceDot, YAxis, Tooltip } from 'recharts';

class PortfolioChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        return (
            < LineChart
            className = "portfolio-chart"
            width = { 675 } 
            height = { 200}
            data = { this.props.data } >
                <Line
                    type="monotone"
                    dataKey="close"
                    stroke={this.props.color}
                    strokeWidth="2"
                    dot={false}
                />
                <YAxis 
                type="number" 
                domain={['dataMin', 'dataMax']}
                hide={true}
                />
                <Tooltip />
            </LineChart >
        );
    }

}

export default PortfolioChart;