import React from 'react';
import { Route } from 'react-router-dom';
import Vimeo from '../components/vimeo/Vimeo';
import Show from '../components/vimeo/Show';
import Create from '../components/vimeo/Create';
import Edit from '../components/vimeo/Edit';

export default [
  <Route path="/vimeos/create" component={Create} exact key="create" />,
  <Route path="/vimeos/edit/:id" component={Edit} exact key="edit" />,
  <Route path="/vimeos/show/:id" component={Show} exact key="show" />,
  <Route path="/vimeos/" component={Vimeo} exact strict key="vimeo" />,
];
