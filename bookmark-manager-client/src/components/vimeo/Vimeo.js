import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchAPI } from '../../utils/fetchAPI';

class Vimeo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isDeleted: false,
      items: [],
    };
  }

  componentDidMount() {
    let options = { method: 'GET' };
    
    fetchAPI(decodeURIComponent('vimeos'), options)
    .then(
      (response) => {
        this.setState({
          isLoaded: true,
          items: response
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

  del = (id) => {
    if (window.confirm('Etes-vous sûr(e) de vouloir supprimer ce favori ?')) {
      let options = { method: 'DELETE' };

      fetchAPI(decodeURIComponent(this.props.match.path + id), options)
      .then(
        (response) => {
          this.setState({
            isDeleted: true,
            item: response
          });
        },
        (error) => {
          this.setState({
            isDeleted: false,
            error
          });
        }
      )
    }
  };

  render() {
    const { error, isLoaded, isDeleted, items } = this.state;

    if (error) {
      return <div className="alert alert-danger">Erreur: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="alert alert-info">Chargement...</div>
    } else {
      return (
        <main role="main" className="container-xl">
          <h1>Liste des favoris Vimeo</h1>
          {isDeleted && (
            <div className="alert alert-success" role="status">
              favori supprimé.
            </div>
          )}
          {isDeleted && this.componentDidMount()}

          <table className="table table-responsive table-striped">
            <thead className="thead-dark">
              <tr>
                <th>id</th>
                <th>Titre</th>
                <th>Auteur</th>
                <th>URL</th>
                <th>Durée</th>
                <th>Width</th>
                <th>Height</th>
                <th>Date d'ajout</th>
                <th colSpan={2} />
              </tr>
            </thead>
            <tbody>
              {items && items['hydra:member'].map((item) => (
                <tr key={item['@id']}>
                  <th scope="row">
                    <Link to={`show/${encodeURIComponent(item['@id'])}`}>
                      {item['@id']}
                    </Link>
                  </th>
                  <td>{item['title']}</td>
                  <td>{item['authorName']}</td>
                  <td><a href={item['URL']} target="_blank" rel="noopener noreferrer">{item['URL']}</a></td>
                  <td>{item['duration']}</td>
                  <td>{item['width']}</td>
                  <td>{item['height']}</td>
                  <td>{item['addedDate']}</td>
                  <td>
                    <Link to={`edit/${encodeURIComponent(item['@id'])}`}>
                      <span className="fa fa-edit text-success" aria-hidden="true" />
                      <span className="sr-only">Modifier</span>
                    </Link>
                  </td>
                  <td>
                    <span onClick={() => this.del(item['id'])} className="fa fa-trash text-danger" aria-hidden="true" />
                    <span className="sr-only">Supprimer</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Link to="create" className="btn btn-primary">
            Ajouter
          </Link>
        </main>
      );
    }
  }
}

export default Vimeo;
