import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import Form from "./styles/Form";
import Error from "../components/ErrorMessage";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "",
    description: "",
    image: "",
    largeImage: "",
    price: 0
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;

    this.setState({ [name]: val });
  };

  uploadFile = async e => {
    console.log(e)
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    // Needed for cloudinary
    data.append('upload_preset', 'sickfits')

    const res = await fetch('https://api.cloudinary.com/v1_1/dgkftr3d4/image/upload', {
      method: 'POST',
      body: data
    })

    const file = await res.json()
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    })
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async e => {
              // Stop the form from submitting
              e.preventDefault();
              // Call the mutation
              const res = await createItem();
              // Change them to the single item page
              Router.push({
                pathname: "/item",
                query: { id: res.data.createItem.id }
              });
            }}
          >
            <Error error={error} />
            <h2>Sell an Item.</h2>
            {/* If loading is true the fieldset will be disabled. The aria-busy tells somethings is updated. That's neat! */}
            <fieldset disabled={loading} aria-busy={loading}>
              {/* TODO: wait for uploading file */}
              <label htmlFor="file">File</label>
              <input
                type="file"
                id="file"
                name="file  "
                placeholder="Upload an image"
                required
                onChange={this.uploadFile}
              />
              {this.state.image && <img width="200px" src={this.state.image} alt="Upload preview"/>}
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                required
                value={this.state.title}
                onChange={this.handleChange}
              />

              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                required
                value={this.state.price}
                onChange={this.handleChange}
              />

              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter A Description"
                required
                value={this.state.description}
                onChange={this.handleChange}
              />
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
