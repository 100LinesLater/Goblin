import { connect } from 'react-redux';
import SplashPage from './splash_page';
import { logout } from '../../actions/session_actions';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
});

export default connect(mapStateToProps)(SplashPage);