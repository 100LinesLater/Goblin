import { connect } from 'react-redux';
import HomePage from './home_page';
import {
    fetchTransactions, createTransaction,
    createPortfolio, fetchPortfolios,
    updatePortfolio, fetchStocks
} from '../../actions/transaction_actions';
// import {getChartDataWithTag} from '../../../actions/external_api_actions';

const mSTP = state => ({
    currentUser: state.entities.users[state.session.id],
    portfolios: state.entities.portfolios.filter(port => {
        if (port.user_id === state.session.id) return port;
    }),
    stocks: state.entities.stocks,
});

const mDTP = dispatch => ({
    fetchStocks: () => dispatch(fetchStocks()),
    fetchTransactions: () => dispatch(fetchTransactions()),
    createTransaction: tx => dispatch(createTransaction(tx)),
    fetchPortfolios: () => dispatch(fetchPortfolios()),
    createPortfolio: port => dispatch(createPortfolio(port)),
    updatePortfolio: port => dispatch(updatePortfolio(port))
    // getChartDataWithTag: (ticker, timeTag) => dispatch(getChartDataWithTag(ticker, timeTag)),
});

export default connect(mSTP, mDTP)(HomePage);