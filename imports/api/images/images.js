import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { insert, pin, unpin } from './methods';

import { Pins } from '../pins/pins';

export const Images = new Mongo.Collection('images');

Images.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Images.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Images.schema = new SimpleSchema({
  url: {
    type: String,
    label: 'Pin URL',
    regEx: SimpleSchema.RegEx.Url
  },
  pinCount: {
    type: Number,
    label: 'Number of pins',
    defaultValue: 0
  },
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true,
    autoValue() {
      if (this.isInsert) {
        return this.userId;
      } else if (this.isUpsert) {
        return { $setOnInsert: this.userId };
      }

      this.unset();  // Prevent user from supplying their own value
    }
  }
});

Images.attachSchema(Images.schema);

Images.helpers({
  editableByCurrentUser() {
    return this.userId === Meteor.userId();
  },
  insert() {
    const imageId = insert.call({ url: this.url });
    this.pin(this.description);
  },
  canInsert() {
    if (Meteor.userId()) {
      return true;
    }

    return false;
  },
  pin(description) {
    pin.call({ imageId: this._id, description });
  },
  canPin() {
    return this.canInsert() &&
      Pins.find({ userId: Meteor.userId(), imageId: this._id }).count() === 0;
  },
  unpin() {
    unpin.call({ imageId: this._id });
  },
  canUnpin() {
    return this.canInsert() &&
        Pins.find({ userId: Meteor.userId(), imageId: this._id }).count() === 1;
  }
});
