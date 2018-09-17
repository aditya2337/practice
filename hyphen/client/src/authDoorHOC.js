import { connect } from 'react-redux';
import { compose, branch, renderComponent, lifecycle } from 'recompose';

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isAuthorizing: state.auth.isAuthorizing,
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  logoutIfTokenNotValid: token => {},
});

export default (LoggedInComponent, LoggedOutComponent) =>
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
      componentDidMount() {
        if (this.props.token) {
          this.props.logoutIfTokenNotValid(this.props.token);
        }
      },
      componentWillReceiveProps() {
        const token = localStorage.getItem('token');
        if (token !== null) {
          this.props.logoutIfTokenNotValid(token);
        }
      },
    }),
    branch(
      ({ isLoggedIn, isAuthorizing }) => isLoggedIn || isAuthorizing,
      renderComponent(LoggedInComponent),
      renderComponent(LoggedOutComponent)
    )
  );
