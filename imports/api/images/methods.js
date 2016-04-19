import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Images } from './images';

export const insert = new ValidatedMethod({
  name: 'images.insert',
  validate: new SimpleSchema({
    url: { type: String, regEx: SimpleSchema.RegEx.Url }
  }).validator(),
  run({ url }) {
    if (!this.userId) {
      throw new Meteor.Error('images.insert.accessDenied',
        'Not authenticated');
    }

    const imageFields = {
      url
    };

    Images.insert(imageFields);
  }
});

export const remove = new ValidatedMethod({
  name: 'images.remove',
  validate: new SimpleSchema({
    imageId: { type: String, regEx: SimpleSchema.RegEx.Id }
  }).validator(),
  run({ imageId }) {
    if (!this.userId) {
      throw new Meteor.Error('images.remove.accessDenied',
        'Not authenticated');
    }

    const image = Images.findOne(imageId);

    if (!image) {
      throw new Meteor.Error('images.remove.accessDenied',
        'Unable to find image');
    }

    if (!image.editableByCurrentUser()) {
      throw new Meteor.Error('images.remove.accessDenied',
        'Cannot remove a image you do not own');
    }

    Images.remove(imageId);
  }
});
