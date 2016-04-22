/* eslint no-param-reassign: ["error", { "props": false }] */
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Pins } from '/imports/api/pins/pins';
import { Images } from '/imports/api/images/images';
import ImageList from '../components/imageList';

const ImageListContainer = createContainer((props) => {
  const handle = Meteor.subscribe(props.publication, props.userId);
  const images = Images.find().fetch();

  images.forEach(image => {
    const pin = Pins.findOne({ imageId: image._id });
    if (pin) {
      image.description = pin.description;
    } else {
      image.description = '';
    }

    image.user = Meteor.users.findOne(image.userId);
  });

  return {
    images,
    isReady: handle.ready()
  };
}, ImageList);

export default ImageListContainer;
