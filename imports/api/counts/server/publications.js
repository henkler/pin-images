import { Meteor } from 'meteor/meteor';
import { Pins } from '../../pins/pins';

Meteor.publish('pinCount', function countsPinCount() {
  if (!this.userId) {
    return this.ready();
  }

  const self = this;
  let pinCount = 0;
  let initializing = true;

  const handle = Pins.find({ userId: this.userId }).observeChanges({
    added() {
      pinCount++;
      if (!initializing) {
        self.changed('counts', self.userId, { pinCount });
      }
    },
    removed() {
      pinCount--;
      self.changed('counts', self.userId, { pinCount });
    }
  });

  initializing = false;
  self.added('counts', this.userId, { pinCount });

  self.onStop(() => handle.stop());

  return self.ready();
});
