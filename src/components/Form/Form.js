import React, { Component } from "react";
import Button from '../Button';

class Form extends Component {
  // Setting the component's initial state
  state = {
    searchCriteria: ""
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    // const value = event.target.value;
    // const name = event.target.name;

    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();

    if(this.state.firstName === '' || this.state.lastName === ''){
      alert("Please enter a value for first and last name...");
      return false;
    }

    if(this.state.password.length < 6){
      alert(`Please enter a password between 6 and 15 characters, ${this.state.firstName} ${this.state.lastName}`)
      return false;
    }

    // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
    alert(`Hello ${this.state.firstName} ${this.state.lastName}! Your password has been set to ${this.state.password}`);
    this.setState({
      firstName: "",
      lastName: "",
      password: ""
    });
  };

  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <div>
        <form className="form">
          <input
            value={this.state.searchCriteria}
            name="searchCriteria"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Search the news..."
          />
          <Button title="Get News" class="btn waves-effect waves-light">Search</Button>
          {/* <button onClick={this.handleFormSubmit}>Search</button> */}
        </form>
      </div>
    );
  }
}

export default Form;
