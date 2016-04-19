import React from 'react';
import Paper from 'material-ui/Paper';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  paper: {
    margin: 20,
    textAlign: 'center'
  }
};

const Index = (props, context) => (
  <Paper style={styles.paper} zDepth={4}>
    <Card>
      <CardTitle title="Pin Images" subtitle="Pin Images.  Collect them all." />
      <CardText>
        <h2>Wow!</h2>
        <h3>Features:</h3>
        <ul>
          <li>Features Here</li>
        </ul>
      </CardText>
      <CardActions>
        <RaisedButton
          label="Discover Pins"
          primary={true}
          onClick={() => context.router.push('/pins')}
        />
      </CardActions>
    </Card>
  </Paper>
);

Index.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Index;
