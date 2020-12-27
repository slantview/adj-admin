import React, { Component } from 'react';
import { connect } from 'react-redux';

class Homepage extends Component {
  render() {
    return (
        <div>
            <div>
                <h1>Dashboard</h1>
            </div>
            <p>
                To get started, create a new site.
            </p>
        </div>
    );
  }
}

export default connect(
  state=>({

  }),
  {}
)(Homepage)
