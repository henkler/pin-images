import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { insert, remove } from './methods';

export const Pins = new Mongo.Collection('pins');

Pins.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Pins.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Pins.schema = new SimpleSchema({
  url: {
    type: String,
    label: 'Image URL',
    regEx: SimpleSchema.RegEx.Url
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

Pins.attachSchema(Pins.schema);

Pins.helpers({
  editableByCurrentUser() {
    return this.userId === Meteor.userId();
  },
  insert() {
    insert.call({
      url: this.url
    });
  },
  canInsert() {
    if (Meteor.userId()) {
      return true;
    }

    return false;
  },
  remove() {
    remove.call({ _id: this._id });
  },
  canRemove() {
    return this.editableByCurrentUser();
  }
});
