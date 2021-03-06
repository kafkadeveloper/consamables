import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Responsive from 'react-responsive';
import qs from 'query-string';

import { toJS } from 'common/utils';

import { loginActions } from 'data/login';
import { groupActions } from 'data/groups';
import { restaurantActions } from 'data/restaurants';
import { currentUserSelectors } from 'data/currentUser';

import Routes from '../routes';

import LeftColumn from './columns/LeftColumn';
import CenterColumn from './columns/CenterColumn';
import RightColumn from './columns/RightColumn';
import Overlay from './Overlay';
import NavBar from './mobile/NavBar';

import './master.scss';

class Layout extends Component {
  componentDidMount() {
    const {
      location: { pathname, search },
      loggedIn,
      splitwiseLoad, loadUserInfo, loadRestaurants, loadActiveOrders, loadPendingOrders,
      updateRestaurantHours,
    } = this.props;

    if (pathname === '/login/splitwise-auth') {
      const query = qs(search);
      splitwiseLoad(query.oauth_token, query.oauth_verifier);
    } else {
      loadUserInfo();
    }
    loadRestaurants();
    loadActiveOrders();
    loadPendingOrders(loggedIn);

    this.restaurantUpdate = setInterval(updateRestaurantHours, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.restaurantUpdate);
  }

  render() {
    const { location } = this.props;

    const centerFocus = !/^\/(menu\/[0-9]+)?$/.test(location.pathname);
    const style = centerFocus ? { minWidth: '30em', padding: '0 15em' } : null;

    return (
      <Responsive minWidth={1224}>
        {matches => (
          <div className='app' style={matches ? style : null}>
            {!matches ?
              <meta
                name='viewport'
                content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
              />
              : null
            }
            <Responsive minWidth={1224}>
              <LeftColumn />
              <CenterColumn>
                <Routes />
              </CenterColumn>
              <RightColumn />
              <Overlay centerFocus={centerFocus} />
            </Responsive>
            <Responsive maxWidth={1223}>
              <NavBar />
              <Routes />
            </Responsive>
          </div>
        )}
      </Responsive>
    );
  }
}

Layout.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  splitwiseLoad: PropTypes.func.isRequired,
  loadUserInfo: PropTypes.func.isRequired,
  loadRestaurants: PropTypes.func.isRequired,
  loadActiveOrders: PropTypes.func.isRequired,
  loadPendingOrders: PropTypes.func.isRequired,
  updateRestaurantHours: PropTypes.func.isRequired,
};

const { verifyUser, verifyAndAuthenticateWithSplitwise } = loginActions;
const { fetchActiveGroups, fetchPendingGroups } = groupActions;
const { fetchRestaurants, updateRestaurantHours } = restaurantActions;
const { isCurrentUserLoggedIn } = currentUserSelectors;

const mapStateToProps = state => ({
  location: state.getIn(['router', 'location']),
  loggedIn: isCurrentUserLoggedIn(state),
});

const mapDispatchToProps = dispatch => ({
  splitwiseLoad: (token, verifier) => dispatch(verifyAndAuthenticateWithSplitwise(token, verifier)),
  loadUserInfo: () => dispatch(verifyUser()),
  loadRestaurants: () => dispatch(fetchRestaurants()),
  loadActiveOrders: () => dispatch(fetchActiveGroups()),
  loadPendingOrders: loggedIn => dispatch(fetchPendingGroups(loggedIn)),
  updateRestaurantHours: () => dispatch(updateRestaurantHours()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(Layout));
