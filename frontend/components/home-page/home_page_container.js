import { connect } from 'react-redux';
import HomePage from './home_page';
import {
    fetchTransactions, createTransaction,
    createPortfolio, fetchPortfolios,
    updatePortfolio, fetchWatchlists,
} from '../../actions/transaction_actions';
import {fetchNews} from '../../actions/external_api_actions';

const mSTP = state => ({
    currentUser: state.entities.users[state.session.id],
    portfolios: state.entities.portfolios.filter(port => {
        if (port.user_id === state.session.id) return port;
    }),
    watchlists: state.entities.watchlists.filter(watch => {
        if (watch.user_id === state.session.id) return watch;
    }),
    newsArticles: state.entities.news,
});

const mDTP = dispatch => ({
    fetchNews: () => dispatch(fetchNews()),
    fetchTransactions: () => dispatch(fetchTransactions()),
    createTransaction: tx => dispatch(createTransaction(tx)),
    fetchPortfolios: () => dispatch(fetchPortfolios()),
    createPortfolio: port => dispatch(createPortfolio(port)),
    updatePortfolio: port => dispatch(updatePortfolio(port)),
    fetchWatchlists: () => dispatch(fetchWatchlists()),
    // getChartDataWithTag: (ticker, timeTag) => dispatch(getChartDataWithTag(ticker, timeTag)),
});

export default connect(mSTP, mDTP)(HomePage);