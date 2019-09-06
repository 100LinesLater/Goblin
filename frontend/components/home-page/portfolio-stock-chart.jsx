import React from 'react';
import { LineChart, Line, YAxis, Tooltip } from 'recharts';

class PortfolioStockChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            < LineChart
                width={60}
                height={30}
                data={this.props.data} >
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
            </LineChart >
        );
    }

}

export default PortfolioStockChart;