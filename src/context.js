import React, { Component } from "react";
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
      };
      case "UPDATE_CONTACT":
        return {
          ...state,
          contacts: state.contacts.map(
            (contact) => contact.id === action.payload.id ? 
            (contact = action.payload) : contact
          ),
        };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [
      {
        id: 1,
        name: "John Doe",
        email: "jdoe@gmail.com",
        phone: "555-555-5555",
      },
      {
        id: 2,
        name: "Karn Doe",
        email: "karen@gmail.com",
        phone: "555-123-5555",
      },
      {
        id: 3,
        name: "Jane Doe",
        email: "janedoe@gmail.com",
        phone: "123-555-5555",
      },
    ],
    // contacts: [
    //   {
    //     id: 1,
    //     name: "John Doe",
    //     email: "jdoe@gmail.com",
    //     phone: "555-555-5555",
    //   },
    //   {
    //     id: 2,
    //     name: "Karn Doe",
    //     email: "karen@gmail.com",
    //     phone: "555-123-5555",
    //   },
    //   {
    //     id: 3,
    //     name: "Jane Doe",
    //     email: "janedoe@gmail.com",
    //     phone: "123-555-5555",
    //   },
    // ],
    dispatch: (action) => this.setState((state) => reducer(state, action)),
  };

//   componentDidMount()
//  {
//    axios.get('https://jsonplaceholder.typicode.com/users')
//    .then(res => this.setState({contacts: res.data}));
   
//   // fetch('https://jsonplaceholder.typicode.com/posts/1')
//   // .then(response => response.json())
//   // .then(data => this.setState({
//   //     title: data.title,
//   //     body: data.body
//   // }))
//  }


// using asyncawait
 async componentDidMount()
 { const res = await axios.get('https://jsonplaceholder.typicode.com/users')
  //  .then(res => this.setState({contacts: res.data}));
   this.setState({
     contacts: res.data
   })
 }


  componentDidUpdate() {
    console.log('context did update');
}

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
