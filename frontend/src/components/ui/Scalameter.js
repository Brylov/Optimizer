import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Scalameter = ({ value, text }) => {
  return (
    <div className="w-24 h-24 mx-2">
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        styles={buildStyles({
          textSize: '16px',
          pathColor: `rgba(62, 152, 199, ${value / 100})`,
          textColor: '#3e98c7',
          trailColor: '#d6d6d6',
        })}
      />
      <p className="text-center mt-2">{text}</p>
    </div>
  );
};

export default Scalameter;
