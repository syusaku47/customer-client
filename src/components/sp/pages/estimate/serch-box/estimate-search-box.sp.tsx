import { cloneDeep, isEqual } from 'lodash';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EstimateCollection } from '../../../../../collection/estimate/estimatecollection';
import { useDidMount } from '../../../../../hooks/life-cycle';
import { EstimateActions } from '../../../../../redux/estimate/estimate.action';
import { MasterActions } from '../../../../../redux/master/master.action';
import { State } from '../../../../../redux/root.reducer';
import { LeftLabelCheckbox } from '../../../../ui/checkbox/left-label-checkbox/left-label-checkbox';
import { Input } from '../../../../ui/input/input';
import { Select } from '../../../../ui/select/select';
import { SearchBox } from '../../../layout/search-box/search-box.sp';
import './estimate-search-box.sp.scss';
import { EstimateSortState } from '../../../../../type/estimate/estimate.type';

type Props = {
  isLocal?: boolean;
  callback: (v:EstimateSortState) => void;
}

export const EstimateSearchBoxSP = (props: Props) => {
  const {
    // eslint-disable-next-line
    isLocal,
    callback,
  } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => (state.estimate.sort), isEqual);
  const employeeList = useSelector((state:State) => state.master.employeeList, isEqual);
  const storeList = useSelector((state:State) => state.master.storeList, isEqual);

  /* State */
  const [sort, setSort] = useState(cloneDeep(sortState));

  /* Callback */
  const setState = useCallback(
    (v: typeof EstimateCollection.sortInitialState) => {
      setSort(v);
      dispatch(EstimateActions.setSort(cloneDeep(v)));
    }, [sort],
  );

  /* eslint-disable */
  /* TODO 後で消す */
  const setSaveState = useCallback(
    () => {
      dispatch(EstimateActions.setSort(cloneDeep(sort)));
    }, [sort],
  );

  const handleClickSearch = useCallback(
    () => {
      callback(cloneDeep(sort));
    }, [callback],
  );

  /* Effect */
  useDidMount(() => {
    dispatch(MasterActions.api.store.getList({}));
    dispatch(MasterActions.api.employee.getList({}));
  });

  return (
    <SearchBox callback={handleClickSearch}>
      {/* <div onKeyPress={(e) => {
        if (e.key === 'Enter') {
          setSaveState();
          callback();
        }
      }}
      > */}
      <div className="search_box_sp_body_inner">
        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">現場名称</div>
            <Input
              value={sort.field_name}
              onChange={(e) => setState({ ...sort, field_name: e.target.value })}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">案件名</div>
            <Input
              value={sort.project_name}
              onChange={(e) => setState({ ...sort, project_name: e.target.value })}
            />
          </div>
          <div className="item_wrap display_none">
            <LeftLabelCheckbox
              label="発注案件も含む"
              checked={Boolean(sort.is_order_project)}
              onChange={() => setState({
                ...sort, is_order_project: sort.is_order_project ? 0 : 1,
              })}
            />
          </div>
        </div>
        <div className="category_wrap ">
          <div className="item_wrap">
            <div className="item_label">営業担当店舗</div>
              <Select
                className="add_text_left"
                value={sort?.sales_shop}
                onChange={(data) => setSort({ ...sort, sales_shop: Number(data) })}
                defaultLabel="全て"
                options={storeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
          </div>

          <div className="item_wrap">
            <div className="item_label">案件担当者</div>
              <Select
                className="add_text_left"
                value={sort?.sales_contact}
                onChange={(data) => setSort({ ...sort, sales_contact: Number(data) })}
                defaultLabel="全て"
                options={employeeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
          </div>

          <div className="item_wrap">
            <div className="item_label">見積作業者</div>
              <Select
                className="add_text_left"
                value={sort?.quote_creator}
                onChange={(data) => setSort({ ...sort, quote_creator: Number(data) })}
                defaultLabel="全て"
                options={employeeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
          </div>
        </div>
      </div>
    </SearchBox>
  );
};
