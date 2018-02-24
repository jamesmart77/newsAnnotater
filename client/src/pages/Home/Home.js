import React, { Component } from 'react';
import { Col, Row, Container } from "../../components/Grid";
import Button from '../../components/Button';
import API from '../../utils/API'

class Home extends Component {

    state = {
        searchCriteria: "",
        startYear: 2018,
        endYear:2018,
        searchResults: []
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

        //call search API
        API.searchNews(searchParams)
        .then((res) => {
            
            //transform results to JSON object
            const results = JSON.parse(res.data);

            //set first 5 results array elements to state
            this.setState({searchResults: results.response.docs.slice(0,5)});
         
            //reset the query text field only...assuming user may search again in same year range
            this.setState({
            searchCriteria: ""
            });
        })
        .catch((err) => console.log(err));
        };

  render() {
    return (
        <main>
            <div className='container padding-1'>
                {/* search news section */}
                <Row>
                    <h4 className='dash-title'>Search the News</h4>
                    <form>
                    <input
                        value={this.state.searchCriteria}
                        name="searchCriteria"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Search the news..."
                        required="required"
                    />
                    <div className="input-field col s6">
                        <input
                        value={this.state.startYear}
                        name="startYear"
                        onChange={this.handleInputChange}
                        type="number"
                        placeholder="Start Year"
                        />
                        <label htmlFor="startYear">Start Year</label>
                    </div>
                    <div className="input-field col s6">
                        <input
                        value={this.state.endYear}
                        name="endYear"
                        onChange={this.handleInputChange}
                        type="number"
                        placeholder="Start Year"
                        />
                        <label htmlFor="endYear">End Year</label>
                    </div>
                    <Button title="Get News" className="btn waves-effect waves-light orange darken-2" onClick={this.handleFormSubmit}>Search</Button>
                    </form>
                </Row>

                {/* search results section */}
                <Row>
                    <h4 className='dash-title'>Search Results</h4>
                </Row>
                

                {/* saved & annotated news section */}
                <Row>
                    <h4 className='dash-title'>Save Articles</h4>
                </Row>
            </div>
    </main>);
  }
}

export default Home;
