import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep, isEqual } from 'lodash';
import '../search-box.pc.scss';
import { Select } from '../../../../ui/select/select';
import { useDidMount } from '../../../../../hooks/life-cycle';
import { EstimateCollection } from '../../../../../collection/estimate/estimatecollection';
import { EstimateActions } from '../../../../../redux/estimate/estimate.action';
import { MasterActions } from '../../../../../redux/master/master.action';
import { SearchBoxPC } from '../search-box.pc';
import { LeftIconButton } from '../../../../ui/button/left-icon-button/left-icon-button';
import { LeftLabelCheckbox } from '../../../../ui/checkbox/left-label-checkbox/left-label-checkbox';
import { State } from '../../../../../redux/root.reducer';
import { Input } from '../../../../ui/input/input';

type Props = {
  isLocal?: boolean;
  callback: () => void;
}

export const EstimateSearchBox = (props: Props) => {
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

  const setSaveState = useCallback(
    () => {
      dispatch(EstimateActions.setSort(cloneDeep(sort)));
    }, [sort],
  );

  const handleClickSearch = useCallback(
    () => {
      callback();
    }, [callback],
  );

  /* Effect */
  useDidMount(() => {
    dispatch(MasterActions.api.store.getList({}));
    dispatch(MasterActions.api.employee.getList({}));
  });

  return (
    <SearchBoxPC openCallback={() => {}}>
      <div onKeyPress={(e) => {
        if (e.key === 'Enter') {
          setSaveState();
          callback();
        }
      }}
      >
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">????????????</div>
            <Input
              value={sort.field_name}
              onChange={(e) => setState({ ...sort, field_name: e.target.value })}
            />
          </div>
          <div className="item_box">
            <div className="item_head">?????????</div>
            <Input
              value={sort.project_name}
              onChange={(e) => setState({ ...sort, project_name: e.target.value })}
            />
          </div>
          <div className="item_box display_none">
            <LeftLabelCheckbox
              label="?????????????????????"
              checked={Boolean(sort.is_order_project)}
              onChange={() => setState({
                ...sort, is_order_project: sort.is_order_project ? 0 : 1,
              })}
            />
          </div>
          <div className="item_box">
            <div className="item_head">??????????????????</div>
            <Select
              className="add_text_left"
              label="??????"
              value={sort?.sales_shop}
              onChange={(data) => setSort({ ...sort, sales_shop: Number(data) })}
              defaultLabel="??????"
              options={storeList.map((v) => ({
                text: v.name, value: v.id,
              }))}
            />
            <Select
              className="add_text_left"
              label="???????????????"
              value={sort?.sales_contact}
              onChange={(data) => setSort({ ...sort, sales_contact: Number(data) })}
              defaultLabel="??????"
              options={employeeList.map((v) => ({
                text: v.name, value: v.id,
              }))}
            />
            <Select
              className="add_text_left"
              label="???????????????"
              value={sort?.quote_creator}
              onChange={(data) => setSort({ ...sort, quote_creator: Number(data) })}
              defaultLabel="??????"
              options={employeeList.map((v) => ({
                text: v.name, value: v.id,
              }))}
            />
          </div>
          <LeftIconButton
            label="??????"
            fontAwesomeClass="fas fa-search"
            className="btn_search for_detail"
            size="sm"
            color="secondary"
            onClick={handleClickSearch}
          />
        </div>
      </div>
    </SearchBoxPC>
  );
};
