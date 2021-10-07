import { useMemo } from 'react';
import './maneuver-img.scss';
import TurnRight from '../../../../../../asset/images/maneuver/turn-right.svg';
import TurnSlightLeft from '../../../../../../asset/images/maneuver/turn-slight-left.svg';
import TurnSharpLeft from '../../../../../../asset/images/maneuver/turn-sharp-left.svg';
import UturnLeft from '../../../../../../asset/images/maneuver/uturn-left.svg';
import TurnLeft from '../../../../../../asset/images/maneuver/turn-left.svg';
import TurnSlightRight from '../../../../../../asset/images/maneuver/turn-slight-right.svg';
import TurnSharpRight from '../../../../../../asset/images/maneuver/turn-sharp-right.svg';
import UturnRight from '../../../../../../asset/images/maneuver/uturn-right.svg';
import Straight from '../../../../../../asset/images/maneuver/straight.svg';
import RampLeft from '../../../../../../asset/images/maneuver/ramp-left.svg';
import RampRight from '../../../../../../asset/images/maneuver/ramp-right.svg';
import Merge from '../../../../../../asset/images/maneuver/merge.svg';
import ForkLeft from '../../../../../../asset/images/maneuver/fork-left.svg';
import ForkRight from '../../../../../../asset/images/maneuver/fork-right.svg';
import Ferry from '../../../../../../asset/images/maneuver/ferry.svg';
import FerryTrain from '../../../../../../asset/images/maneuver/ferry-train.svg';
import RoundaboutLeft from '../../../../../../asset/images/maneuver/roundabout-left.svg';
import RoundaboutRight from '../../../../../../asset/images/maneuver/roundabout-right.svg';

const maneuver = [
  { type: 'turn-right', img: TurnRight },
  { type: 'turn-slight-left', img: TurnSlightLeft },
  { type: 'turn-sharp-left', img: TurnSharpLeft },
  { type: 'uturn-left', img: UturnLeft },
  { type: 'turn-left', img: TurnLeft },
  { type: 'turn-slight-right', img: TurnSlightRight },
  { type: 'turn-sharp-right', img: TurnSharpRight },
  { type: 'uturn-right', img: UturnRight },
  { type: 'straight', img: Straight },
  { type: 'ramp-left', img: RampLeft },
  { type: 'ramp-right', img: RampRight },
  { type: 'merge', img: Merge },
  { type: 'fork-left', img: ForkLeft },
  { type: 'fork-right', img: ForkRight },
  { type: 'ferry', img: Ferry },
  { type: 'ferry-train', img: FerryTrain },
  { type: 'roundabout-left', img: RoundaboutLeft },
  { type: 'roundabout-right', img: RoundaboutRight },
];

type Props = {
  type: string;
}

export const ManeuverImg = (props: Props) => {
  const {
    type,
  } = props;

  const imgPath = useMemo(() => maneuver.find((v) => v.type === type)?.img || '', [type]);

  return <img src={imgPath} alt="maneuver" />;
};
