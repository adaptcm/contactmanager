import React, { Component } from "react";
import { Consumer } from "../../context";
//import { v4 as uuidv4 } from 'uuid';
import TextInputGroup from "../layout/TextInputGroup";
import axios from 'axios';

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {},
  };

  //onNameChange = e => this.state({name: e.target.value});

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    // check for errors

    if (name === "") {
      this.setState({ errors: { name: "Name is Required" } });
      return;
    }

    if (email === "") {
      this.setState({ errors: { email: "Email is Required" } });
      return;
    }

    if (phone === "") {
      this.setState({ errors: { phone: "phone is Required" } });
      return;
    }

    const newContact = {
     // id: uuidv4(),
      name,
      email,
      phone,
    };

    // axios.post ('https://jsonplaceholder.typicode.com/users', newContact).then(
    //   reponse => dispatch({ type: "ADD_CONTACT", payload: reponse.data })
    // );
  

    const res = await axios.post ('https://jsonplaceholder.typicode.com/users', newContact);
    dispatch({ type: "ADD_CONTACT", payload: res.data })



    //dispatch({ type: "ADD_CONTACT", payload: newContact });

    // clear state / inputs
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {},
    });

    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name..."
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />

                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter Email..."
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />

                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone..."
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />

                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-primary btn-block "
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default AddContact;
