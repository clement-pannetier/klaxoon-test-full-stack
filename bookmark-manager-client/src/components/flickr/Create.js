import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fetchAPI } from '../../utils/fetchAPI';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isCreated: false,
      item: "",
    };
  }

  handleChange = (event) => {
    this.setState({item: event.target.value});
  }

  create = () => {
    const values = {
      "width": 0,
      "height": 0,
      "URL": this.state.item,
      "title": "string",
      "authorName": "string",
      "addedDate": new Date()
    }
    let options = { method: 'POST', body: JSON.stringify(values) };
    
    fetchAPI('flickrs', options)
    .then(
      (response) => {
        this.setState({
          isCreated: true,
          item: response
        });
      },
      (error) => {
        this.setState({
          isCreated: false,
          error
        });
      }
    )
  }

  render() {
    const { error, item } = this.state;

    if (this.state.isCreated)
      return (
        <Redirect
          to={`.`}
        />
      );

    return(
      <main role="main" className="container-xl">
        <h1>Ajouter un favori</h1>
        <a href="https://www.flickr.com/search/?text=" className="btn btn-info mb-3" target="_blank" rel="noopener noreferrer">
          Rechercher une photo sur le site Flickr.com &nbsp;
          <span className="fa fa-search text-white" aria-hidden="true" />
          <span className="sr-only">Rechercher</span>
        </a>

        {error && (
          <div className="alert alert-danger">Erreur: {error.message}<br />L'URL rentrée semble erronée.</div>
        )}

        <form
          onSubmit={event => {
            event.preventDefault();
            this.create();
          }}
        >
          <div className="form-group">
            <label htmlFor="inputURL">URL</label>
            <input type="text" className="form-control" id="inputURL" value={item} onChange={this.handleChange} required></input>
          </div>
          
          <button className="btn btn-primary">Ajouter</button>
        </form>
      </main>
    )
  }
}

export default Create;
