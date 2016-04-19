import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Images } from './images';
import { Pins } from '../pins/pins';

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
    Pins.insert({ imageId, description });
  }
});

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

    Pins.remove(existingPin);
    Images.update(image, { $inc: { pinCount: -1 } });
    // remove the image if the pin count has went < 1
    Images.remove({ _id: image._id, pinCount: { $lt: 1 } });
  }
});
