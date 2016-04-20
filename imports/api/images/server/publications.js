/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Pins } from '../../pins/pins';
import { Images } from '../images';
import _ from 'underscore';

Meteor.publishComposite('myImages', {
  find() {
    if (!this.userId) {
      return this.ready();
    }

    const query = {};

    query.pinnedBy = { $elemMatch: { $eq: this.userId } };

    return Images.find(query);
  },
  children: [
    {
      find(image) {
        return Pins.find({ imageId: image._id, userId: this.userId });
      }
    }
  ]
});

Meteor.publishComposite('allImages', {
  find() {
    const query = {};
    const pinQuery = {};
    const userId = this.userId;

    // if user logged in, find all images _not_ pinned by the user
    if (userId) {
      pinQuery.userId = { $eq: userId };
      const imageIdList = _.uniq(Pins.find(pinQuery, { fields: { imageId: 1 } })
        .map(i => i.imageId));
      query._id = { $nin: imageIdList };
    }

    return Images.find(query);
  },
  children: [
    {
      find(image) {
        const pinQuery = {};
        const userId = this.userId;

        if (userId) {
          pinQuery.userId = { $ne: userId };
        }
        pinQuery.imageId = image._id;

        return Pins.find(pinQuery, { limit: 1 });
      }
    }
  ]
});
