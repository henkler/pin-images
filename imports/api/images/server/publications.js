/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Images } from '../images';

Meteor.publish('images', function images(imageId) {
  check(imageId, String);

  return Images.find(imageId);
});

Meteor.publish('allImages', function images() {
  const query = {};

  return Images.find(query);
});

Meteor.publish('myImages', function images() {
  if (!this.userId) {
    return this.ready();
  }

  const query = {};

  if (this.userId) {
    query.userId = this.userId;
  }

  return Images.find(query);
});
