import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Images } from './images';
import { Pins } from '../pins/pins';

export const pin = new ValidatedMethod({
  name: 'images.pin',
  validate: new SimpleSchema({
    imageId: { type: String, regEx: SimpleSchema.RegEx.Id },
    description: { type: String, defaultValue: '' }
  }).validator(),
  run({ imageId, description }) {
    if (!this.userId) {
      throw new Meteor.Error('images.pin.accessDenied',
        'Not authenticated');
    }

    const image = Images.findOne(imageId);

    if (!image) {
      throw new Meteor.Error('images.pin.accessDenied',
        'Unable to find image');
    }

    const existingPin = Pins.findOne({ imageId, userId: this.userId });

    if (existingPin) {
      throw new Meteor.Error('images.pin.accessDenied',
        'Image is already pinned');
    }

    Images.update(image, { $push: { pinnedBy: this.userId } });
    Images.update(image, { $inc: { pinCount: 1 } });
    Pins.insert({ imageId, description });
  }
});

export const unpin = new ValidatedMethod({
  name: 'images.unpin',
  validate: new SimpleSchema({
    imageId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ imageId }) {
    if (!this.userId) {
      throw new Meteor.Error('images.unpin.accessDenied',
        'Not authenticated');
    }

    const image = Images.findOne(imageId);

    if (!image) {
      throw new Meteor.Error('images.unpin.accessDenied',
        'Unable to find image');
    }

    const existingPin = Pins.findOne({ imageId, userId: this.userId });

    if (!existingPin) {
      throw new Meteor.Error('images.unpin.accessDenied',
        'Image is not pinned');
    }

    Images.update(image, { $pull: { pinnedBy: this.userId } });
    Images.update(image, { $inc: { pinCount: -1 } });
    Pins.remove(existingPin);

    // remove the image if the pin count has went < 1
    Images.remove({ _id: image._id, pinCount: { $lt: 1 } });
  }
});

export const insert = new ValidatedMethod({
  name: 'images.insert',
  validate: new SimpleSchema({
    url: { type: String, regEx: SimpleSchema.RegEx.Url },
    description: { type: String, defaultValue: '' }
  }).validator(),
  run({ url, description }) {
    if (!this.userId) {
      throw new Meteor.Error('images.insert.accessDenied',
        'Not authenticated');
    }

    const imageFields = {
      url
    };

    const imageId = Images.insert(imageFields);
    pin.call({ imageId, description });
  }
});

export const edit = new ValidatedMethod({
  name: 'images.edit',
  validate: new SimpleSchema({
    imageId: { type: String, regEx: SimpleSchema.RegEx.Id },
    description: { type: String, defaultValue: '' }
  }).validator(),
  run({ imageId, description }) {
    if (!this.userId) {
      throw new Meteor.Error('images.edit.accessDenied',
        'Not authenticated');
    }

    const image = Images.findOne(imageId);

    if (!image) {
      throw new Meteor.Error('images.edit.accessDenied',
        'Unable to find image');
    }

    const existingPin = Pins.findOne({ imageId, userId: this.userId });

    if (!existingPin) {
      throw new Meteor.Error('images.edit.accessDenied',
        'Unable to retrieve pin');
    }

    Pins.update(existingPin._id, { $set: { description } });
  }
});
