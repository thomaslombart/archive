import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import Pagination from "./Pagination";
import Item from "./Item";
import { perPage } from "../config";

// Best practice: query in caps
const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title 
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Items extends Component {
  render() {
    return (
      <Center>
        <Pagination page={this.props.page} />
        {/* We use the query via a render prop */}
        <Query
          query={ALL_ITEMS_QUERY}
          /* fetchPolicy="network-only" : 
          never use the cache so that when we add an item, home page is up-to-date */
          variables={{
            skip:
              this.props.page * perPage -
              perPage /* Example for page 2: 2 * 4 - 4 = 4 */
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <ItemsList>
                {data.items.map(item => (
                  <Item item={item} key={item.id} />
                ))}
              </ItemsList>
            );
          }}
        </Query>
        <Pagination page={this.props.page} />
      </Center>
    );
  }
}

export default Items;
export { ALL_ITEMS_QUERY };
