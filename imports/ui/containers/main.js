import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import MainLayout from '../layouts/main.js';

const MainLayoutContainer = createContainer(() => ({
  currentUser: Meteor.user()
}), MainLayout);

export default MainLayoutContainer;
