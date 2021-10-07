import { Marker } from '@react-google-maps/api';
import currentLocation from '../../../../../asset/images/current_location.svg';

export type HumanMarkerProps = {
  position: globalThis.google.maps.LatLngLiteral;
};

export const HumanMarker = (props: HumanMarkerProps) => {
  const { position } = props;

  return (
    <Marker
      position={{ ...position, lng: position.lng + 0.00025 }}
      animation={globalThis.google.maps.Animation.DROP}
      clickable={false}
      zIndex={100}
      icon={{
        url: currentLocation,
        scaledSize: new globalThis.google.maps.Size(20, 50),
      }}
    />
  );
};
