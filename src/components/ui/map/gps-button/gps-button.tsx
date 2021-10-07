import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../../redux/root.reducer';
import { Button } from '../../button/button';
import myLocation from '../../../../asset/images/my_location_black_24dp.svg';
import myLocationOn from '../../../../asset/images/my_location_black_24dp_on.svg';
import './gps-button.scss';
import { UserAgent } from '../../../../utilities/user-agent';

type Props = {
  onClick: () => void;
}

/* TODO Style */
export const GpsButton = (props: Props) => {
  const status = useSelector((state: State) => state.map.gpsStatus);
  const { onClick } = props;

  const isWatch = useMemo(() => (status === 'watch'), [status]);
  const icon = useMemo(() => (status === 'watch' ? myLocationOn : myLocation), [status]);

  return (
    <div className={`icon_cover_gps ${UserAgent}`}>
      <Button
        size="sm"
        onClick={onClick}
        color={isWatch ? 'primary' : 'white'}
      >
        <img src={icon} alt="" />
      </Button>
    </div>
  );
};
