import React from 'react';
import './App.css';
import { ENTRYPOINT, API_ENTRYPOINT } from './config/config'

function App() {
  return (
    <main role="main" className="container-xl">
      <div className="jumbotron">
        <h1>Gestionnaire de favoris</h1>
        <p className="lead">Cette application a été développée dans le cadre d'un test de connaisances pour le métier de développeur Web Full Stack chez <a href="https://klaxoon.com/fr/" target="_blank" rel="noopener noreferrer">Klaxoon</a>.</p>
        <a className="btn btn-lg btn-dark" href={API_ENTRYPOINT} role="button">Voir la documentation &raquo;</a>
      </div>

      <div className="card-deck">
        <div className="card">
          <img src="https://upload.wikimedia.org/wikipedia/fr/thumb/b/bf/Vimeo_logo.svg/500px-Vimeo_logo.svg.png" className="card-img-top" alt="..."></img>
          <div className="card-body">
            <h5 className="card-title">Vimeo</h5>
            <p className="card-text">Vimeo est un site web communautaire destiné au partage et au visionnage de vidéos faites par les utilisateurs.</p>
          </div>
          <div className="card-footer">
            <a href={`${ENTRYPOINT}/vimeos/`} className="btn btn-dark">Accéder aux favoris &raquo;</a>
          </div>
        </div>
        
        <div className="card">
          <img src="https://cdn.pixabay.com/photo/2015/08/09/10/19/flickr-881367_960_720.png" className="card-img-top" alt="..."></img>
          <div className="card-body">
            <h5 className="card-title">Flickr</h5>
            <p className="card-text">Flickr est un site web de partage de photographies et de vidéos gratuit, avec certaines fonctionnalités payantes.</p>
          </div>
          <div className="card-footer">
            <a href={`${ENTRYPOINT}/flickrs/`} className="btn btn-dark">Accéder aux favoris &raquo;</a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
