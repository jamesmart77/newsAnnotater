import React, { Component } from 'react';
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import ArticleCard from "../../components/ArticleCard";
import { Link } from "react-router-dom";
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
            console.log("Success")
            
            //transform results to JSON object
            const results = JSON.parse(res.data);
            
            //loop thru articles
            results.response.docs.slice(0,6).map(article => {
                //if no photo url is provided by NYT, insert generic
                if(article.multimedia.length !== 0){
                    article.multimedia[0].url = "https://static01.nyt.com/" + article.multimedia[0].url
                } else {
                    article.multimedia.push({});//must add 0th element to add url for standard reference
                    article.multimedia[0].url = "http://wldywjbl.co/wp-content/uploads/2014/11/news2.jpg"
                }                
            });
            
            //set first 5 results array elements to state
            this.setState({searchResults: results.response.docs.slice(0,6)});

            console.log(this.state.searchResults); 
         
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
                        <div className="input-field col s12">
                            {/* search text */}
                            <input
                                value={this.state.searchCriteria}
                                name="searchCriteria"
                                onChange={this.handleInputChange}
                                type="text"
                                placeholder="Search the news..."
                                required="required"
                            />
                        </div>
                        <div className="input-field col s6">
                            {/* start year */}
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
                            {/* end year */}
                            <input
                                value={this.state.endYear}
                                name="endYear"
                                onChange={this.handleInputChange}
                                type="number"
                                placeholder="Start Year"
                            />
                            <label htmlFor="endYear">End Year</label>

                            {/* search button */}
                            <Button title="Get News" className="btn waves-effect waves-light orange darken-2" onClick={this.handleFormSubmit}>Search</Button>
                        </div>
                    </form>
                </Row>

                {/* search results section */}
                <Row>
                    <h4 className='dash-title'>Search Results</h4>
                    {this.state.searchResults.length ? (
                        // <List>
                        <div className="container">
                            <div className="row">
                                {this.state.searchResults.map(article => (
                                    
                                    <ArticleCard
                                        url = {article.web_url}
                                        photo =  {article.multimedia[0].url}
                                        snippet = {article.snippet}
                                        headline = {article.headline.main}
                                    />
                                ))}
                            </div>
                        </div>
                        //</List>
                        ) : (
                        <h6><i>No Results to Display</i></h6>
                        )}
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
