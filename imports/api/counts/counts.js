import { Mongo } from 'meteor/mongo';

export const Counts = new Mongo.Collection('counts');

Counts.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Counts.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});
