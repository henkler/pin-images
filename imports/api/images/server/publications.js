/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Images } from '../images';

Meteor.publish('allImages', function images() {
  const query = {};

  return Images.find(query);
});
