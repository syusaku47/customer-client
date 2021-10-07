import { useMemo } from 'react';
// import { MapCollection } from '../../../collection/map/map.collection';
import NoImage from '../../../asset/images/noimage.svg';

type Props = {
  isShow: boolean;
  lat: string | number;
  lng: string | number;
  sizeX?: number;
  sizeY?: number;
  shadow?: boolean;
}

export const StreetViewImg = (props: Props) => {
  const {
    lat, lng, sizeX, sizeY, isShow, shadow,
  } = props;

  const path = useMemo(() => (isShow
    // ? `https://maps.googleapis.com/maps/api/streetview?size=${sizeX}x${sizeY}&location=${lat},${lng}&fov=80&heading=70&pitch=0&key=${MapCollection.apiKey}`
    ? NoImage
    : NoImage),
  [lat, lng, sizeX, sizeY, isShow]);

  return <img src={path} alt="" className={`${shadow ? '' : 'no_shadow'}`} />;
};

StreetViewImg.defaultProps = {
  sizeX: 100,
  sizeY: 100,
  shadow: false,
};
