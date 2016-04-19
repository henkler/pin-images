import React from 'react';
import Pin from './pin';

const PinList = (props) => (
  <div>
    {props.pins.map(pin =>
      <Pin
        key={pin._id}
        pin={pin}
      />)}
  </div>
);

PinList.propTypes = {
  pins: React.PropTypes.array.isRequired
};

export default PinList;
