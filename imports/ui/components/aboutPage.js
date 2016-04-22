import React from 'react';
import Paper from 'material-ui/Paper';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import IconLinkedCamera from 'material-ui/svg-icons/image/linked-camera';

const styles = {
  paper: {
    margin: 20,
    textAlign: 'center'
  },
  mainIcon: {
    width: 200,
    height: 200,
    padding: 30
  }
};

const AboutPage = (props, context) => (
  <Paper style={styles.paper} zDepth={4}>
    <Card>
      <CardTitle title="Pin Images" subtitle="Upload Images. Pin Images.  Collect them all." />
      <CardText>
        <IconLinkedCamera style={styles.mainIcon} />
        <Divider />
        <h3>Features:</h3>
        <ul>
          <li>Written 100% in ES6, React 15.0, and Meteor 1.3</li>
          <li>Fully reactive data components</li>
          <li>Broken image URL detection and handling</li>
          <li>Uses new 'react-meteor-data' container model</li>
          <li>Twitter authentication support</li>
          <li>Pinned images share a single datastructure</li>
          <li>Individual pins by user can have custom descriptions</li>
        </ul>
      </CardText>
      <CardActions>
        <RaisedButton
          label="Discover Images"
          primary
          onClick={() => context.router.push('/')}
        />
      </CardActions>
    </Card>
  </Paper>
);

AboutPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default AboutPage;
