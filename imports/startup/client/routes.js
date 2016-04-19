import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import MainLayout from '/imports/ui/layouts/main';
import Index from '/imports/ui/components/index';
import AddImage from '/imports/ui/components/addImage';
import MyPins from '/imports/ui/components/myPins';

export const Routes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ MainLayout }>
      <IndexRoute component={ Index } />
      <Route path="/addimage" component={ AddImage } />
      <Route path="/mypins" component={ MyPins } />
    </Route>
  </Router>
);
