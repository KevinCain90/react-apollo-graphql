import React, { Component } from 'react';
import DisplayRepos from './DisplayRepos';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const reposQuery = gql`
  query Myrepositories($first: Int!) {
    viewer {
      repositories(first: $first) {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;

class Myrepositories extends Component {
  handleMore = (data, fetchMore, current) => {
    fetchMore({
      variables: { first: current + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        return Object.assign(prev, fetchMoreResult);
      }
    });
  };

  render() {
    return (
      <Query query={reposQuery} variables={{ first: 1 }}>
        {({ data, loading, error, fetchMore, refetch }) => {
          if (loading) return <p>loading...</p>;
          if (error) return <p>{error.message}</p>;

          let current = data.viewer.repositories.edges.length;

          return (
            <DisplayRepos
              current={current}
              refetch={refetch}
              data={data}
              handleMore={() => this.handleMore(data, fetchMore, current)}
            />
          );
        }}
      </Query>
    );
  }
}

export default Myrepositories;
