import { connect } from 'react-redux';
import UserPage from './user-page';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
});

export default connect(mapStateToProps)(UserPage);