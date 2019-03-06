import React from 'react';
import { fetchChart } from '../../util/external_api_util';
import PortfolioChart from './portfolio-chart';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            price: 0,
            color: null,
            numDays: 60,
            ticker: 'goog',
            interval: '3m'
        };
    }

    componentDidMount() {
        fetchChart(this.state.ticker, this.state.interval)
            .then(res => this.setState({ data: res }))
            .then(res => this.setState({
                color: [
                    (this.state.data[this.state.numDays - 1].close < this.state.data[0].close) ?
                        "#f1563a" : "#30cd9a"]
            }
            ));
    }

    render() {
        return (
            <div className="home-page-main">
                <PortfolioChart 
                data={this.state.data} 
                color={this.state.color}
                />
            </div>
        )
    }
}

export default HomePage;