import { replace } from 'connected-react-router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDidMount, useWillUnMount } from '../../../../hooks/life-cycle';
import { useQuery } from '../../../../hooks/use-query';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { ProjectActions } from '../../../../redux/project/project.action';
import { RoutingPath } from '../../../../routes/routing-pass';
import { ProjectShowType } from '../../../../type/project/project.type';
import { noPinch } from '../../../../utilities/no-pinch';
import { SetSelectedClass } from '../../../../utilities/set-selected-class';
import { BottomBorderButton } from '../../../ui/button/bottom-border/bottom-border-button';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { MapListToggleButton } from '../../../ui/button/map-list-toggle/map-list-toggle-button';
import { MapBase } from '../../../ui/map/map-base';
import { ProjectListSP } from '../../layout/body/list/project-list/project-list';
import { SearchBoxDialogTitle } from '../../layout/search-box/search-box.type.sp';
import { BasePageSP } from '../base.page.sp';
import { ProjectEditSP } from './edit/project-edit.sp';
import { ProjectEditDialogTitle } from './edit/project-edit.type.sp';
import { ProjectSearchBoxSP } from './search-box/project-search-box.sp';

export const ProjectSP = () => {
  const shoType = useQuery('type');
  const dispatch = useDispatch();
  const [showType, setShowType] = useState<'map' | 'list'>('map');
  const [projectShowType, setProjectShowType] = useState<ProjectShowType>(0);
  const footerEle = useRef<HTMLDivElement>(null);
  const headerEle = useRef<HTMLDivElement>(null);
  const listEle = useRef<HTMLDivElement>(null);

  /* effect */
  useEffect(() => {
    const pinchCallback = noPinch(footerEle.current);
    return pinchCallback;
  }, [footerEle]);

  useDidMount(() => {
    dispatch(ProjectActions.api.project.getList({
      limit: 9999999,
    }));
  });

  useEffect(() => {
    const mapType = (shoType || 'map');
    const path = `${RoutingPath.project}?type=`;
    dispatch(replace(path + mapType));
    setShowType(mapType === 'map' ? 'map' : 'list');
  }, [shoType]);

  useWillUnMount(() => {
    dispatch(ProjectActions.setSort(null));
  });

  useEffect(() => {
    listEle.current?.scrollTo(0, -10000);
  }, [showType]);

  return (
    <BasePageSP
      className="project_sp"
      searchBoxDialog={{
        title: SearchBoxDialogTitle,
        element: <ProjectSearchBoxSP />,
      }}
    >

      <div
        className="map_list_header"
        onClick={(e) => { e.preventDefault(); }}
        ref={headerEle}
      >
        <BottomBorderButton
          label="すべて"
          onClick={(e) => {
            setProjectShowType(0);
            SetSelectedClass(e.currentTarget, headerEle.current);
          }}
          selected
        />
        <BottomBorderButton
          label="未契約"
          onClick={(e) => {
            setProjectShowType(1);
            SetSelectedClass(e.currentTarget, headerEle.current);
          }}
        />
        <BottomBorderButton
          label="工事中"
          onClick={(e) => {
            setProjectShowType(2);
            SetSelectedClass(e.currentTarget, headerEle.current);
          }}
        />
        <BottomBorderButton
          label="完工"
          onClick={(e) => {
            setProjectShowType(3);
            SetSelectedClass(e.currentTarget, headerEle.current);
          }}
        />
      </div>

      <div className="map_list_body" ref={listEle}>
        {showType === 'map'
          ? (
            <MapBase
              projectOption={{
                type: projectShowType,
              }}
              isNowPoint
              searchOption={{}}
            />
          )
          : <ProjectListSP type={projectShowType} />}
      </div>

      <div
        className="page_body_footer space_between"
        ref={footerEle}
      >
        <LeftIconButton
          label="案件新規登録"
          fontAwesomeClass="far fa-edit"
          onClick={() => dispatch(DialogActions.push({
            title: ProjectEditDialogTitle.add,
            element: <ProjectEditSP mode="add" />,
          }))}
          size="md"
          color="primary"
        />
        <MapListToggleButton
          showType={showType}
          onClick={() => {
            const path = `${RoutingPath.project}?type=${showType === 'map' ? 'list' : 'map'}`;
            dispatch(replace(path));
            setShowType(showType === 'map' ? 'list' : 'map');
          }}
        />
      </div>
    </BasePageSP>
  );
};
