import React from 'react';
import { LineChart, Line, YAxis, Tooltip, Dot } from 'recharts';

let payloadPrice = null;

const CustomToolTip = ({active, payload}) => {
    if (active) {
        payloadPrice = payload[0].payload.close;
        return (
            <div className="custom-tooltip">
                <p className="date">{`${payload[0].payload.date}`}</p>
            </div>
        );
    }

    return null;
};

class PortfolioChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        return (
            < LineChart
            width = { 675 } 
            height = { 200}
            data = { this.props.data } 
            >
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
                <Tooltip 
                content={<CustomToolTip external={external}/>}/>
            </LineChart >
        );
    }

}

export default PortfolioChart;