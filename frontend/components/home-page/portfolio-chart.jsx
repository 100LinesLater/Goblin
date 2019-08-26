import React from 'react';
import { LineChart, Line, YAxis, Tooltip} from 'recharts';

const CustomToolTip = ({active, payload, priceChange}) => {
    let payloadPrice = null;
    if (active) {
        payloadPrice = payload[0].payload.close;
        priceChange(payloadPrice);
        return (
            <div className="custom-tooltip">
                <p className="date">{`${payload[0].payload.date}`}</p>
            </div>
        );
    } else {
        payloadPrice = null;
        priceChange(payloadPrice);
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
                    content={<CustomToolTip 
                        external={external}
                        priceChange={() => this.props.priceChange}
                    />}
                />
            </LineChart >
        );
    }

}

export default PortfolioChart;