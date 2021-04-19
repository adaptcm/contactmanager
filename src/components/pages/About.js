import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div>
        <h1>About Contact Manager</h1>
        <p>{this.props.match.params.id}</p>
      </div>
    );
  }
}
export default About;
