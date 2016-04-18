import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Pins } from './pins';

export const insert = new ValidatedMethod({
  name: 'pins.insert',
  validate: new SimpleSchema({
    url: { type: String, regEx: SimpleSchema.RegEx.Url }
  }).validator(),
  run({ url }) {
    if (!this.userId) {
      throw new Meteor.Error('pins.insert.accessDenied',
        'Not authenticated');
    }

    const pinFields = {
      url
    };

    Pins.insert(pinFields);
  }
});

export const remove = new ValidatedMethod({
  name: 'pins.remove',
  validate: new SimpleSchema({
    pinId: { type: String }
  }).validator(),
  run({ pinId }) {
    if (!this.userId) {
      throw new Meteor.Error('pins.remove.accessDenied',
        'Not authenticated');
    }

    const pin = Pins.findOne(pinId);

    if (!pin) {
      throw new Meteor.Error('pins.remove.accessDenied',
        'Unable to find pin');
    }

    if (!pin.editableByCurrentUser()) {
      throw new Meteor.Error('pins.remove.accessDenied',
        'Cannot remove a pin you do not own');
    }

    Pins.remove(pinId);
  }
});
