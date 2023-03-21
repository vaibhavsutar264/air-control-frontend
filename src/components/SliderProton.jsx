import React from 'react';
// import { makeStyles } from '@mu';
import Slider from '@mui/material/Slider';

// const useStyles = makeStyles({
//   root: {
//     width: '100%',
//   },
//   thumb: {
//     color: '#000',
//   },
//   rail: {
//     color: `rgba(0, 0, 0, 0.26)`,
//   },
//   track: {
//     color: '#000',
//   },
// });

const SliderProton = ({ value, changePrice }) => {
  // const classes = useStyles();

  return (
    <div className='width-100'>
      <Slider
        value={value}
        onChange={changePrice}
        valueLabelDisplay='on'
        min={0}
        max={24}
        // classes={{
        //   thumb: classes.thumb,
        //   rail: classes.rail,
        //   track: classes.track,
        // }}
      />
    </div>
  );
};

export default SliderProton;
