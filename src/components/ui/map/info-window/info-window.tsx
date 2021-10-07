import './info-window.scss';
import {
  InfoWindow as IW,
  InfoWindowProps as IWProps,
} from '@react-google-maps/api';

export type MarkerProps = {
} & IWProps;

export const InfoWindow = (props: MarkerProps) => {
  window.console.log();
  return (
    <IW
      {...props}
    />
  );
};
