import { connect } from 'react-redux';
import portfolioChart from './portfolio-chart';
import {getTransactions} from '../../../actions/transaction_actions';
import * as externalAPIActions from '../../actions/external_api_actions';

const mDTP = dispatch => ({
    getTransactions: () => dispatch(getTransactions()),
    getChartDataWithTag: (ticker, timeTag) => dispatch(externalAPIActions.getChartDataWithTag(ticker, timeTag)),
});

export default connect(null, mDTP)(portfolioChart);