import React from 'react';
import { LineChart, Line, YAxis, Tooltip} from 'recharts';

const CustomToolTip = ({active, payload, priceChange, interval}) => {
    // let payloadPrice = 0;
    if (active) {
        // payloadPrice = payload[0] ? payload[0].payload.close : 0;
        // priceChange(payloadPrice);
        return (
            <div className="custom-tooltip">
                <p className="date">{`${payload[0] ? 
                    (interval === '1d' ? "Time: " + payload[0].payload.minute :
                    "Date: " + payload[0].payload.date) : ""}`}
                </p>
                <p>
                    Price: {payload[0] ? "$" + payload[0].payload.close.toFixed(2) : ""}
                </p>
            </div>
        );
    } else {
        // payloadPrice = 0;
        // priceChange(payloadPrice);
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
                        interval={this.props.interval}
                        // priceChange={this.props.priceChange}
                    />}
                />
            </LineChart >
        );
    }

}

export default PortfolioChart;