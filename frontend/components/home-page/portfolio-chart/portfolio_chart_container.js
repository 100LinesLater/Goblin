import { connect } from 'react-redux';
import portfolioChart from './portfolio-chart';
import {fetchTransactions} from '../../../actions/transaction_actions';
// import {getChartDataWithTag} from '../../../actions/external_api_actions';

const mSTP = state => ({
    currentUser: state.entities.users[state.session.id],
    portfolios: state.entities.portfolios.filter(port => {
        if (port.user_id === state.session.id) return port;
    }),
});

const mDTP = dispatch => ({
    fetchTransactions: () => dispatch(fetchTransactions()),
    // getChartDataWithTag: (ticker, timeTag) => dispatch(getChartDataWithTag(ticker, timeTag)),
});

export default connect(mSTP, mDTP)(portfolioChart);