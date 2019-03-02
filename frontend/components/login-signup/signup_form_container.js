import {connect} from 'react-redux';
import SessionForm from './session_form';
import {signup, removeErrors} from '../../actions/session_actions';

const mSTP = (state, ownProps) => ({
    errors: state.errors.session,
    formType: 'Sign Up',
});

const mDTP = (dispatch, ownProps) => ({
    removeErrors: () => dispatch(removeErrors()),
    processForm: user => dispatch(signup(user)),
});

export default connect(mSTP, mDTP)(SessionForm);