/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Pins } from '../pins';

Meteor.publish('pins', function pins(pinId) {
  check(pinId, String);

  return Pins.find(pinId);
});

Meteor.publish('allPins', function pins() {
  const query = {};

  return Pins.find(query);
});

Meteor.publish('myPins', function pins() {
  if (!this.userId) {
    return this.ready();
  }

  const query = {};

  if (this.userId) {
    query.userId = this.userId;
  }

  return Pins.find(query);
});
