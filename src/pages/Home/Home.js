import React, { Component } from 'react';
import Form from "../../components/Form/Form"

class Home extends Component {

  render() {
    return (
        <main>
            <div className='container padding-1'>
                <div className='row'>
                    <div className='col s12'>
                        <h4 className='dash-title'>Search the News</h4>
                        <Form/>
                    </div>
                </div>
            </div>
    </main>);
  }
}

export default Home;
