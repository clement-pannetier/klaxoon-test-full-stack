import React, { Component } from 'react';
import { fetchAPI } from '../../utils/fetchAPI';

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: [],
      keywords: [],
    };
  }

  getKeywords = () => {
    let options = { method: 'GET' };
    let keywordsList = [];

    for(let key of this.state.item['keywords']) {
      fetchAPI(key, options)
        .then(
          (response) => {
            keywordsList.push(response);
            this.setState({
              isLoaded: true,
              keywords: keywordsList
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  }

  componentDidMount() {
    let options = { method: 'GET' };
    
    fetchAPI(decodeURIComponent(this.props.match.params.id), options)
      .then(
        (response) => {
          this.setState({
            isLoaded: true,
            item: response,
          },
          () => this.getKeywords());
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, item, keywords } = this.state;

    if (error) {
      return <div className="alert alert-danger">Erreur: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="alert alert-info">Chargement...</div>
    } else {
      return (
        <main role="main" className="container-xl">
          <h1>Détails du favori "{item['@id']}"
            {keywords.map((keyword) => ( 
              <span key={keyword['id']} className="badge badge-info ml-3">{keyword['name']}</span> 
            ))}
          </h1>
          
          <form>
            <FormInput
              id={`inputId`}
              type={`number`}
              label={`Id`}
              value={item['id']}
            />
            <FormInput
              id={`inputTitle`}
              type={`text`}
              label={`Titre`}
              value={item['title']}
            />
            <FormInput
              id={`inputAuthorName`}
              type={`text`}
              label={`Nom de l'auteur`}
              value={item['authorName']}
            />
            <FormInput
              id={`inputURL`}
              type={`url`}
              label={`URL`}
              value={item['URL']}
            />
            <FormInput
              id={`inputDuration`}
              type={`number`}
              label={`Durée`}
              value={item['duration']}
            />
            <FormInput
              id={`inputWidth`}
              type={`number`}
              label={`Width`}
              value={item['width']}
            />
            <FormInput
              id={`inputHeight`}
              type={`number`}
              label={`Height`}
              value={item['height']}
            />
            <FormInput
              id={`inputAddedDate`}
              type={`text`}
              label={`Date d'ajout`}
              value={item['addedDate']}
            />
          </form>
        </main>
      );
    }
  }
}

export default Show;

const FormInput = ({ id, type, label, value }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input type={type} className="form-control" id={id} value={value} readOnly></input>
  </div>
);
