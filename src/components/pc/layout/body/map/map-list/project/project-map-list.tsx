import React, {
  useCallback, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as lodash from 'lodash';
import { cloneDeep } from 'lodash';
import { State } from '../../../../../../../redux/root.reducer';
import { Button } from '../../../../../../ui/button/button';
import { LeftIconButton } from '../../../../../../ui/button/left-icon-button/left-icon-button';
import { MapBase } from '../../../../../../ui/map/map-base';
import { MapActions } from '../../../../../../../redux/map/map.action';
import { DialogActions } from '../../../../../../../redux/dialog/dialog.action';
import { ProjectListType } from '../../../../../../../type/project/project.type';
import { ProjectCard } from '../../../../../../ui/card/project/project-card';
import { InputField } from '../../../../../../ui/input-field/input-field';
import './project-map-list.scss';
import { ProjectAdd } from '../../../../../pages/project/add/project-add';
import { useDidMount, useWillUnMount } from '../../../../../../../hooks/life-cycle';
import { RouteDialog } from '../../../../../../dialogs/route-dialog/route-dialog';

type Props = {
  type: 0 | 1 | 2 | 3;
  callback: (type: 0 | 1 | 2 | 3) => void;
  callbackGetList: () => void;
}

export const ProjectMapListPC = (props: Props) => {
  const { type, callback, callbackGetList } = props;
  /* Hooks */
  const humanPos = useSelector((state:State) => state.map.humanPos);
  const projectListData = useSelector((state: State) => state.project.list);
  const routeInfo = useSelector((state: State) => state.map.routeInfo);
  const dispatch = useDispatch();

  /* State */
  const [project, setProject] = useState<ProjectListType | null>(null);
  const [projectIndex, setProjectIndex] = useState(NaN);
  const [searchValue, setSearchValue] = useState('');
  const [searchValue2, setSearchValue2] = useState('');
  const [active, setActive] = useState(NaN);

  /* List */
  const projectList = useMemo(() => (
    !type ? projectListData : projectListData.filter(
      (v) => v.koji_flag === type,
    )), [type, projectListData]);

  /* Callback */
  const handleClickCard = useCallback((v: ProjectListType) => {
    setProject(lodash.cloneDeep(v));
    setActive(v.id);
    dispatch(MapActions.setCenterPos({ lat: Number(v.lat), lng: Number(v.lng) }));
  }, []);

  const handleClickSearch = useCallback(
    (inMap?:boolean) => {
      dispatch(MapActions.setGpsStatus('out'));
      dispatch(MapActions.api.geocoder({
        param: { param: { address: inMap ? searchValue2 : searchValue } },
        callback: () => {
          dispatch(DialogActions.pop());
          dispatch(MapActions.setZoomLevel(null));
        },
      }));
    },
    [searchValue, searchValue2],
  );

  const handleClickRouteSearch = useCallback(() => {
    dispatch(MapActions.setGpsStatus('out'));
    dispatch(DialogActions.push({
      title: 'ルート設定',
      element: <RouteDialog
        type="project"
        destination={searchValue2}
        callback={() => { }}
      />,
    }));
  }, [searchValue2]);

  const handleClickRegistration = useCallback(
    () => {
      dispatch(DialogActions.push({
        title: '案件登録',
        className: 'max_height_dialog',
        element: <ProjectAdd
          callback={callbackGetList}
        />,
      }));
    }, [callbackGetList],
  );
  /* Effect */
  useDidMount(() => {
    if (humanPos) {
      dispatch(MapActions.setCenterPos(cloneDeep(humanPos)));
    }
  });

  useWillUnMount(() => {
    dispatch(MapActions.setRouteInfo(null));
  });

  return (
    <section className="result_area">
      <div className="inner">
        <div className="list_wrap">
          {/* リスト側の場所検索は使用しないため非表示 */}
          <div className="search_box item_wrap display_none">
            <InputField
              onEnterKeyPress={handleClickSearch}
              labelPlace="left"
              className="item_box"
              label="場所を検索"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <LeftIconButton
              label="検索"
              fontAwesomeClass="fas fa-search"
              className="btn_search for_detail"
              size="sm"
              color="secondary"
              onClick={() => handleClickSearch()}
            />
          </div>
          <div className="list_box_sort">
            <Button
              className={`md primary project_all ${type === 0 ? 'active' : ''}`}
              onClick={() => callback(0)}
            >すべて
            </Button>
            <Button
              className={`md primary project_uncontracted ${type === 1 ? 'active' : ''}`}
              onClick={() => callback(1)}
            >未契約
            </Button>
            <Button
              className={`"md primary project_construction ${type === 2 ? 'active' : ''}`}
              onClick={() => callback(2)}
            >工事中
            </Button>
            <Button
              className={`md primary project_completion ${type === 3 ? 'active' : ''}`}
              onClick={() => callback(3)}
            >完工
            </Button>
            <Button
              className="md primary edit"
              onClick={handleClickRegistration}
            ><>案件<br />新規登録</>
            </Button>
          </div>
          <div className="list_box">
            {/* {[].length ? projectList.map((v, i) => ( */}
            {projectList.length ? projectList.map((v, i) => (
              <div key={`card${i}`} className={`card_wrapper ${active === v.id ? 'active' : ''}`}>
                <ProjectCard
                  className="list_card"
                  projectData={v}
                  onClick={() => {
                    handleClickCard(v);
                    setProjectIndex(i);
                  }}
                  index={i}
                />
              </div>
            )) : <div className="not_hit">該当する結果が見つかりません</div>}
          </div>
        </div>
        <div className="map_area">
          <MapBase
            projectOption={{
              type,
              selectInfo: project,
              selectIndex: projectIndex,
              callbackActiveMarker: setActive,
            }}
            searchOption={{}}
            isNowPoint
          />
          <div className="map_search_box">
            <div className="search_box item_wrap">
              <InputField
                onEnterKeyPress={() => handleClickSearch(true)}
                // labelPlace="left"
                // label="場所を検索"
                className="item_box"
                placeholder="場所を検索"
                value={searchValue2}
                onChange={(e) => setSearchValue2(e.target.value)}
              />
              <LeftIconButton
                label="検索"
                fontAwesomeClass="fas fa-search"
                className="btn_search"
                size="sm"
                color="secondary"
                onClick={() => handleClickSearch(true)}
              />
              <div className="root_btn_box">
                <LeftIconButton
                  label="ルート検索"
                  fontAwesomeClass="fas fa-route"
                  className="btn_search"
                  size="sm"
                  color="secondary"
                  onClick={handleClickRouteSearch}
                />
              </div>
              {routeInfo && (
              <Button
                size="sm"
                color="dark"
                className="btn_search"
                onClick={() => dispatch(MapActions.setRouteInfo(null))}
              >
                ルート終了
              </Button>
              ) }
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};
