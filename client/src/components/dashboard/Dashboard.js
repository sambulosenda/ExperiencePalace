import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner'


class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboadContent;

    if (profile === null || loading) {
      dashboadContent = <Spinner/>;
    } else {
     
      //check if user has profile data
      if(Object.keys(profile).length > 0){
        dashboadContent = <h4> TODO: DISPLAY PROFILE</h4>
      } else {
        //User logged in but no progile
        dashboadContent = (
          <div>
            <p className= "lead text-muted">Welcome {user.name} </p>
            <p>You have not yet setup a profie, please add some info</p>
            <Link to ="/create-profile" className="btn btn-lg btn-info">
            Create Profile
            </Link> 
          </div>
        )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboadContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.PropTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
