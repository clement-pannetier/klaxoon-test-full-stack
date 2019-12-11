import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import * as serviceWorker from './serviceWorker';

import App from './App';
import vimeoRoutes from './routes/vimeo';
import flickrRoutes from './routes/flickr';
import { API_ENTRYPOINT } from './config/config';

ReactDOM.render(
  <Router>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <span className="navbar-brand">Gestionnaire de favoris</span>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link">Accueil</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={API_ENTRYPOINT}>Documentation</a>
          </li>
        </ul>
      </div>
    </nav>

    <Switch>
      <Route path="/" component={App} strict={true} exact={true}/>
      {vimeoRoutes}
      {flickrRoutes}
      <Route render={() => <h1>Not Found</h1>} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
