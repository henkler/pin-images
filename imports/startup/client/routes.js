import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import MainLayout from '/imports/ui/layouts/main';
import Index from '/imports/ui/components/index';
import AddImage from '/imports/ui/components/addImage';
import AllImages from '/imports/ui/components/allImages';
import MyImages from '/imports/ui/components/myImages';

export const Routes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ MainLayout }>
      <IndexRoute component={ Index } />
      <Route path="/addimage" component={ AddImage } />
      <Route path="/images" component={ AllImages } />
      <Route path="/myimages" component={ MyImages } />
    </Route>
  </Router>
);
