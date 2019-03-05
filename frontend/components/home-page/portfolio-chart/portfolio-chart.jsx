import React from 'react';
import { LineChart, Line, ReferenceDot, YAxis, Tooltip } from 'recharts';
import {fetchChart} from '../../../util/external_api_util';

class PortfolioChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: null, 
            price: 0, 
            color: "#30cd9a",
            numDays: 60,
        };
    }

    onPriceChangeHandler(e) {
        this.setState({price: e.target.value});
    }

    render() {
        Array.prototype.last = () => (this[this.length - 1]);
        fetchChart('goog', '3m')
            .then(res => this.setState({ data: res }))
            .then(res => this.setState({color: [
                (this.state.data[this.state.numDays - 1].close < this.state.data[0].close) ?
                    "#f1563a" : "#30cd9a"]}
            ));
        return (
            <div className="home-page">
                {/* <label className="home-page-chart-price"
                value={"$" + this.state.price}
                onChange={this.onPriceChangeHandler}
                /> */}
                < LineChart
                className = "portfolio-chart"
                width = { 675 } 
                height = { 200}
                data = { this.state.data } >
                    <Line
                        type="monotone"
                        dataKey="close"
                        stroke={this.state.color}
                        strokeWidth="2"
                    />
                    <ReferenceDot r={10} stroke="none" />
                    <YAxis 
                    type="number" 
                    domain={['dataMin', 'dataMax']}
                    hide={true}
                    />
                    <Tooltip />
                </LineChart >
            </div>
        );
    }

}

export default PortfolioChart;