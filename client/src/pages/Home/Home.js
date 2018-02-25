import React, { Component } from 'react';
import { Row } from "../../components/Grid";
import ArticleCard from "../../components/ArticleCard";
import SavedCard from "../../components/SavedCard";
import Button from '../../components/Button';
import API from '../../utils/API'

class Home extends Component {

    state = {
        searchCriteria: "",
        startYear: 2018,
        endYear:2018,
        searchResults: [],
        savedArticles: []
        };

    componentDidMount = update => {
        //get previously saved articles
        API.getSavedArticles()
        .then((res) => {
            this.setState({savedArticles: res.data})
        })
        .catch((err) => console.log(err));
    }

    handleInputChange = event => {
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
        
        //reset the query text field only...assuming user may search again in same year range
        this.setState({
        searchCriteria: ""
        });
    })
    .catch((err) => console.log(err));
    };
    
    saveArticle = article => {
        //store article details in object and server to api
        const data = {
            title: article.headline,
            summary: article.snippet,
            photo: article.photo,
            link: article.url
        }

        API.saveArticle(data)
        .then(res =>{

            //add saved article to existing state array (push)
            this.setState({ savedArticles: [...this.state.savedArticles, res.data] })
        })
        .catch(console.log)
    }

    deleteArticle = articleId => {
        console.log(articleId)
        API.deleteArticle(articleId)
        .then(res =>{
            
            //filter out the deleted article and reset state
            this.setState({ savedArticles: this.state.savedArticles.filter(article => article._id !== res.data.id) })

          })
        .catch(console.log)
    }

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
                            <input className="input-format"
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
                            <input className="input-format"
                                value={this.state.startYear}
                                name="startYear"
                                onChange={this.handleInputChange}
                                type="number"
                                placeholder="Start Year"
                            />
                            <label htmlFor="startYear" className="label-format">Start Year</label>
                        </div>
                        <div className="input-field col s6">
                            {/* end year */}
                            <input className="input-format"
                                value={this.state.endYear}
                                name="endYear"
                                onChange={this.handleInputChange}
                                type="number"
                                placeholder="Start Year"
                            />
                            <label htmlFor="endYear" className="label-format">End Year</label>

                            {/* search button */}
                            <Button title="Get News" className="btn waves-effect waves-light orange darken-2 right" onClick={this.handleFormSubmit}>Search</Button>
                        </div>
                    </form>
                </Row>

                {/* search results section */}
                <Row>
                    
                    {this.state.searchResults.length ? (
                        // <List>
                        <div className="container">
                            <h4 className='dash-title' style={{'color': '#ff9800'}}>Search Results</h4>
                            <div className="row">
                                {this.state.searchResults.map(article => (
                                    
                                    <ArticleCard
                                        key = {article._id}
                                        url = {article.web_url}
                                        photo =  {article.multimedia[0].url}
                                        snippet = {article.snippet}
                                        headline = {article.headline.main}
                                        id = {article._id}
                                        saveclick = {this.saveArticle.bind(this)}
                                    />
                                ))}
                            </div>
                        </div>
                        //</List>
                        ) : ""}
                </Row>
                

                {/* saved & annotated news section */}
                <Row>
                    {this.state.savedArticles.length ? (
                        // <List>
                        <div className="container">
                            <h4 className='dash-title' style={{'color': '#ff9800'}}>Saved Articles</h4>
                            <div className="row">
                                {this.state.savedArticles.map(article => (
                                    
                                    <SavedCard
                                        key = {article._id}
                                        url = {article.link}
                                        photo =  {article.photo}
                                        snippet = {article.summary}
                                        headline = {article.title}
                                        id = {article._id}
                                        deleteclick = {this.deleteArticle.bind(this)}
                                    />
                                ))}
                            </div>
                        </div>
                        //</List>
                        ) : ""}
                </Row>
            </div>
    </main>);
  }
}

export default Home;
