import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Images } from '/imports/api/images/images';
import { Pins } from '/imports/api/pins/pins';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      username: 'whataburger',
      profile: {
        name: 'Wilson J. Burger III'
      }
    });
    Accounts.createUser({
      username: 'pinner55',
      profile: {
        name: 'Faster Pinner'
      }
    });
  }

  if (Images.find().count() === 0) {
    const data1 = [
      { url: 'http://www.ripleys.com/wp-content/uploads/2015/08/surprised-chicken.jpg', description: 'Is today Monday?' },
      { url: 'http://smokeybones.com/wp-content/uploads/2015/11/smokehouse-burger.jpg', description: 'Tasty Burger?  Or plastic model?  Only you can decide.' },
      { url: 'http://urbantastebuds.wpengine.netdna-cdn.com/wp-content/uploads/2014/06/most-expensive-burgers-in-the-world.jpg', description: 'My lifelong dream!' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Doughnut_burger.jpg', description: 'What I eat on Tuesdays.' },
      { url: 'http://i.dailymail.co.uk/i/pix/2014/06/02/article-2646333-1E67CC7C00000578-220_634x464.jpg', description: 'Me and my only friend...' },
      { url: 'http://s10.postimg.org/50131m4k9/turtle_burger_l.jpg', description: 'Turtles all the way down' },
      { url: 'http://cdn.drjennycretsinger.com/wp-content/uploads/2010/02/img_00031.jpg', description: 'Yes, I ate it.  It was the only one left.' },
      { url: 'http://static3.businessinsider.com/image/51fffe3769bedd4c56000007/burger-king-worker-receives-strict-reprimand-after-posting-a-gross-photo-at-work.jpg', description: 'On my bucket list' },
      { url: 'http://lovelace-media.imgix.net/uploads/414/cceea470-2174-0132-08db-0eae5eefacd9.jpg?', description: 'Owwwwwww!' }
    ];
    const user1 = Meteor.users.findOne({ username: 'whataburger' });
    data1.forEach((image) => {
      const imageId = Images.insert({
        url: image.url,
        pinCount: 1,
        pinnedBy: [user1._id],
        userId: user1._id
      }, { bypassCollection2: true });
      Pins.insert({
        imageId,
        userId: user1._id,
        description: image.description
      }, { bypassCollection2: true });
    });

    const data2 = [
      { url: 'http://thedreamingwizard.com/images/site_graphics/red_dragon_by_caiomm.jpg', description: 'What my breath smells like today' },
      { url: 'http://cdn4.teehunter.com/wp-content/uploads/2013/12/zombie-t-shirts.jpg', description: 'My team at 9am' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Beach_pano.jpg', description: 'Getting ready!' },
      { url: 'http://2.bp.blogspot.com/-Itw_OLDmScQ/Upvh0zdThcI/AAAAAAAAGbc/oTJBvQsSgaA/s1600/IGM+RDM+interacting+1.png', description: 'Nope!' },
      { url: 'https://4.bp.blogspot.com/-MlSCOooBXFE/Upvh3lkFkhI/AAAAAAAAGck/ItaOXl_J2rU/s640/PM.png', description: 'Ahhhhh!' },
      { url: 'http://assets.inhabitat.com/wp-content/blogs.dir/1/files/2016/01/Tesla-Model-S.jpg', description: 'My new wheelzzzzzzz' },
      { url: 'https://s-media-cache-ak0.pinimg.com/736x/e2/80/0a/e2800a1cf1657f27f9438e66a3381ebb.jpg', description: 'What?' },
      { url: 'http://puppypictures.org/main.php/d/69558-2/cute+rottweiler+puppy+face+image.jpg', description: 'So vicious!' },
      { url: 'http://www.wonderscope.org/wp-content/uploads/2016/02/sorry-were-closed.jpg', description: 'On vacation!' },
      { url: 'http://badurl.localhost/test.img', description: 'So good! You have to see this!' }
    ];
    const user2 = Meteor.users.findOne({ username: 'pinner55' });
    data2.forEach((image) => {
      const imageId = Images.insert({
        url: image.url,
        pinCount: 1,
        pinnedBy: [user2._id],
        userId: user2._id
      }, { bypassCollection2: true });
      Pins.insert({
        imageId,
        userId: user2._id,
        description: image.description
      }, { bypassCollection2: true });
    });
  }
});
