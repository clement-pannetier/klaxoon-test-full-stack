import React from 'react';
import { Route } from 'react-router-dom';
import Flickr from '../components/flickr/Flickr';
import Show from '../components/flickr/Show';
import Create from '../components/flickr/Create';
import Edit from '../components/flickr/Edit';

export default [
  <Route path="/flickrs/create" component={Create} exact key="create" />,
  <Route path="/flickrs/edit/:id" component={Edit} exact key="edit" />,
  <Route path="/flickrs/show/:id" component={Show} exact key="show" />,
  <Route path="/flickrs/" component={Flickr} exact strict key="flickr" />,
];
