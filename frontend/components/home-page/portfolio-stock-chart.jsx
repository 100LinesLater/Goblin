import React from 'react';
import { LineChart, Line, YAxis, Tooltip } from 'recharts';
import {fetchIntraday} from '../../util/external_api_util';

class PortfolioStockChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [2,3,1,5,2],
            color: null,
        };
    }

    render() {

        fetchIntraday(this.props.ticker, '1d')
            .then(res => this.setState({ data: res }))
            .then(res => this.setState({
                color: [
                    (this.state.data[this.state.data.length - 1].close < this.state.data[0].close) ?
                        "#f1563a" : "#30cd9a"]
            }
            ));

        return (
            < LineChart
                width={60}
                height={30}
                data={this.state.data} >
                <Line
                    type="monotone"
                    dataKey="close"
                    stroke={this.state.color}
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