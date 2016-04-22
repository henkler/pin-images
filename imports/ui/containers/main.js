import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import MainLayout from '../layouts/main.js';
import { Counts } from '/imports/api/counts/counts';

const MainLayoutContainer = createContainer(() => {
  Meteor.subscribe('pinCount');

  return {
    currentUser: Meteor.user(),
    counts: Counts.findOne()
  };
}, MainLayout);

export default MainLayoutContainer;
