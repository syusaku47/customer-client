export type Maneuver =
  | 'turn-slight-left'
  | 'turn-sharp-left'
  | 'uturn-left'
  | 'turn-left'
  | 'turn-slight-right'
  | 'turn-sharp-right'
  | 'uturn-right'
  | 'turn-right'
  | 'straight'
  | 'ramp-left'
  | 'ramp-right'
  | 'merge'
  | 'fork-left'
  | 'fork-right'
  | 'ferry'
  | 'ferry-train'
  | 'roundabout-left'
  | 'roundabout-right';

export class RouteDialogCollection {
  static travelMode = ['徒歩', '自転車', '車'];

  static initialAnaly = () => ({
    duration: '-- 分',
    distance: '-- km',
  });

  static initialTotalAnaly = () => ({
    duration: '-- 時間 -- 分',
    distance: '-- km',
  });

  static maneuver = [
    'turn-slight-left',
    'turn-sharp-left',
    'uturn-left',
    'turn-left',
    'turn-slight-right',
    'turn-sharp-right',
    'uturn-right',
    'turn-right',
    'straight',
    'ramp-left',
    'ramp-right',
    'merge',
    'fork-left',
    'fork-right',
    'ferry',
    'ferry-train',
    'roundabout-left',
    'roundabout-right',
  ];
}
