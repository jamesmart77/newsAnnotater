import React, { Component } from "react";
import Button from '../Button';
import API from '../../utils/API'

class Form extends Component {
  // Setting the component's initial state
  state = {
    searchCriteria: "",
    startYear: 2018,
    endYear:2018
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

    //if user performs empty search, find current top stories
    if(this.state.searchCriteria === ''){
      this.setState({
        searchCriteria: "top stories"
      })
    }

    const searchParams = {
      queryText: this.state.searchCriteria,
      startYear: this.state.startYear,
      endYear: this.state.endYear
    }

    API.searchNews(searchParams)
    .then((results) => {
      console.log(results)
      
      //reset the query text field only...assuming user may search again in same year range
      this.setState({
        searchCriteria: ""
      });

    })
    .catch((err) => console.log(err));

  };

  render() {
    return (
      <div>
        <form className="form">
          <input
            value={this.state.searchCriteria}
            name="searchCriteria"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Search the news..."
            required="required"
          />
          <div class="input-field col s6">
            <input
              value={this.state.startYear}
              name="startYear"
              onChange={this.handleInputChange}
              type="number"
              placeholder="Start Year"
            />
            <label for="startYear">Start Year</label>
          </div>
          <div class="input-field col s6">
            <input
              value={this.state.endYear}
              name="endYear"
              onChange={this.handleInputChange}
              type="number"
              placeholder="Start Year"
            />
            <label for="endYear">End Year</label>
          </div>
          <Button title="Get News" className="btn waves-effect waves-light orange darken-2" onClick={this.handleFormSubmit}>Search</Button>
        </form>
      </div>
    );
  }
}

export default Form;
