import { connect } from 'react-redux';
import StockPage from './stock_page';
import {
    fetchTransactions, createTransaction,
    createPortfolio, fetchPortfolios,
    updatePortfolio, createWatchlist,
    removeWatchlist, fetchStocks,
    fetchWatchlists,
} from '../../actions/transaction_actions';
import {updateUser} from '../../actions/session_actions';
import { fetchNews } from '../../actions/external_api_actions';

const mSTP = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    newsArticles: state.entities.news,
    portfolioStock: state.entities.portfolios.find(
        port => port.ticker === ownProps.match.params.ticker
    ),
    watchlists: state.entities.watchlists.filter(watch => {
        if (watch.user_id === state.session.id) return watch;
    }),
    ticker: ownProps.match.params.ticker,
    stocks: state.entities.stocks,
});

const mDTP = dispatch => ({
  fetchNews: () => dispatch(fetchNews()),
  fetchStocks: () => dispatch(fetchStocks()),
  fetchTransactions: () => dispatch(fetchTransactions()),
  createTransaction: tx => dispatch(createTransaction(tx)),
  fetchPortfolios: () => dispatch(fetchPortfolios()),
  createPortfolio: port => dispatch(createPortfolio(port)),
  updatePortfolio: port => dispatch(updatePortfolio(port)),
  fetchWatchlists: () => dispatch(fetchWatchlists()),
  createWatchlist: watch => dispatch(createWatchlist(watch)),
  removeWatchlist: watch => dispatch(removeWatchlist(watch)),
  updateUser: user => dispatch(updateUser(user)),
  // getChartDataWithTag: (ticker, timeTag) => dispatch(getChartDataWithTag(ticker, timeTag)),
});

export default connect(mSTP, mDTP)(StockPage);