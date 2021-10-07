import { Marker } from '@react-google-maps/api';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import projectOb from '../../../../../asset/images/pin/project_ob.svg';
import projectObActive from '../../../../../asset/images/pin/project_ob_on.svg';
import projectUncontracted from '../../../../../asset/images/pin/project_uncontracted.svg';
import projectUncontractedActive from '../../../../../asset/images/pin/project_uncontracted_on.svg';
import projectConstruction from '../../../../../asset/images/pin/project_construction.svg';
import projectConstructionActive from '../../../../../asset/images/pin/project_construction_on.svg';
import { MapActions } from '../../../../../redux/map/map.action';
import { ProjectListType } from '../../../../../type/project/project.type';
import { UserAgent } from '../../../../../utilities/user-agent';

export type ProjectMarkerProps = {
  activeId: number;
  project: ProjectListType;
  callback: () => void;
  clusterer: any;
};

export const ProjectMarker = (props: ProjectMarkerProps) => {
  const {
    project, callback, activeId, clusterer,
  } = props;

  const dispatch = useDispatch();

  /* Memo */
  const url = useMemo(() => {
    let normal = '';
    let active = '';
    switch (project.koji_flag) {
      case 1:
        normal = projectUncontracted;
        active = projectUncontractedActive;
        break;
      case 2:
        normal = projectConstruction;
        active = projectConstructionActive;
        break;
      case 3:
        normal = projectOb;
        active = projectObActive;
        break;
      default:
        break;
    }
    return activeId === project.id ? active : normal;
  }, [UserAgent, activeId, project.id]);

  const scaledSize = useMemo(() => {
    const normal = UserAgent === 'pc' ? 90 : 60;
    const active = UserAgent === 'pc' ? 120 : 70;
    const size = new globalThis.google.maps.Size(
      100,
      activeId === project.id ? active : normal,
    );
    return size;
  }, [UserAgent, activeId, project.id]);

  /* Callback */
  const handleClickMarker = useCallback(
    (e: globalThis.google.maps.MapMouseEvent) => {
      dispatch(MapActions.setSearchPos(null));
      dispatch(MapActions.setRouteInfo(null));
      dispatch(MapActions.setGpsStatus('out'));
      e.domEvent.preventDefault();
      e.domEvent.stopPropagation();
      dispatch(MapActions.setCenterPos({
        lat: Number(project.lat),
        lng: Number(project.lng),
      }));
      if (callback) callback();
    },
    [project.lat, project.lng],
  );

  return (
    <Marker
      position={{
        lat: Number(project.lat),
        lng: Number(project.lng),
      }}
      zIndex={activeId === project.id ? 99 : 0}
      onClick={handleClickMarker}
      icon={{
        url,
        scaledSize,
      }}
      clusterer={clusterer}
    />
  );
};
