import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import MainLayout from '/imports/ui/layouts/main';
import Index from '/imports/ui/components/index';
import AllImages from '/imports/ui/components/allImages';
import UserImages from '/imports/ui/components/userImages';
import MyImages from '/imports/ui/components/myImages';

export const Routes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ MainLayout }>
      <IndexRoute component={ Index } />
      <Route path="/images" component={ AllImages } />
      <Route path="/images/:userId" component={ UserImages } />
      <Route path="/myimages" component={ MyImages } />
    </Route>
  </Router>
);
