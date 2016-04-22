/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
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
    },
    {
      find(image) {
        return Meteor.users.find(image.userId, { limit: 1 });
      }
    }
  ]
});

Meteor.publishComposite('userImages', function userImages(userId) {
  return {
    find() {
      check(userId, String);
      const user = Meteor.users.findOne(userId);

      if (!user) {
        return this.ready();
      }

      const query = {};

      query.userId = { $eq: user._id };

      return Images.find(query);
    },
    children: [
      {
        find(image) {
          return Pins.find({ imageId: image._id, userId: image.userId });
        }
      },
      {
        find(image) {
          return Meteor.users.find(image.userId, { limit: 1 });
        }
      }
    ]
  };
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
    },
    {
      find(image) {
        return Meteor.users.find(image.userId, { limit: 1 });
      }
    }
  ]
});
