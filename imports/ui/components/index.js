import React from 'react';
import Paper from 'material-ui/lib/paper';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import RaisedButton from 'material-ui/lib/raised-button';

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
          label="Discover Images"
          primary={true}
          onClick={() => context.router.push('/images')}
        />
      </CardActions>
    </Card>
  </Paper>
);

Index.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Index;
