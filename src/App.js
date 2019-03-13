import React, { Component } from 'react';
import './App.css';
import MyRepositories from './components/MyRepositories';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const query = gql`
  {
    viewer {
      name
      email
    }
  }
`;

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Query query={query}>
          {result => {
            if (result.loading) return <p>loading...</p>;
            if (result.error) return <p>{result.error.message}</p>;
            return (
              <React.Fragment>
                <div>
                  <h1>Name: {result.data.viewer.name}</h1>
                  <p>Email: {result.data.viewer.email}</p>
                </div>
                <div>
                  <MyRepositories />
                </div>
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default App;
