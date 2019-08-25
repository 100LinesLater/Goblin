import { connect } from 'react-redux';
import StockPage from './stock_page';
import {
    fetchTransactions, createTransaction,
    createPortfolio, fetchPortfolios,
    updatePortfolio, createWatchlist,
    removeWatchlist,
} from '../../actions/transaction_actions';
import { fetchNews } from '../../actions/external_api_actions';

const mSTP = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    newsArticles: state.entities.news,
    ticker: ownProps.match.params.ticker,
});

const mDTP = dispatch => ({
  fetchNews: () => dispatch(fetchNews()),
  fetchTransactions: () => dispatch(fetchTransactions()),
  createTransaction: tx => dispatch(createTransaction(tx)),
  fetchPortfolios: () => dispatch(fetchPortfolios()),
  createPortfolio: port => dispatch(createPortfolio(port)),
  updatePortfolio: port => dispatch(updatePortfolio(port)),
  createWatchlist: watch => dispatch(createWatchlist(watch)),
  removeWatchlist: watch => dispatch(removeWatchlist(watch)),
  // getChartDataWithTag: (ticker, timeTag) => dispatch(getChartDataWithTag(ticker, timeTag)),
});

export default connect(mSTP, mDTP)(StockPage);