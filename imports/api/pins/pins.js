import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

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
  imageId: {
    type: String,
    label: 'Pin ID',
    regEx: SimpleSchema.RegEx.Id
  },
  description: {
    type: String,
    label: 'Pin Description',
    defaultValue: '',
    max: 40
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
      return undefined;
    }
  }
});

Pins.attachSchema(Pins.schema);
