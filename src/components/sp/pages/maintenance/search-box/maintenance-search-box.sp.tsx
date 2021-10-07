import { cloneDeep, isEqual } from 'lodash';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TopLabelInputField } from '../../../../ui/input-field/top-label-input-field/top-label-input-field';
import { SearchBox } from '../../../layout/search-box/search-box.sp';
import { Select } from '../../../../ui/select/select';
import { MaintenanceSortState } from '../../../../../type/maintenance/maintenance.type';
import { MaintenanceActions } from '../../../../../redux/maintenance/maintenance.action';
import { State } from '../../../../../redux/root.reducer';
import { DatePicker } from '../../../../ui/date-picker/date-picker';
import { RightLabelCheckbox } from '../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { useDidMount } from '../../../../../hooks/life-cycle';
import { MasterActions } from '../../../../../redux/master/master.action';
import { Radio } from '../../../../ui/radio/radio';
import { DateFormatter } from '../../../../../utilities/date-formatter';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { MapActions } from '../../../../../redux/map/map.action';

type Props = {
  isLocal?: boolean;
  callback: (sortState: MaintenanceSortState) => void;
}

export const MaintenanceSearchBoxSP = (props:Props) => {
  // eslint-disable-next-line
  const { isLocal, callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const storeList = useSelector((state:State) => state.master.storeList, isEqual);
  const employeeList = useSelector((state:State) => state.master.employeeList, isEqual);
  const sortState = useSelector((state: State) => (state.maintenance.sort), isEqual);

  /* State */
  const [sort, setSort] = useState(cloneDeep(sortState));

  /* Callback */
  const setState = useCallback(
    (v: MaintenanceSortState) => {
      setSort(v);
      dispatch(MaintenanceActions.setSort(cloneDeep(v)));
    }, [sort],
  );

  const saveState = useCallback(() => {
    dispatch(MaintenanceActions.setSort(cloneDeep(sort)));
  },
  [sort]);

  const handleClickSearch = useCallback(() => {
    // callback();
    dispatch(MapActions.setGpsStatus('out'));
    dispatch(MaintenanceActions.api.maintenance.getList({
      param: {
        ...sort,
        maintenance_date: DateFormatter.date2str(sort.maintenance_date),
        maintenance_date_start: DateFormatter.date2str(sort.maintenance_date_start),
        maintenance_date_end: DateFormatter.date2str(sort.maintenance_date_end),
        completion_date_start: DateFormatter.date2str(sort.completion_date_start),
        completion_date_end: DateFormatter.date2str(sort.completion_date_end),
        construction_date: DateFormatter.date2str(sort.construction_date),
        completion_date: DateFormatter.date2str(sort.completion_date),
        supported_date: DateFormatter.date2str(sort.supported_date),
        is_muko: sort.is_muko ? 1 : 0,
      },
      callback: (res) => {
        dispatch(MaintenanceActions.setList(res));
        dispatch(MapActions.setCenterPos({
          lat: Number(res[0].lat), lng: Number(res[0].lng),
        }));
        dispatch(DialogActions.pop());
      },
    }));
    // dispatch(DialogActions.pop());
  }, [callback, sort]);

  /* Effect */
  useDidMount(() => {
    dispatch(MasterActions.api.store.getList({}));
    dispatch(MasterActions.api.employee.getList({}));
  });

  return (
    <SearchBox callback={handleClickSearch}>
      {/* search_box_body_inner は各画面の共通用 */}
      <div className="search_box_sp_body_inner maintenanceSearchBoxSP">

        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">店舗</div>
            <div className="item_body full_width">
              <Select
                value={sort?.sales_shop}
                onChange={(v) => setState({ ...sort, sales_shop: Number(v) })}
                defaultLabel="全て"
                options={storeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">担当者</div>
            <div className="item_body full_width">
              <Select
                value={sort?.sales_contact}
                onChange={(v) => setState({ ...sort, sales_contact: Number(v) })}
                defaultLabel="全て"
                options={employeeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
            </div>
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_wrap item_date_picker">
              <div className="item_label">メンテナンス日</div>
              <div className="item_body item_schedule wrap">
                <div className="item_schedule__form">
                  <DatePicker
                    date={sort?.maintenance_date_start || null}
                    onChange={(v) => setState(
                      { ...sort, maintenance_date_start: v },
                    )}
                  />
                </div>
                <div className="item_schedule__tilde">〜</div>
                <div className="item_schedule__form">
                  <DatePicker
                    date={sort?.maintenance_date_end || null}
                    onChange={(v) => setState(
                      { ...sort, maintenance_date_end: v },
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="item_wrap item_date_picker item_construction_period">
              <div className="item_label">完工日</div>
              <div className="item_body item_schedule wrap">
                <div className="item_schedule__form">
                  <DatePicker
                    date={sort?.completion_date_start || null}
                    onChange={(v) => setState(
                      { ...sort, completion_date_start: v },
                    )}
                  />
                </div>
                <div className="item_schedule__tilde">〜</div>
                <div className="item_schedule__form">
                  <DatePicker
                    date={sort?.completion_date_end || null}
                    onChange={(v) => setState(
                      { ...sort, completion_date_end: v },
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap">
            <TopLabelInputField
              label="案件名"
              value={sort?.project_name}
              onBlur={saveState}
              onChange={(e) => setState({ ...sort, project_name: e.target.value })}
              className="full_width"
            />
          </div>
          <div className="item_wrap tags_form">
            <div className="item_body item_checkbox">
              <RightLabelCheckbox
                checked={!!sort?.is_muko}
                label="無効情報も含む"
                onChange={() => {
                  setState({ ...sort, is_muko: sort?.is_muko ? 1 : 0 });
                }}
                className="single_column"
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">対応区分</div>
            <div className="item_body item_category">
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
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="文字列検索"
              value={sort?.word}
              onBlur={saveState}
              onChange={(e) => setState({ ...sort, word: e.target.value })}
              className="full_width"
            />
          </div>
        </div>
      </div>
    </SearchBox>
  );
};
