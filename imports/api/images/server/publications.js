/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { Pins } from '../../pins/pins';
import { Images } from '../images';

Meteor.publishComposite('myImages', {
  find() {
    if (!this.userId) {
      return this.ready();
    }

    const query = {};

    query.pinnedBy = { $eq: this.userId };

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

    // if user logged in, find all images _not_ pinned by the user
    if (this.userId) {
      query.pinnedBy = { $ne: this.userId };
    }

    return Images.find(query);
  },
  children: [
    {
      find(image) {
        const pinQuery = {};

        if (this.userId) {
          pinQuery.userId = { $ne: this.userId };
        }
        pinQuery.imageId = image._id;

        return Pins.find(pinQuery, { limit: 1 });
      }
    }
  ]
});
