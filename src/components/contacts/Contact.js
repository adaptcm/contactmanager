import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import axios from 'axios';
import { Link } from 'react-router-dom';

class Contact extends Component {
  state = {
    showContactInfo: false,
  };

  onShowClick = (e) => {
    // can be moved into the element onClick also
    this.setState({
      showContactInfo: !this.state.showContactInfo,
    });
  };

  // onDeleteClick = () => {
  //     this.props.deleteClickHandler();
  // }

  // onDeleteClick = (id, dispatch) => {

  //   axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`).then (
  //     response =>
      
  //     dispatch({
  //       type: "DELETE_CONTACT",
  //       payload: id,
  //     }));
  // };

  //asyncawait
   onDeleteClick = async (id, dispatch) => {

    // used to fake a delete for an added contact to jsonplaceholder. not real life
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

      dispatch({
        type: "DELETE_CONTACT",
        payload: id,
      });
    } catch (e) {
      dispatch({
        type: "DELETE_CONTACT",
        payload: id,
      });
    }


  };

  render() {
    //desctructure
    const { contact } = this.props;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {contact.name}{" "}
                <i
                  style={{ cursor: "pointer" }}
                  onClick={this.onShowClick}
                  className="fas fa-sort-down"
                ></i>
                <i
                  className="fas fa-times"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={this.onDeleteClick.bind(this, contact.id, dispatch)}
                ></i>

                <Link to={`contact/edit/${contact.id}`}>
                  <i 
                    className="fas fa-pencil-alt"
                    style={{cursor: "pointer", float: "right", color: "black", marginRight: '1rem'}}></i>
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {contact.email}</li>
                  <li className="list-group-item">Phone {contact.phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  //deleteClickHander: PropTypes.func.isRequired
};

export default Contact;
