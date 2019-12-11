import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { fetchAPI } from '../../utils/fetchAPI';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isEdited: false,
      isDeleted: false,
      item: [],
      itemKeywords: [],
      keywords: [],
      newKeyword: "",
    };
  }

  getAllKeywords = () => {
    let options = { method: 'GET' };

    fetchAPI("keywords", options)
      .then(
        (response) => {
          this.setState({
            isLoaded: true,
            keywords: response,
            newKeyword: response['hydra:member'][0]['@id']
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

  getItemKeywords = () => {
    let options = { method: 'GET' };
    let keywordsList = [];

    for(let key of this.state.item['keywords']) {
      fetchAPI(key, options)
        .then(
          (response) => {
            delete response['@context'];
            keywordsList.push(response);
            this.setState({
              itemKeywords: keywordsList
            });
          },
          (error) => {
            this.setState({
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
          item: response
        },
        () => { 
          this.getAllKeywords();
          this.getItemKeywords()
        });
      },
      (error) => {
        this.setState({
          error
        });
      }
    )
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState((prevState) => ({
      item: {
        ...prevState.item,
        URL: value
      }
    }));
    
  }

  handleChangeKeyword = (event) => {
    const value = event.target.value;
    this.setState({
      newKeyword: value
    });
  }

  addKeywordToItem = (event) => {
    event.preventDefault();
    console.log("event", event.target.value)
    const value = this.state.newKeyword;
    console.log("value", value)
    this.state.item.keywords.push(value);

    let options = { method: 'PUT', body: JSON.stringify(this.state.item) };
    
    fetchAPI(decodeURIComponent(this.props.match.params.id), options)
    .then(
      (response) => {
        this.setState({
          isEdited: true,
          item: response,
          error: ""
        });
      },
      (error) => {
        this.setState({
          isEdited: false,
          error
        });
      }
    )
  }

  edit = () => {
    let options = { method: 'PUT', body: JSON.stringify(this.state.item) };
    
    fetchAPI(decodeURIComponent(this.props.match.params.id), options)
    .then(
      (response) => {
        this.setState({
          isEdited: true,
          item: response,
          error: ""
        });
      },
      (error) => {
        this.setState({
          isEdited: false,
          error
        });
      }
    )
  }

  del = () => {
    if (window.confirm('Etes-vous sûr(e) de vouloir supprimer ce favori ?')) {
      let options = { method: 'DELETE' };

      fetchAPI(decodeURIComponent(this.props.match.params.id), options)
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
    const { error, isLoaded, isEdited, isDeleted, item, itemKeywords, keywords } = this.state;
    
    if (!isLoaded) {
      return <div className="alert alert-info">Chargement...</div>
    } else if (isDeleted)
      return (
        <Redirect
          to={`..`}
        />
      );
    else {
      return(
        <main role="main" className="container-xl">
          <h1>Modifier le favori "{item['@id']}"
            {itemKeywords.map((keyword) => (
              <span key={keyword['id']} className="badge badge-info ml-3">{keyword['name']}</span> 
            ))}
          </h1>

          {isEdited && (
            <div className="alert alert-success" role="status">
              {item['@id']} mis à jour.
            </div>
          )}
          {error && (
            <div className="alert alert-danger">Erreur: {error.message}<br />L'URL rentrée semble erronée.</div>
          )}

          <form
            onSubmit={event => {
              event.preventDefault();
              this.edit();
            }}
          >
            <div className="form-group">
              <label htmlFor="inputURL">URL</label>
              <input type="text" className="form-control" id="inputURL" value={item['URL']} onChange={this.handleChange}></input>
            </div>

            <button className="btn btn-success mb-3">Modifier</button>
          </form>

          <form
            onSubmit={
              this.addKeywordToItem
            }>
            <div className="form-group">
              <label htmlFor="inputKeywords">Mots clés</label>
              <select name="inputKeywords" className="custom-select" value={this.state.newKeyword} onChange={this.handleChangeKeyword}>
                {keywords['hydra:member'].filter(item1 => 
                  !itemKeywords.some(item2 => 
                    item2['@id'] === item1['@id'])).map((keyword) => (
                      <option key={keyword['id']} value={keyword['@id']}>{keyword['name']}</option> 
                    ))}
              </select>
            </div>

            <button className="btn btn-success">Ajouter</button>
          </form>

          <Link to=".." className="btn btn-primary mt-1">
            Retour à la liste
          </Link>
          <button onClick={this.del} className="btn btn-danger ml-1 mt-1">
            Supprimer
          </button>
        </main>
      )
    }
  }
}

export default Edit;
