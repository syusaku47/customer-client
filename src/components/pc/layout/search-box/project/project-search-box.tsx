import {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash, { isEqual } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import { RightLabelCheckbox } from '../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { LeftIconButton } from '../../../../ui/button/left-icon-button/left-icon-button';
import '../search-box.pc.scss';
import { Select } from '../../../../ui/select/select';
import { prefectures } from '../../../../../collection/prefectures';
import { State } from '../../../../../redux/root.reducer';
import { TagModel } from '../../../../../model/tag/tag';
import { TagActions } from '../../../../../redux/tag/tag.action';
import { ProjectSortState } from '../../../../../type/project/project.type';
import { ProjectCollection } from '../../../../../collection/project/project.collection';
import { SearchBoxPC } from '../search-box.pc';
import { ProjectActions } from '../../../../../redux/project/project.action';
import { useDidMount } from '../../../../../hooks/life-cycle';
import { MasterActions } from '../../../../../redux/master/master.action';
import { CommonCollection } from '../../../../../collection/common/common.collection';
import { Input } from '../../../../ui/input/input';
import { MapActions } from '../../../../../redux/map/map.action';

type Props = {
  callback: (v:ProjectSortState) => void;
  openCallback: (v: boolean) => void;
}

export const ProjectSearchBox = (props: Props) => {
  const {
    callback, openCallback,
  } = props;

  /* Hooks */
  const sortState = useSelector((state: State) => state.project.sort, isEqual);
  const partList = useSelector((state: State) => (state.tag.partList), isEqual);
  const {
    projectRankList,
    storeList,
    employeeList,
  } = useSelector((state: State) => (state.master), isEqual);

  const dispatch = useDispatch();

  /* State */
  const [sort, setSort] = useState<ProjectSortState>(cloneDeep(sortState));

  /* Callback */
  const setState = useCallback((v: ProjectSortState) => {
    setSort(v);
    dispatch(ProjectActions.setSort(v));
  }, [sort, callback]);

  const handleClickSearch = useCallback(() => {
    dispatch(MapActions.setGpsStatus('out'));
    callback(sortState);
  }, [callback, sortState]);

  /* Effect */
  useDidMount(() => {
    dispatch(TagActions.api.part.getList());
    dispatch(MasterActions.api.projectRank.getList({}));
    dispatch(MasterActions.api.employee.getList({}));
    dispatch(MasterActions.api.store.getList({}));
  });

  useEffect(() => {
    if (partList.length) {
      setState({
        ...lodash.cloneDeep(sort),
        construction_parts: new TagModel(partList),
        construction_status: new TagModel(ProjectCollection.constructionStatusList),
      });
    }
  }, [partList]);

  return (
    <>
      <SearchBoxPC
        openCallback={openCallback}
        isDetail
      >
        <div
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleClickSearch();
          }}
        >
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">営業担当</div>
              <Select
                className="add_text_left"
                label="店舗"
                value={sort?.sales_shop}
                onChange={(data) => setState({ ...sort, sales_shop: Number(data) })}
                defaultLabel="全て"
                options={storeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
              <Select
                className="add_text_left"
                label="担当者"
                value={sort?.sales_contact}
                onChange={(data) => setState({ ...sort, sales_contact: Number(data) })}
                defaultLabel="全て"
                options={employeeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
            </div>
            {/* </div>
          <div className="item_wrap">*/}
            <div className="item_box">
              <div className="item_head">案件名</div>
              <Input
                value={sort?.name}
                onChange={(e) => setState({ ...sort, name: e.target.value })}
              />
            </div>
            <div className="item_box">
              <div className="item_head">現場名称</div>
              <Input
                value={sort?.field_name}
                onChange={(e) => setState({ ...sort, field_name: e.target.value })}
              />
            </div>
            <div className="item_box">
              <div className="item_head">現場電話番号</div>
              <Input
                type="number"
                value={sort?.field_tel_no}
                onChange={(e) => setState({ ...sort, field_tel_no: e.target.value })}
              />
            </div>
            {/* </div>
          <div className="item_wrap">*/}
            <div className="item_box">
              <div className="item_head">顧客名</div>
              <Input
                value={sort?.customer_name}
                onChange={(e) => setState({ ...sort, customer_name: e.target.value })}
              />
            </div>
            {/* </div>
          <div className="item_wrap">*/}
            <div className="item_box">
              <div className="item_head">工事状況</div>
              <div className="flex_wrap_box">
                {sort?.construction_status?.data.map((v, i) => (
                  <div key={`rTag${i}`}>
                    <RightLabelCheckbox
                      className=""
                      key={v.id}
                      label={v.label}
                      checked={v.flag}
                      onChange={() => {
                        sort.construction_status?.changeFlag(v.id);
                        setState({
                          ...sort, construction_status: lodash.cloneDeep(sort.construction_status),
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <LeftIconButton
              label="検索"
              fontAwesomeClass="fas fa-search"
              className="btn_search for_simple"
              size="sm"
              color="secondary"
              onClick={handleClickSearch}
            />
          </div>
          <div className="search_detail">
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">顧客都道府県</div>
                <Select
                  value={sort?.customer_prefecture}
                  onChange={(v) => setState({ ...sort, customer_prefecture: Number(v) })}
                  defaultLabel="全て"
                  options={prefectures.map((v) => ({
                    text: v.label, value: v.value,
                  }))}
                />
              </div>
              <div className="item_box">
                <div className="item_head">現場住所</div>
                <Input
                  value={sort?.field_place}
                  onChange={(e) => setState({ ...sort, field_place: e.target.value })}
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">案件ランク</div>
                <Select
                  value={sort?.project_rank}
                  onChange={(v) => setState({ ...sort, project_rank: Number(v) })}
                  defaultLabel="全て"
                  options={projectRankList.map((v) => ({
                    text: v.name, value: v.project_rank_id,
                  }))}
                />
                <Select
                  value={sort?.project_rank_filter}
                  onChange={(v) => setState({ ...sort, project_rank_filter: Number(v) })}
                  options={CommonCollection.pullDownFilterList}
                />
              </div>
            </div>
            <div className="item_wrap flex_no_wrap_box">
              <div className="item_box">
                <div className="item_head">工事部位</div>
                <div className="flex_wrap_box">
                  {sort?.construction_parts?.data.map((v, i) => (
                    <div key={`tag${i}`}>
                      <RightLabelCheckbox
                        className="customerPC__body__inner__checkbox"
                        key={v.id}
                        label={v.label}
                        checked={v.flag}
                        onChange={() => {
                          sort.construction_parts?.changeFlag(v.id);
                          setState({
                            ...sort, construction_parts: lodash.cloneDeep(sort.construction_parts),
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <LeftIconButton
                label="検索"
                fontAwesomeClass="fas fa-search"
                className="btn_search for_detail"
                size="sm"
                color="secondary"
                onClick={handleClickSearch}
              />
            </div>
          </div>
        </div>
      </SearchBoxPC>
    </>
  );
};
