import React, { Component } from 'react';
import Form from "../../components/Form/Form"
import { Col, Row, Container } from "../../components/Grid";

class Home extends Component {

  render() {
    return (
        <main>
            <div className='container padding-1'>
                {/* search news section */}
                <Row>
                    <h4 className='dash-title'>Search the News</h4>
                    <Form/>
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
