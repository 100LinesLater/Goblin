import React from 'react';
import { LineChart, Line } from 'recharts';

class PortfolioChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.getChartDataWithTag('GOOG','3m');
        const renderLineChart = (
            <LineChart width={400} height={400} data={data}>
                <Line type="monotone" dataKey="close" stroke="#8884d8" />
            </LineChart>
        );
        return (
            renderLineChart
        );
    }

}

export default PortfolioChart;