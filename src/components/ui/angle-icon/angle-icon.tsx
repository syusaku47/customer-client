import React from 'react';
import './angle-icon.scss';

type Props = {
  color?: string;
  direction?: 'top' | 'right' | 'bottom' | 'left';
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const AngleIcon = (props: Props) => {
  const { color, direction } = props;
  let deg = 0;

  switch (direction) {
    case 'top':
      deg = 90;
      break;
    case 'right':
      deg = 180;
      break;
    case 'bottom':
      deg = 270;
      break;
    case 'left':
    default:
      deg = 0;
      break;
  }

  return (
    <div
      className="angle_icon"
      style={{ color, transform: `rotate(${deg}deg)` }}
    />
  );
};

AngleIcon.defaultProps = { color: '#000000' };
