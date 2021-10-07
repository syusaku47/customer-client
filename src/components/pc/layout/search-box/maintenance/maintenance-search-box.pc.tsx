import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './maintenance-search-box.pc.scss';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import { Select } from '../../../../ui/select/select';
import { MaintenanceSortState } from '../../../../../type/maintenance/maintenance.type';
import { MaintenanceActions } from '../../../../../redux/maintenance/maintenance.action';
import { State } from '../../../../../redux/root.reducer';
import { DatePicker } from '../../../../ui/date-picker/date-picker';
import { RightLabelCheckbox } from '../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { Radio } from '../../../../ui/radio/radio';
import { LeftIconButton } from '../../../../ui/button/left-icon-button/left-icon-button';
import { SearchBoxPC } from '../search-box.pc';
import { useDidMount } from '../../../../../hooks/life-cycle';
import { MasterActions } from '../../../../../redux/master/master.action';
import { Input } from '../../../../ui/input/input';
import { MapActions } from '../../../../../redux/map/map.action';

type Props = {
  isLocal?: boolean;
  callback: (v:MaintenanceSortState) => void;
}

export const MaintenanceSearchBoxPC = (props: Props) => {
  const {
    // eslint-disable-next-line
    isLocal,
    callback,
  } = props;

  /* Hooks */
  const storeList = useSelector((state:State) => state.master.storeList, isEqual);
  const employeeList = useSelector((state:State) => state.master.employeeList, isEqual);
  const sortState = useSelector((state: State) => (state.maintenance.sort), isEqual);
  const dispatch = useDispatch();

  /* State */
  const [sort, setSort] = useState(cloneDeep(sortState));

  /* Callback */
  const setState = useCallback(
    (v: MaintenanceSortState) => {
      setSort(v);
      dispatch(MaintenanceActions.setSort(cloneDeep(v)));
    }, [sort],
  );

  const saveState = useCallback(
    () => {
      dispatch(MaintenanceActions.setSort(cloneDeep(sort)));
    },
    [sort],
  );

  const handleClickSearch = useCallback(
    () => {
      dispatch(MapActions.setGpsStatus('out'));
      callback(sort);
    }, [callback, sort],
  );

  useDidMount(() => {
    dispatch(MasterActions.api.store.getList({}));
    dispatch(MasterActions.api.employee.getList({}));
  });

  return (
    <SearchBoxPC
      openCallback={() => { }}
    >
      <div onKeyPress={(e) => { if (e.key === 'Enter') callback(sort); }}>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">メンテナンス日</div>
            <DatePicker
              date={sort?.maintenance_date_start || null}
              onChange={(v) => setState(
                { ...sort, maintenance_date_start: v },
              )}
            />
            <label className="ml_10">〜</label>
            <DatePicker
              date={sort?.maintenance_date_end || null}
              onChange={(v) => setState(
                { ...sort, maintenance_date_end: v },
              )}
            />
          </div>
          <div className="item_box">
            <div className="item_head">案件営業担当</div>
            <Select
              className="add_text_left"
              label="店舗"
              value={sort?.sales_shop}
              defaultLabel="全て"
              onChange={(v) => setState({ ...sort, sales_shop: Number(v) })}
              options={storeList.map((v) => ({
                text: v.name, value: v.id,
              }))}
            />
            <Select
              className="add_text_left"
              defaultLabel="全て"
              label="案件担当者"
              value={sort?.sales_contact}
              onChange={(data) => setState({ ...sort, sales_contact: Number(data) })}
              options={employeeList.map((v) => ({
                text: v.name, value: v.id,
              }))}
            />
          </div>
        </div>

        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">完工日</div>
            <DatePicker
              date={sort?.completion_date_start || null}
              onChange={(v) => setState(
                { ...sort, completion_date_start: v },
              )}
            />
            <label className="ml_10">〜</label>
            <DatePicker
              date={sort?.completion_date_end || null}
              onChange={(v) => setState(
                { ...sort, completion_date_end: v },
              )}
            />
          </div>
          <div className="item_box">
            <div className="item_head">案件名</div>
            <Input
              label=""
              value={sort?.project_name}
              onBlur={saveState}
              onChange={(e) => setSort({ ...sort, project_name: e.target.value })}
            />
          </div>
          <div className="item_box">
            <RightLabelCheckbox
              checked={Boolean(sort?.is_muko)}
              label="無効情報も含む"
              onChange={() => {
                setState({ ...sort, is_muko: sort?.is_muko ? 0 : 1 });
              }}
            />
          </div>
        </div>

        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">対応区分</div>
            <Radio
              label="未対応"
              name="supported_kubun"
              checked={sort?.supported_kubun === 0}
              onChange={() => { setState({ ...sort, supported_kubun: 0 }); }}
            />
            <Radio
              label="すべて"
              name="supported_kubun"
              checked={sort?.supported_kubun === 1}
              onChange={() => { setState({ ...sort, supported_kubun: 1 }); }}
            />
          </div>
          <div className="item_box">
            <div className="item_head">文字列検索</div>
            <Input
              className="mr_10"
              value={sort?.word}
              onBlur={saveState}
              onChange={(e) => setSort({ ...sort, word: e.target.value })}
            />
            <span className="comment">※検索対象項目：タイトル、詳細内容、対応内容</span>
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
    </SearchBoxPC>
  );
};
